import React from "react";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function LoadingScreen({ text }) {
  const classes = useStyles();

  return (
    <Box className={classes.loadingContainer}>
      <Box marginBottom={1}>
        <CircularProgress />
      </Box>
      {text && (
        <Typography variant="body1" color="textSecondary">
          Loading your course...
        </Typography>
      )}
    </Box>
  );
}
