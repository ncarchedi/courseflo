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
  reviewButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Score({ message, finalCta, answers }) {
  const classes = useStyles();
  const { courseId } = useParams();

  // define path back to course
  const coursePath = `/course/${courseId}`;
  if (!answers) return <Redirect to={coursePath} />;

  const { numCorrect, numTotal } = computeScoreFromAnswers(answers);
  const percentCorrect = ((numCorrect / numTotal) * 100).toFixed(0);

  return (
    <Paper className={classes.container} elevation={2}>
      <Typography className={classes.scoreText} variant="h4" color="primary">
        {numTotal > 0
          ? `Your Score: ${numCorrect}/${numTotal} (${percentCorrect}%)`
          : "You're all done"}
      </Typography>
      <Typography className={classes.messageText} variant="h6">
        {message}
      </Typography>
      <Box display="flex">
        <Button
          className={classes.reviewButton}
          component={RouterLink}
          to={coursePath}
          variant="outlined"
          color="primary"
        >
          Review my answers
        </Button>
        {finalCta && (
          <Button
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
