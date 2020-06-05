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
      <img src={item.source} alt={item.title} width="100%" />
    </>
  );
}
