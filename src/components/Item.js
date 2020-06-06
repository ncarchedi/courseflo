import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Text from "../items/Text";
import Video from "../items/Video";
import Image from "../items/Image";
import SingleSelect from "../items/SingleSelect";
import MultiSelect from "../items/MultiSelect";
import TextInput from "../items/TextInput";

const useStyles = makeStyles((theme) => ({
  box: {
    margin: theme.spacing(3, "auto"),
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
      <Box className={classes.box}>{currentItem}</Box>
      <Divider light />
    </>
  );
}