import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Course from "./Course";
import COURSE_CONTENT from "./exampleCourse";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(5, "auto"),
  },
}));

export default function App() {
  const classes = useStyles();
  const [course, setCourse] = useState(null);

  // imitate fetching the course content from an API
  useEffect(() => {
    setCourse(COURSE_CONTENT);
  }, []);

  return (
    course && (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">{course.title}</Typography>
          </Toolbar>
        </AppBar>
        <Container className={classes.container} maxWidth="sm">
          <Course content={course.content} />
        </Container>
      </>
    )
  );
}
