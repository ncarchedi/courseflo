import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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
