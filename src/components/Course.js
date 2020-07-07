import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CourseHeader from "./CourseHeader";
import ItemList from "./ItemList";
import Score from "./Score";
import FeedbackModal from "./FeedbackModal";
import NotFound from "./NotFound";
import isAnswerCorrect from "../utils/isAnswerCorrect";
import initializeAnswers from "../utils/initializeAnswers";
import createItem from "../utils/createItem";
import {
  saveSubmissionToFirestore,
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
  const [course, setCourse] = useState(null);
  const [userEmail, setUserEmail] = useState(""); // to ID user
  const [answers, setAnswers] = useState(null);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [show404, setShow404] = useState(false);
  const [orientation, setOrientation] = useState("horizontal");
  const [itemNumber, setItemNumber] = useState(0);

  useEffect(() => {
    getCourseFromFirestore(courseId)
      .then((course) => {
        if (course.exists) {
          // extract the course data
          let courseData = course.data();
          // if collecting emails, prepend Email item
          if (courseData.settings && courseData.settings.collectEmails) {
            const emailItem = createItem("Email");
            courseData = {
              ...courseData,
              items: [emailItem, ...courseData.items],
            };
          }
          // load into state
          setCourse(courseData);
          // update the browser tab title dynamically
          document.title = courseData.title;
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

  // save answers to firebase when user submits
  useEffect(() => {
    if (showSolutions && courseId) {
      saveSubmissionToFirestore(courseId, userEmail, answers, course);
    }
  }, [courseId, userEmail, answers, course, showSolutions]);

  // if answers are shown, switch to vertical view mode
  // and set progress percentage to 100
  useEffect(() => {
    if (showSolutions) setOrientation("vertical");
  }, [showSolutions]);

  const getSolution = (itemId) => {
    const item = course.items.filter((i) => i.id === itemId)[0];
    return item.solution;
  };

  const handleChangeAnswer = (itemId, value) => {
    // if answers is undefined, do nothing
    if (!answers) return null;

    // otherwise, update it
    const otherAnswers = answers.filter((a) => a.itemId !== itemId);
    const solution = getSolution(itemId);

    setAnswers([
      ...otherAnswers,
      {
        itemId,
        value,
        solution,
        isCorrect: isAnswerCorrect(value, solution),
      },
    ]);
  };

  // if the course isn't found, show 404
  if (show404) return <NotFound type="course" />;

  // compute progress percentage
  const progress = Math.min(
    course ? Math.round((itemNumber / course.items.length) * 100) : 0,
    100
  );

  return (
    course && (
      <>
        <CourseHeader
          courseTitle={course.title}
          progress={progress}
          orientation={orientation}
          setOrientation={setOrientation}
          setShowFeedbackModal={setShowFeedbackModal}
        />
        <FeedbackModal
          open={showFeedbackModal}
          setOpen={setShowFeedbackModal}
          sentFrom="course"
          answers={answers}
        />
        <Container className={classes.container}>
          <Switch>
            <Route exact path={path}>
              <ItemList
                items={course.items}
                answers={answers}
                onChangeAnswer={handleChangeAnswer}
                showSolutions={showSolutions}
                setShowSolutions={setShowSolutions}
                orientation={orientation}
                itemNumber={itemNumber}
                setItemNumber={setItemNumber}
                userEmail={userEmail}
                setUserEmail={setUserEmail}
              />
            </Route>
            <Route exact path={`${path}/score`}>
              <Score
                message={course.finalMessage}
                finalCta={course.finalCta}
                answers={answers}
              />
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
