import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { CorrectIcon, IncorrectIcon } from "../components/Icons";

const useStyles = makeStyles((theme) => ({
  prompt: {
    marginBottom: theme.spacing(2),
  },
  input: {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  solution: {
    marginTop: theme.spacing(2),
  },
  correct: {
    backgroundColor: green[100],
  },
  incorrect: {
    backgroundColor: red[100],
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
          <Typography
            className={classes.prompt}
            variant="h6"
            style={{ color: answer.isCorrect ? green[600] : red[600] }}
          >
            {item.prompt}
          </Typography>
          <Box
            className={`${classes.input} ${
              answer.isCorrect ? classes.correct : classes.incorrect
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
          {item.solution !== answer.value && (
            <TextField
              className={classes.solution}
              value={item.solution}
              fullWidth
              disabled
            />
          )}
        </>
      ) : (
        <>
          <Typography className={classes.prompt} variant="h6">
            {item.prompt}
          </Typography>
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
