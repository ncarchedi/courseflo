import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Video({ item }) {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.title} variant="h6">
        {item.title}
      </Typography>
      <iframe
        title={item.title}
        src={item.source}
        width="560"
        height="315"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </>
  );
}
