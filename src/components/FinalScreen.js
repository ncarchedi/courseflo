import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  scoreText: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  messageText: {
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    marginTop: theme.spacing(4),
  },
}));

export default function FinalScreen({ message, answers }) {
  const classes = useStyles();
  const history = useHistory();

  const numCorrect = answers.filter((a) => a.isCorrect).length;
  const numTotal = answers.length;

  return (
    <Box textAlign="center">
      <Typography
        className={classes.scoreText}
        variant="h3"
        color="secondary"
        gutterBottom
      >{`Your Score: ${numCorrect} / ${numTotal}`}</Typography>
      <Typography className={classes.messageText} variant="h6">
        {message}
      </Typography>
      <Button
        className={classes.button}
        onClick={() => history.push("/")}
        variant="contained"
        startIcon={<ArrowBackIcon />}
      >
        Review my answers
      </Button>
    </Box>
  );
}
