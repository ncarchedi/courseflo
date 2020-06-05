import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Video({ content }) {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.title} variant="h6">
        {content.title}
      </Typography>
      <iframe
        width="560"
        height="315"
        src={content.source}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </>
  );
}
