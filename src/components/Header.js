import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FeedbackIcon from "@material-ui/icons/Feedback";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: ["Patrick Hand SC", "cursive"],
    fontSize: "1.9rem",
    flexGrow: 1,
  },
  remaining: {
    fontStyle: "italic",
    marginRight: theme.spacing(1),
  },
}));

export default function Header({
  courseTitle,
  numRemaining,
  setShowFeedbackModal,
}) {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h5" component="h1">
            {courseTitle}
          </Typography>
          <Typography className={classes.remaining} variant="body1">
            {(numRemaining ? numRemaining : "No") + " questions remaining"}
          </Typography>
          <IconButton
            onClick={() => setShowFeedbackModal(true)}
            color="inherit"
          >
            <FeedbackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* second toolbar due to: https://material-ui.com/components/app-bar/#fixed-placement */}
      <Toolbar />
    </>
  );
}
