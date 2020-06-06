import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BigButton from "./BigButton";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
  },
}));

export default function FinalScreen({ message }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box textAlign="center">
      <Typography variant="h6">{message}</Typography>
      <BigButton
        className={classes.button}
        onClick={() => history.push("/")}
        variant="contained"
        startIcon={<ArrowBackIcon />}
      >
        Review my answers
      </BigButton>
    </Box>
  );
}
