import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ReplayIcon from "@material-ui/icons/Replay";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
  },
}));

export default function FinalScreen({ message, onRestart }) {
  const classes = useStyles();

  return (
    <Box textAlign="center">
      <Typography variant="h6">{message}</Typography>
      <Button
        className={classes.button}
        onClick={onRestart}
        size="large"
        variant="contained"
        endIcon={<ReplayIcon />}
      >
        Start over
      </Button>
    </Box>
  );
}
