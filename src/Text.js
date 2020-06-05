import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Statement({ content }) {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.title} variant="h6">
        {content.title}
      </Typography>
      <Typography variant="body1">{content.body}</Typography>
    </>
  );
}
