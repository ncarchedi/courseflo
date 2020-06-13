import React from "react";
import { Link as RouterLink, useParams, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import computeScoreFromAnswers from "../utils/computeScoreFromAnswers";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
  },
  scoreText: {
    marginBottom: theme.spacing(3),
    fontWeight: theme.typography.fontWeightMedium,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h3.fontSize,
    },
  },
  messageText: {
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    marginTop: theme.spacing(4),
  },
}));

export default function Score({ message, answers }) {
  const classes = useStyles();
  const { courseId } = useParams();

  // define path back to course
  const coursePath = `/course/${courseId}`;
  if (!answers) return <Redirect to={coursePath} />;

  const { numCorrect, numTotal } = computeScoreFromAnswers(answers);
  const percentCorrect = ((numCorrect / numTotal) * 100).toFixed(0);

  return (
    <Paper className={classes.container} elevation={2}>
      <Typography
        className={classes.scoreText}
        variant="h4"
        color="primary"
      >{`Your Score: ${numCorrect}/${numTotal} (${percentCorrect}%)`}</Typography>
      <Typography className={classes.messageText} variant="h6">
        {message}
      </Typography>
      <Button
        className={classes.button}
        component={RouterLink}
        to={coursePath}
        variant="contained"
        color="primary"
      >
        Review my answers
      </Button>
    </Paper>
  );
}
