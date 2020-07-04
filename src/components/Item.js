import React from "react";
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
  answer,
  onChangeAnswer,
  showSolution,
  userEmail,
  setUserEmail,
}) {
  const classes = useStyles();
  const theme = useTheme();

  if (!item) return null;

  // get metadata based on item type
  let { Component, helperText, icon } = getItemMetadata(item);

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
      <Paper className={classes.container} elevation={2}>
        <ItemHeader
          item={item}
          titleColor={titleColor}
          helperText={helperText}
          icon={icon}
        />
        <Component
          item={item}
          answer={answer}
          onChangeAnswer={onChangeAnswer}
          showSolution={showSolution}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
        />
        {!showSolution && <ItemFooter item={item} />}
      </Paper>
    </>
  );
}
