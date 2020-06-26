import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import EditableItemHeader from "./EditableItemHeader";
import EditableItemFooter from "./EditableItemFooter";
import getItemMetadata from "../utils/getItemMetadata";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

export default function Item(props) {
  const classes = useStyles();
  const { item } = props;

  // get metadata based on item type
  let { Component, icon } = getItemMetadata(item, true);

  return (
    <Paper className={classes.container} elevation={2}>
      <EditableItemHeader item={item} icon={icon} />
      <Component {...props} />
      <EditableItemFooter item={item} />
    </Paper>
  );
}
