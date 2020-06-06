import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Course from "./Course";
import FinalScreen from "./FinalScreen";
import isAnswerCorrect from "../utils/isAnswerCorrect";
import COURSE_CONTENT from "../api/exampleCourse";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3, "auto", 10, "auto"),
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(5, "auto", 10, "auto"),
    },
  },
}));

export default function App() {
  const classes = useStyles();
  const [course, setCourse] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showSolutions, setShowSolutions] = useState(false);

  // imitate fetching the course content from an API
  useEffect(() => {
    setCourse(COURSE_CONTENT);
  }, []);

  const getSolution = (itemId) => {
    const item = course.content.filter((i) => i.id === itemId)[0];
    return item.solution;
  };

  const handleChangeAnswer = (itemId, value) => {
    const solution = getSolution(itemId);

    setAnswers({
      ...answers,
      [itemId]: {
        value,
        solution,
        isCorrect: isAnswerCorrect(value, solution),
      },
    });
  };

  return (
    course && (
      <>
        <Router>
          <Header courseTitle={course.title} />
          <Container className={classes.container} maxWidth="sm">
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
                <FinalScreen message={course.finalMessage} />
              </Route>
            </Switch>
          </Container>
        </Router>
      </>
    )
  );
}
