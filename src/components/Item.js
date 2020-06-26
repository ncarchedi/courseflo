import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Paper from "@material-ui/core/Paper";
import ItemHeader from "./ItemHeader";
import ItemFooter from "./ItemFooter";
import EditableItemHeader from "./EditableItemHeader";
import EditableItemFooter from "./EditableItemFooter";
import getItemMetadata from "../utils/getItemMetadata";
import { CorrectItemIcon, IncorrectItemIcon } from "./Icons";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

export default function Item(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { item, answer, showSolution, editable } = props;

  // get metadata based on item type
  let { Component, helperText, icon } = getItemMetadata(item, editable);

  let titleColor;

  // logic for when solutions are shown
  if (showSolution) {
    if (answer && answer.isCorrect) {
      titleColor = green[800];
      icon = <CorrectItemIcon />;
    } else if (answer && !answer.isCorrect) {
      titleColor = red[800];
      icon = <IncorrectItemIcon />;
    } else {
      titleColor = theme.palette.text.secondary;
      icon = null;
    }
  }

  return (
    <>
      {editable ? (
        <Paper className={classes.container} elevation={2}>
          <EditableItemHeader item={item} icon={icon} />
          <Component {...props} />
          {!showSolution && <EditableItemFooter item={item} />}
        </Paper>
      ) : (
        <Paper className={classes.container} elevation={2}>
          <ItemHeader
            item={item}
            titleColor={titleColor}
            helperText={helperText}
            icon={icon}
          />
          <Component {...props} />
          {!showSolution && <ItemFooter item={item} />}
        </Paper>
      )}
    </>
  );
}
