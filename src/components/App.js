import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Course from "./Course";
import FinalScreen from "./FinalScreen";
import FeedbackModal from "../components/FeedbackModal";
import isAnswerCorrect from "../utils/isAnswerCorrect";
import parseContent from "../utils/parseContent";
import countItemsRemaining from "../utils/countItemsRemaining";
import {
  saveSubmissionToFirestore,
  getCourseFromFirestore,
} from "../services/firestore";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0, "auto", 12, "auto"),
    maxWidth: theme.breakpoints.values.sm + 75,
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

  useEffect(() => {
    // courseId for testing: vTmus95f8o9eEdMaqbWc
    getCourseFromFirestore(courseId).then((course) => {
      if (course.exists) {
        // extract the course data
        const courseData = course.data();
        // parse the items for math, etc. and add item numbers
        // then set state
        setCourse({
          ...courseData,
          items: parseContent(courseData.items).map((item, index) => ({
            ...item,
            number: index + 1,
          })),
        });
        // update the browser tab title dynamically
        document.title = courseData.title;
      }
    });
  }, [courseId]);

  // initialize the answers array
  useEffect(() => {
    // once the course has been loaded into state
    if (course) {
      let a = [];
      course.items.forEach((item) => {
        // for each item type that requires a response
        if (!["Text", "Video", "Image"].includes(item.type)) {
          a.push({
            itemId: item.id,
            value: item.type === "MultiSelect" ? [] : "",
            solution: item.solution,
            isCorrect: false,
          });
        }
      });
      setAnswers(a);
    }
  }, [course]);

  // save answers to firebase when user submits
  useEffect(() => {
    if (showSolutions && answers && course) {
      saveSubmissionToFirestore(course.id, answers);
    }
  }, [course, answers, showSolutions]);

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

  return (
    course && (
      <>
        <Header
          courseTitle={course.title}
          numRemaining={countItemsRemaining(answers)}
          showSolutions={showSolutions}
          setShowFeedbackModal={setShowFeedbackModal}
        />
        <FeedbackModal
          open={showFeedbackModal}
          setOpen={setShowFeedbackModal}
          courseId={course.id}
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
              />
            </Route>
            <Route path={`${path}/score`}>
              <FinalScreen message={course.finalMessage} answers={answers} />
            </Route>
          </Switch>
        </Container>
      </>
    )
  );
}
