import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Course from "./Course";
import Score from "./Score";
import FeedbackModal from "../components/FeedbackModal";
import NotFound from "../components/NotFound";
import isAnswerCorrect from "../utils/isAnswerCorrect";
import initializeAnswers from "../utils/initializeAnswers";
import {
  saveSubmissionToFirestore,
  getCourseFromFirestore,
} from "../services/firestore";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0, "auto", 12, "auto"),
    maxWidth: theme.breakpoints.values.md,
  },
}));

export default function App() {
  const classes = useStyles();
  let { path } = useRouteMatch();
  let { courseId } = useParams();
  const [course, setCourse] = useState(null);
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
          const courseData = course.data();
          // load into state
          setCourse(courseData);
          // update the browser tab title dynamically
          document.title = courseData.title;
        } else {
          setShow404(true);
        }
      })
      .catch((error) =>
        console.error("Error loading course from Firestore: ", error)
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
      saveSubmissionToFirestore(courseId, answers);
    }
  }, [courseId, answers, showSolutions]);

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
        <Header
          courseTitle={course.title}
          progress={progress}
          orientation={orientation}
          setOrientation={setOrientation}
          setShowFeedbackModal={setShowFeedbackModal}
        />
        <FeedbackModal
          open={showFeedbackModal}
          setOpen={setShowFeedbackModal}
          courseId={courseId}
          answers={answers}
        />
        <Container className={classes.container}>
          <Switch>
            <Route exact path={path}>
              <Course
                items={course.items}
                answers={answers}
                onChangeAnswer={handleChangeAnswer}
                showSolutions={showSolutions}
                setShowSolutions={setShowSolutions}
                orientation={orientation}
                itemNumber={itemNumber}
                setItemNumber={setItemNumber}
              />
            </Route>
            <Route exact path={`${path}/score`}>
              <Score message={course.finalMessage} answers={answers} />
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
