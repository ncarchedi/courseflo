import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ItemTitle from "../components/ItemTitle";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Video({ item }) {
  const classes = useStyles();

  return (
    <>
      <ItemTitle className={classes.title}>{item.title}</ItemTitle>
      <img src={item.source} alt={item.title} width="100%" />
    </>
  );
}
