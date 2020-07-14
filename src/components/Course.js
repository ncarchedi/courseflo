import React, { useState, useEffect, useMemo } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CourseHeader from "./CourseHeader";
import ItemViewer from "./ItemViewer";
import Score from "./Score";
import Review from "./Review";
import FeedbackDialog from "./FeedbackDialog";
import EmailDialog from "./EmailDialog";
import NotFound from "./NotFound";
import isAnswerCorrect from "../utils/isAnswerCorrect";
import initializeAnswers from "../utils/initializeAnswers";
import useQuery from "../hooks/useQuery";
import {
  createUserCourseInFirestore,
  updateUserCourseInFirestore,
  getCourseFromFirestore,
  getUserCourseFromFirestore,
  sendProgressEmailToUser,
} from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0, "auto", 12, "auto"),
  },
}));

export default function Course() {
  const classes = useStyles();
  let { url, path } = useRouteMatch();
  let { courseId } = useParams();
  let query = useQuery(); // get query params, if any
  const [loadingProgress, setLoadingProgress] = useState(
    !!query.get("continue")
  );
  const [course, setCourse] = useState(null);
  const [userEmail, setUserEmail] = useState(""); // to ID user
  const [answers, setAnswers] = useState(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showCourse404, setShowCourse404] = useState(false);
  const [showPage404, setShowPage404] = useState(false);
  const [itemNumber, setItemNumber] = useState(0);
  const [userCourseId, setUserCourseId] = useState();

  // load progress, if any
  useEffect(() => {
    if (loadingProgress) {
      const ucId = query.get("continue");
      getUserCourseFromFirestore(ucId)
        .then((uc) => {
          if (
            uc.exists && // exists in firestore
            !uc.data().submitted && // not submitted yet
            uc.data().courseId === courseId // matches current course
          ) {
            // set the user course ID in state
            setUserCourseId(ucId);
            // set other progress-related state
            setUserEmail(uc.data().userEmail);
            setItemNumber(uc.data().itemNumber);
            setAnswers(uc.data().answers);
          } else {
            setShowPage404(true);
          }
        })
        .catch((error) =>
          console.error("Error loading progress from Firestore:", error)
        )
        .finally(() => setLoadingProgress(false));
    }
  }, [loadingProgress, query, courseId]);

  // load course content
  useEffect(() => {
    if (!loadingProgress) {
      getCourseFromFirestore(courseId)
        .then((course) => {
          if (course.exists) {
            // extract the course data
            let courseData = course.data();
            // if collecting emails and we don't have
            // an email already, then show email dialog
            courseData.settings &&
              courseData.settings.collectEmails &&
              !userEmail &&
              setShowEmailDialog(true);
            // load course into state
            setCourse(courseData);
            // update the browser tab title dynamically
            document.title = courseData.title;
          } else {
            setShowCourse404(true);
          }
        })
        .catch((error) =>
          console.error("Error loading course from Firestore:", error)
        );
    }
  }, [loadingProgress, courseId, userEmail]);

  // initialize the answers array if it doesn't
  // already exists (e.g. from loading progress)
  useEffect(() => {
    // once the course has been loaded into state
    if (course && !answers) initializeAnswers(course, setAnswers);
  }, [course, answers]);

  const handleChangeAnswer = (itemId, value) => {
    // if answers is undefined, do nothing
    if (!answers) return null;

    // make a copy of all answers
    const updatedAnswers = [...answers];

    // find the old answer
    const index = answers.findIndex((a) => a.itemId === itemId);
    const oldAnswer = answers[index];

    // update the relevant answer
    updatedAnswers[index] = {
      ...oldAnswer,
      value,
      isCorrect: isAnswerCorrect(value, oldAnswer.solution),
    };

    // update state
    setAnswers(updatedAnswers);
  };

  const handleChangeItemNumber = (newItemNumber) => {
    // change item number
    setItemNumber(newItemNumber);

    // handle update / create userCourse
    if (userCourseId) {
      // update userCourse
      updateUserCourseInFirestore(
        userCourseId,
        newItemNumber,
        answers,
        false // not submitted
      );
    } else {
      // or create userCourse if it doesn't exist yet
      createUserCourseInFirestore(
        courseId,
        userEmail,
        newItemNumber,
        answers,
        course
      )
        .then((docRef) => {
          // set user course in state
          setUserCourseId(docRef.id);
          // send progress email to user if we have their email
          const targetUrl = `${window.location.origin}${url}?continue=${docRef.id}`;
          userEmail &&
            sendProgressEmailToUser(
              userEmail,
              course.title,
              targetUrl
            ).catch((error) =>
              console.error("Error sending progress email:", error)
            );
        })
        .catch((error) =>
          console.error("Error creating userCourse in Firestore:", error)
        );
    }
  };

  const handleSubmitCourse = () => {
    // set item number directly to avoid triggering a duplicate
    // update to firestore (see handleChangeItemNumber)
    const newItemNumber = course.items.length;
    setItemNumber(newItemNumber);

    updateUserCourseInFirestore(
      userCourseId,
      newItemNumber,
      answers,
      true // submitted
    );
  };

  // compute progress percentage
  const progress = useMemo(
    () =>
      Math.min(
        course ? Math.round((itemNumber / course.items.length) * 100) : 0,
        100
      ),
    [itemNumber, course]
  );

  // if the page isn't found (e.g. incorrect query param)
  if (showPage404) return <NotFound type="page" />;

  // if the course isn't found
  if (showCourse404) return <NotFound type="course" />;

  return (
    course && (
      <>
        <CourseHeader
          courseTitle={course.title}
          progress={progress}
          setShowFeedbackDialog={setShowFeedbackDialog}
        />
        <FeedbackDialog
          open={showFeedbackDialog}
          setOpen={setShowFeedbackDialog}
          sentFrom="course"
          answers={answers}
        />
        <EmailDialog
          open={showEmailDialog}
          setOpen={setShowEmailDialog}
          setUserEmail={setUserEmail}
        />
        <Container className={classes.container}>
          <Switch>
            <Route exact path={path}>
              <ItemViewer
                items={course.items}
                answers={answers}
                onChangeAnswer={handleChangeAnswer}
                onSubmitCourse={handleSubmitCourse}
                itemNumber={itemNumber}
                onChangeItemNumber={handleChangeItemNumber}
              />
            </Route>
            <Route exact path={`${path}/score`}>
              <Score
                showScore={course.settings.showScore}
                message={course.finalMessage}
                finalCta={course.finalCta}
                answers={answers}
              />
            </Route>
            <Route exact path={`${path}/review`}>
              <Review items={course.items} answers={answers} />
            </Route>
            <Route path={`${path}/*`}>
              <NotFound type="page" />
            </Route>
          </Switch>
        </Container>
      </>
    )
  );
}
