import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Course from "./Course";
import COURSE_CONTENT from "../api/exampleCourse";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: ["Permanent Marker", "cursive"],
  },
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

  // imitate fetching the course content from an API
  useEffect(() => {
    setCourse(COURSE_CONTENT);
  }, []);

  return (
    course && (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h5" component="h1">
              {course.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className={classes.container} maxWidth="sm">
          <Course content={course.content} />
        </Container>
      </>
    )
  );
}
