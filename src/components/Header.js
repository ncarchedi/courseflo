import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: ["Permanent Marker", "cursive"],
  },
}));

export default function Header({ courseTitle }) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h5" component="h1">
          {courseTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
