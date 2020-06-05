import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Course from "./Course";
import FinalScreen from "./FinalScreen";
import COURSE_CONTENT from "./exampleCourse";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(5, "auto"),
  },
}));

export default function App() {
  const classes = useStyles();
  const [course, setCourse] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState();

  // imitate fetching the course content from an API
  useEffect(() => {
    setCourse(COURSE_CONTENT);
  }, []);

  const handleSubmit = (inputs) => {
    setSubmittedAnswers(inputs);
  };

  const handleRestart = () => {
    setSubmittedAnswers(null);
  };

  return (
    course && (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">{course.title}</Typography>
          </Toolbar>
        </AppBar>
        <Container className={classes.container} maxWidth="sm">
          {submittedAnswers ? (
            <FinalScreen
              message={course.finalMessage}
              onRestart={handleRestart}
            />
          ) : (
            <Course content={course.content} onSubmit={handleSubmit} />
          )}
        </Container>
      </>
    )
  );
}
