import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ItemHeader from "./ItemHeader";
import ItemFooter from "./ItemFooter";

import Text from "../items/Text";
import Video from "../items/Video";
import Document from "../items/Document";
import Image from "../items/Image";
import SingleSelect from "../items/SingleSelect";
import MultiSelect from "../items/MultiSelect";
import TextInput from "../items/TextInput";

import { CorrectItemIcon, IncorrectItemIcon, getItemIcon } from "./Icons";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));

export default function Item(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { item, answer, showSolution } = props;

  // figure out display details based on item type
  let helperText;
  let Component;

  switch (item.type) {
    case "Text":
      helperText = null;
      Component = Text;
      break;
    case "Video":
      helperText = null;
      Component = Video;
      break;
    case "Document":
      helperText = null;
      Component = Document;
      break;
    case "Image":
      helperText = null;
      Component = Image;
      break;
    case "SingleSelect":
      helperText = "Select only one";
      Component = SingleSelect;
      break;
    case "MultiSelect":
      helperText = "Check all that apply";
      Component = MultiSelect;
      break;
    case "TextInput":
      helperText = null;
      Component = TextInput;
      break;
    default:
      helperText = null;
      Component = () => (
        <Typography>{`Error: "${item.type}" is not a valid item type.`}</Typography>
      );
  }

  let titleColor;
  let icon = getItemIcon(item.type);

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
  );
}
