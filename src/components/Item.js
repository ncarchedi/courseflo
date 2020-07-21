import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Paper from "@material-ui/core/Paper";
import ItemHeader from "./ItemHeader";
import ItemFooter from "./ItemFooter";
import getItemMetadata from "../utils/getItemMetadata";
import { CorrectItemIcon, IncorrectItemIcon } from "./Icons";

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
  const theme = useTheme();

  // adds a new userItem when the item loads (except in review)
  useEffect(() => {
    onItemLoad && onItemLoad(item);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // wait until item is available
  if (!item) return null;

  // get metadata based on item type
  let { Component, helperText, icon } = getItemMetadata(item);

  // if component type isn't valid, send error to console
  // and return null (i.e. don't display it)
  if (!Component) {
    console.error(`Error: "${item.type}" isn't a valid item type`);
    return null;
  }

  let titleColor;

  if (showSolution) {
    if (item.solution) {
      // if answerable and solution is provided
      if (userItem.isCorrect) {
        // if answerable and correct
        titleColor = green[800];
        icon = <CorrectItemIcon />;
      } else {
        // if answerable and incorrect
        titleColor = red[800];
        icon = <IncorrectItemIcon />;
      }
    } else {
      // if not answerable or solution is not provided
      titleColor = theme.palette.text.secondary;
    }
  }

  return (
    <>
      <Paper className={classes.container} elevation={2}>
        <ItemHeader
          item={item}
          titleColor={titleColor}
          helperText={helperText}
          icon={icon}
        />
        <Component
          item={item}
          userItem={userItem}
          onChangeAnswer={onChangeAnswer}
          showSolution={showSolution}
        />
        {!showSolution && <ItemFooter item={item} />}
      </Paper>
    </>
  );
}
