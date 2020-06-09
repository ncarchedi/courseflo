import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { CorrectIcon, IncorrectIcon } from "../components/Icons";

const useStyles = makeStyles((theme) => ({
  input: {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  correctInput: {
    backgroundColor: green[100],
  },
  incorrectInput: {
    backgroundColor: red[100],
  },
  correctAnswer: {
    margin: theme.spacing(1, 0),
    fontSize: "1rem",
  },
}));

export default function TextInput({
  item,
  answer,
  onChangeAnswer,
  showSolution,
}) {
  const classes = useStyles();

  return (
    <>
      {showSolution ? (
        <>
          <Box
            className={`${classes.input} ${
              answer.isCorrect ? classes.correctInput : classes.incorrectInput
            }`}
            component="span"
            display="flex"
            alignItems="center"
          >
            <TextField
              value={answer.value}
              onChange={(e) => onChangeAnswer(item.id, e.target.value)}
              placeholder="Write your answer here..."
              fullWidth
              disabled
            />
            {item.solution === answer.value ? (
              <CorrectIcon />
            ) : (
              <IncorrectIcon />
            )}
          </Box>
          {!answer.isCorrect && (
            <>
              <Typography
                className={classes.correctAnswer}
                variant="h6"
                color="textSecondary"
              >
                Correct answer
              </Typography>
              <TextField value={item.solution} fullWidth disabled />
            </>
          )}
        </>
      ) : (
        <>
          <Box component="span" display="flex" alignItems="center">
            <TextField
              value={answer.value}
              onChange={(e) => onChangeAnswer(item.id, e.target.value)}
              placeholder="Write your answer here..."
              fullWidth
            />
          </Box>
        </>
      )}
    </>
  );
}
