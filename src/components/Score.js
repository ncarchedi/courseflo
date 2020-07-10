import React from "react";
import { Link as RouterLink, useParams, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import computeScoreFromAnswers from "../utils/computeScoreFromAnswers";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(3),
    },
  },
  scoreText: {
    marginBottom: theme.spacing(2),
    fontWeight: theme.typography.fontWeightMedium,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h3.fontSize,
    },
  },
  messageText: {
    fontWeight: theme.typography.fontWeightRegular,
    marginBottom: theme.spacing(3),
  },
  button: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

export default function Score({ showScore, message, finalCta, answers }) {
  const classes = useStyles();
  const { courseId } = useParams();

  // define path back to course
  const coursePath = `/course/${courseId}`;
  if (!answers) return <Redirect to={coursePath} />;

  const { numCorrect, numTotal, percCorrect } = computeScoreFromAnswers(
    answers
  );

  return (
    <Paper className={classes.container} elevation={2}>
      <Typography className={classes.scoreText} variant="h4" color="primary">
        {showScore && numTotal > 0
          ? `Your Score: ${numCorrect}/${numTotal} (${percCorrect}%)`
          : "You're all done!"}
      </Typography>
      <Typography className={classes.messageText} variant="h6">
        {message}
      </Typography>
      <Box>
        <Button
          className={classes.button}
          component={RouterLink}
          to={coursePath}
          variant="outlined"
          color="primary"
        >
          Review my answers
        </Button>
        {finalCta && (
          <Button
            className={classes.button}
            href={finalCta.url}
            variant="contained"
            color="primary"
            target="_blank"
            rel="noopener"
          >
            {finalCta.label}
          </Button>
        )}
      </Box>
    </Paper>
  );
}
