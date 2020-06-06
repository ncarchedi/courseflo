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
  const [inputs, setInputs] = useState({});
  const [showSolutions, setShowSolutions] = useState(false);

  // imitate fetching the course content from an API
  useEffect(() => {
    setCourse(COURSE_CONTENT);
  }, []);

  const handleChangeInput = (itemId, value) => {
    setInputs({
      ...inputs,
      [itemId]: value,
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
                  inputs={inputs}
                  onChangeInput={handleChangeInput}
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
