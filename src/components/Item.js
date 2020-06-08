import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Text from "../items/Text";
import Video from "../items/Video";
import Image from "../items/Image";
import SingleSelect from "../items/SingleSelect";
import MultiSelect from "../items/MultiSelect";
import TextInput from "../items/TextInput";

const useStyles = makeStyles((theme) => ({
  box: {
    margin: theme.spacing(2, "auto"),
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
  },
}));

export default function Item(props) {
  const classes = useStyles();
  const { item } = props;

  let currentItem;
  switch (item.type) {
    case "text":
      currentItem = <Text item={item} />;
      break;
    case "video":
      currentItem = <Video item={item} />;
      break;
    case "image":
      currentItem = <Image item={item} />;
      break;
    case "singleSelect":
      currentItem = <SingleSelect {...props} />;
      break;
    case "multiSelect":
      currentItem = <MultiSelect {...props} />;
      break;
    case "textInput":
      currentItem = <TextInput {...props} />;
      break;
    default:
      currentItem = (
        <Typography color="secondary">{`"${item.type}" isn't a valid item type!`}</Typography>
      );
  }

  return (
    <>
      <Paper className={classes.box} elevation={2}>
        {currentItem}
      </Paper>
    </>
  );
}
