import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Course from "./Course";
import FinalScreen from "./FinalScreen";
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

  const isAnswerCorrect = (answer, solution) => {
    let ans = answer;
    let sol = solution;

    // borrowed from https://stackoverflow.com/a/16436975/2338922
    if (ans == sol) return true;

    // if the above wasn't true and the solution isn't an array
    // then the answer must be incorrect
    if (typeof sol !== "object") return false;

    if (ans == null || sol == null) return false;
    if (ans.length != sol.length) return false;

    ans = ans.sort();
    sol = sol.sort();

    for (var i = 0; i < ans.length; ++i) {
      if (ans[i] !== sol[i]) return false;
    }

    return true;
  };

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
