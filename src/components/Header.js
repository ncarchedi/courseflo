import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: ["Permanent Marker", "cursive"],
    flexGrow: 1,
  },
  remaining: {
    fontStyle: "italic",
  },
}));

export default function Header({ courseTitle, numRemaining }) {
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
        </Toolbar>
      </AppBar>
      {/* second toolbar due to: https://material-ui.com/components/app-bar/#fixed-placement */}
      <Toolbar />
    </>
  );
}
