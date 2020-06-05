import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ReplayIcon from "@material-ui/icons/Replay";
import BigButton from "./BigButton";

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
      <BigButton
        className={classes.button}
        onClick={onRestart}
        variant="contained"
        endIcon={<ReplayIcon />}
      >
        Start over
      </BigButton>
    </Box>
  );
}
