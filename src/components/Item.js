import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ItemHeader from "../components/ItemHeader";
import ItemFooter from "../components/ItemFooter";
import Text from "../items/Text";
import Video from "../items/Video";
import Image from "../items/Image";
import SingleSelect from "../items/SingleSelect";
import MultiSelect from "../items/MultiSelect";
import TextInput from "../items/TextInput";
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
  const { item, itemNumber, answer, showSolution } = props;

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
      Component = Text;
      break;
    case "Video":
      pointsText = null;
      helperText = null;
      Component = Video;
      break;
    case "Image":
      pointsText = null;
      helperText = null;
      Component = Image;
      break;
    case "SingleSelect":
      pointsText = getPointsText(points);
      helperText = "Select only one";
      Component = SingleSelect;
      break;
    case "MultiSelect":
      pointsText = getPointsText(points);
      helperText = "Check all that apply";
      Component = MultiSelect;
      break;
    case "TextInput":
      pointsText = getPointsText(points);
      helperText = null;
      Component = TextInput;
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

  return (
    <>
      <Paper className={classes.block} elevation={2}>
        <ItemHeader
          item={item}
          itemNumber={itemNumber}
          titleColor={titleColor}
          pointsText={pointsText}
          helperText={helperText}
          icon={icon}
        />
        <Component {...props} />
        {answer && !showSolution && <ItemFooter hint={item.hint} />}
      </Paper>
    </>
  );
}
