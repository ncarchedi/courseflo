import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Course from "./Course";
import FinalScreen from "./FinalScreen";
import isAnswerCorrect from "../utils/isAnswerCorrect";
import parseContent from "../utils/parseContent";
import countItemsRemaining from "../utils/countItemsRemaining";
import { saveSubmissionToFirestore } from "../services/firestore";
import COURSE_CONTENT from "../courses/introductionToIntercepts";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3, "auto", 12, "auto"),
  },
}));

export default function App() {
  const classes = useStyles();
  const [course, setCourse] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [showSolutions, setShowSolutions] = useState(false);

  // imitate fetching the course content from an API
  useEffect(() => {
    // parse the content to render math, etc.
    const parsedContent = parseContent(COURSE_CONTENT.content).map(
      // add item numbers
      (item, index) => ({
        ...item,
        number: index + 1,
      })
    );
    setCourse({
      ...COURSE_CONTENT,
      content: parsedContent,
    });
  }, []);

  // initialize the answers array
  useEffect(() => {
    // once the course has been loaded
    if (course) {
      let a = [];
      course.content.forEach((item) => {
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
    const item = course.content.filter((i) => i.id === itemId)[0];
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
        <Router>
          <Header
            courseTitle={course.title}
            numRemaining={countItemsRemaining(answers)}
          />
          <Container className={classes.container} maxWidth="sm" disableGutters>
            <Switch>
              <Route path="/" exact>
                <Course
                  content={course.content}
                  answers={answers}
                  onChangeAnswer={handleChangeAnswer}
                  showSolutions={showSolutions}
                  setShowSolutions={setShowSolutions}
                />
              </Route>
              <Route path="/score">
                <FinalScreen message={course.finalMessage} answers={answers} />
              </Route>
            </Switch>
          </Container>
        </Router>
      </>
    )
  );
}
