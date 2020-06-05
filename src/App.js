import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Quiz from "./Quiz";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3, "auto"),
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="sm">
      <Quiz content={CONTENT} />
    </Container>
  );
}

const CONTENT = [
  {
    id: 0,
    type: "statement",
    header: "Welcome to the example quiz 🙌",
    body: "This is a short demonstration of what's possible. Enjoy!",
  },
  {
    id: 1,
    type: "singleSelect",
    prompt: "What's 2 to the power of 3?",
    options: [4, 6, 8, 16],
    correct: 8,
  },
  {
    id: 2,
    type: "multiSelect",
    prompt: "Which of the following animals are reptiles?",
    options: ["Crocodile", "Otter", "Snake", "Horse", "Frog"],
    correct: ["Crocodile", "Snake", "Frog"],
  },
  {
    id: 3,
    type: "textInput",
    prompt: "What's the native language of Mexico?",
    correct: "Spanish",
  },
];
