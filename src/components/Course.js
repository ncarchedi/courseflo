import React, { useState, useEffect, useMemo } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CourseHeader from "./CourseHeader";
import ItemViewer from "./ItemViewer";
import Score from "./Score";
import Review from "./Review";
import FeedbackModal from "./FeedbackModal";
import EmailDialog from "./EmailDialog";
import NotFound from "./NotFound";
import isAnswerCorrect from "../utils/isAnswerCorrect";
import initializeAnswers from "../utils/initializeAnswers";
import useQuery from "../hooks/useQuery";
import {
  createUserCourseInFirestore,
  updateUserCourseInFirestore,
  getCourseFromFirestore,
} from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0, "auto", 12, "auto"),
  },
}));

export default function Course() {
  const classes = useStyles();
  let { path } = useRouteMatch();
  let { courseId } = useParams();
  let query = useQuery(); // get query params, if any
  const [course, setCourse] = useState(null);
  const [userEmail, setUserEmail] = useState(""); // to ID user
  const [answers, setAnswers] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(true);
  const [show404, setShow404] = useState(false);
  const [itemNumber, setItemNumber] = useState(0);
  const [userCourseId, setUserCourseId] = useState(query.get("uc"));

  useEffect(() => {
    getCourseFromFirestore(courseId)
      .then((course) => {
        if (course.exists) {
          handleLoadCourse(course);
        } else {
          setShow404(true);
        }
      })
      .catch((error) =>
        console.error("Error loading course from Firestore:", error)
      );
  }, [courseId]);

  // initialize the answers array
  useEffect(() => {
    // once the course has been loaded into state
    if (course) initializeAnswers(course, setAnswers);
  }, [course]);

  const handleLoadCourse = (course) => {
    // extract the course data
    let courseData = course.data();
    // if collecting emails, show email dialog
    courseData.settings &&
      courseData.settings.collectEmails &&
      setShowEmailDialog(true);
    // load into state
    setCourse(courseData);
    // update the browser tab title dynamically
    document.title = courseData.title;
    return null;
  };

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
        .then((docRef) => setUserCourseId(docRef.id))
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

  // if the course isn't found, show 404
  if (show404) return <NotFound type="course" />;

  return (
    course && (
      <>
        <CourseHeader
          courseTitle={course.title}
          progress={progress}
          setShowFeedbackModal={setShowFeedbackModal}
        />
        <FeedbackModal
          open={showFeedbackModal}
          setOpen={setShowFeedbackModal}
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
