import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ItemTitle from "../components/ItemTitle";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Statement({ item }) {
  const classes = useStyles();

  return (
    <>
      <ItemTitle className={classes.title}>{item.title}</ItemTitle>
      <Typography variant="body1">{item.body}</Typography>
    </>
  );
}
