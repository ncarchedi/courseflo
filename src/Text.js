import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Statement({ item }) {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.title} variant="h6">
        {item.title}
      </Typography>
      <Typography variant="body1">{item.body}</Typography>
    </>
  );
}
