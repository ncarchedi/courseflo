import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Emoji from "./Emoji";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3, "auto", 10, "auto"),
  },
  title: {
    marginBottom: theme.spacing(4),
    fontSize: theme.typography.h3.fontSize,
  },
  buttons: {
    marginTop: theme.spacing(4),
  },
  cta: {
    marginBottom: theme.spacing(2),
  },
}));

const exampleCourseOptions = [
  { title: "Exploring the Cosmos", author: "Buzz Aldrin" },
  { title: "Fundamentals of Plank Construction", author: "Jack Sparrow" },
  { title: "Statistics 101", author: "Florence Nightingale" },
  { title: "How to Fill a Stadium", author: "Beyoncé Knowles" },
  { title: "A Beginner's Guide to Broomsticks", author: "Harry Potter" },
  { title: "How to Write a Novel", author: "Jane Austen" },
];

// details here: https://react-dropzone.js.org/
// and here: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
export default function CreateCourse() {
  const classes = useStyles();
  // const [newCourse, setNewCourse] = useState();
  const [courseId, setCourseId] = useState();

  // useEffect(() => {
  //   if (newCourse) {
  //     saveCourseToFirestore(newCourse)
  //       .then((docRef) => setCourseId(docRef.id))
  //       .catch((error) =>
  //         console.error("Error uploading course to Firestore: ", error)
  //       );
  //   }
  // }, [newCourse]);

  // select random course data placeholders
  const exampleCourse =
    exampleCourseOptions[
      Math.floor(Math.random() * exampleCourseOptions.length)
    ];

  return (
    <Container className={classes.container} maxWidth="sm">
      {courseId ? (
        <Redirect to={`/course/${courseId}`} />
      ) : (
        <>
          <Typography className={classes.title} variant="h2" align="center">
            Create a Course <Emoji symbol="📝" label="memo" />
          </Typography>
          <form>
            <TextField
              label="Course name"
              placeholder={exampleCourse.title}
              margin="dense"
              fullWidth
              autoFocus
            />
            <TextField
              label="Your name"
              placeholder={exampleCourse.author}
              margin="dense"
              fullWidth
            />
            {/* <TextField
            label="Completion message"
            placeholder="Thanks for completing the course! 🙌"
            margin="dense"
            multiline
            fullWidth
          /> */}
            <Box className={classes.buttons} textAlign="center">
              <Button
                className={classes.cta}
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
              >
                Let's do this!
              </Button>
              <Typography variant="body2" color="textSecondary">
                <Link
                  style={{ color: "inherit" }}
                  href="https://course-builder.netlify.app/course/mfRbHtnQ5rlR5KHsUyFV"
                  target="_blank"
                >
                  See an example course
                </Link>
              </Typography>
            </Box>
          </form>
        </>
      )}
    </Container>
  );
}
