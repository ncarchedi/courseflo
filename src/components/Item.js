import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Paper from "@material-ui/core/Paper";
import ItemHeader from "../components/ItemHeader";
import ItemFooter from "../components/ItemFooter";
import Text from "../items/Text";
import Video from "../items/Video";
import Image from "../items/Image";
import SingleSelect from "../items/SingleSelect";
import MultiSelect from "../items/MultiSelect";
import TextInput from "../items/TextInput";
import NotesIcon from "@material-ui/icons/Notes";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import ImageIcon from "@material-ui/icons/Image";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import KeyboardIcon from "@material-ui/icons/Keyboard";

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
  const { item, answer, showSolution } = props;

  const getPointsText = (points) => {
    return points <= 1 ? points + " point" : points + "points";
  };

  // if author doesn't specify points, then use 1
  const points = item.points || 1;

  let pointsText;
  let helperText;
  let icon;
  let Component;

  switch (item.type) {
    case "Text":
      pointsText = null;
      helperText = null;
      icon = <NotesIcon color="disabled" />;
      Component = Text;
      break;
    case "Video":
      pointsText = null;
      helperText = null;
      icon = <OndemandVideoIcon color="disabled" />;
      Component = Video;
      break;
    case "Image":
      pointsText = null;
      helperText = null;
      icon = <ImageIcon color="disabled" />;
      Component = Image;
      break;
    case "SingleSelect":
      pointsText = getPointsText(points);
      helperText = "Select only one";
      icon = <FormatListBulletedIcon color="disabled" />;
      Component = SingleSelect;
      break;
    case "MultiSelect":
      pointsText = getPointsText(points);
      helperText = "Check all that apply";
      icon = <DoneAllIcon color="disabled" />;
      Component = MultiSelect;
      break;
    case "TextInput":
      pointsText = getPointsText(points);
      helperText = null;
      icon = <KeyboardIcon color="disabled" />;
      Component = TextInput;
      break;
    default:
      pointsText = null;
      helperText = null;
      icon = null;
      Component = null;
  }

  return (
    <>
      <Paper className={classes.block} elevation={2}>
        <ItemHeader
          item={item}
          titleColor={
            answer && showSolution
              ? answer.isCorrect
                ? green[600]
                : red[600]
              : null
          }
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
