import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import getItemComponent from "../utils/getItemComponent";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    margin: theme.spacing(0, "auto"),
    maxWidth: theme.breakpoints.values.md,
  },
}));

export default function Item({
  item,
  userItem,
  onItemLoad,
  onChangeAnswer,
  showSolution,
}) {
  const classes = useStyles();

  // adds a new userItem when the item loads (except in review)
  useEffect(() => {
    onItemLoad && onItemLoad(item);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // wait until item is available
  if (!item) return null;

  // get component based on item type
  const Component = getItemComponent(item.type);

  // if component type isn't valid, send error to console
  // and return null (i.e. don't display it)
  if (!Component) {
    console.error(`Error: "${item.type}" isn't a valid item type`);
    return null;
  }

  return (
    <Paper className={classes.container} elevation={2}>
      <Component
        item={item}
        userItem={userItem}
        onChangeAnswer={onChangeAnswer}
        showSolution={showSolution}
      />
    </Paper>
  );
}
