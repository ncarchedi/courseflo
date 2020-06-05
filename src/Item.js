import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Text from "./Text";
import Video from "./Video";
import SingleSelect from "./SingleSelect";
import MultiSelect from "./MultiSelect";
import TextInput from "./TextInput";

const useStyles = makeStyles((theme) => ({
  box: {
    margin: theme.spacing(3, "auto"),
  },
}));

export default function Item({ content }) {
  const classes = useStyles();

  let item;
  switch (content.type) {
    case "text":
      item = <Text content={content} />;
      break;
    case "video":
      item = <Video content={content} />;
      break;
    case "singleSelect":
      item = <SingleSelect content={content} />;
      break;
    case "multiSelect":
      item = <MultiSelect content={content} />;
      break;
    case "textInput":
      item = <TextInput content={content} />;
      break;
    default:
      item = (
        <Typography color="secondary">{`"${content.type}" isn't a valid item type!`}</Typography>
      );
  }

  return (
    <>
      <Box className={classes.box}>{item}</Box>
      <Divider light />
    </>
  );
}
