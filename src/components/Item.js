import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ItemHeader from "../components/ItemHeader";
import EditableItemHeader from "../components/EditableItemHeader";
import ItemFooter from "../components/ItemFooter";

import Text from "../items/Text";
import Video from "../items/Video";
import Image from "../items/Image";
import SingleSelect from "../items/SingleSelect";
import MultiSelect from "../items/MultiSelect";
import TextInput from "../items/TextInput";

import EditableText from "../editableItems/EditableText";
import EditableVideo from "../editableItems/EditableVideo";
import EditableImage from "../editableItems/EditableImage";
import EditableSingleSelect from "../editableItems/EditableSingleSelect";
import EditableMultiSelect from "../editableItems/EditableMultiSelect";
import EditableTextInput from "../editableItems/EditableTextInput";

import {
  CorrectItemIcon,
  IncorrectItemIcon,
  getItemIcon,
} from "../components/Icons";

const useStyles = makeStyles((theme) => ({
  block: {
    margin: theme.spacing(2, "auto"),
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
  },
}));

export default function Item(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [editing, setEditing] = useState(false);
  const { item, answer, showSolution, editable, onChangeItem } = props;
  const getPointsText = (points) => {
    return points <= 1 ? points + " point" : points + "points";
  };

  // if author doesn't specify points, then use 1
  const points = item.points || 1;

  // figure out display details based on item type
  let pointsText;
  let helperText;
  let Component;

  switch (item.type) {
    case "Text":
      pointsText = null;
      helperText = null;
      Component = editing ? EditableText : Text;
      break;
    case "Video":
      pointsText = null;
      helperText = null;
      Component = editing ? EditableVideo : Video;
      break;
    case "Image":
      pointsText = null;
      helperText = null;
      Component = editing ? EditableImage : Image;
      break;
    case "SingleSelect":
      pointsText = getPointsText(points);
      helperText = "Select only one";
      Component = editing ? EditableSingleSelect : SingleSelect;
      break;
    case "MultiSelect":
      pointsText = getPointsText(points);
      helperText = "Check all that apply";
      Component = editing ? EditableMultiSelect : MultiSelect;
      break;
    case "TextInput":
      pointsText = getPointsText(points);
      helperText = null;
      Component = editing ? EditableTextInput : TextInput;
      break;
    default:
      pointsText = null;
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

  return editable ? (
    <Paper
      className={classes.block}
      elevation={2}
      onClick={() => !editing && setEditing(true)}
    >
      {editing ? (
        <EditableItemHeader
          item={item}
          icon={icon}
          onChangeItem={onChangeItem}
        />
      ) : (
        <ItemHeader
          item={item}
          titleColor={titleColor}
          pointsText={pointsText}
          helperText={helperText}
          icon={icon}
        />
      )}
      <Component {...props} />
      <ItemFooter item={item} editing={editing} setEditing={setEditing} />
    </Paper>
  ) : (
    <Paper className={classes.block} elevation={2}>
      <ItemHeader
        item={item}
        titleColor={titleColor}
        pointsText={pointsText}
        helperText={helperText}
        icon={icon}
      />
      <Component {...props} />
      {answer && !showSolution && <ItemFooter item={item} />}
    </Paper>
  );
}
