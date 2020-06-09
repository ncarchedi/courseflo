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

const useStyles = makeStyles((theme) => ({
  block: {
    margin: theme.spacing(2, "auto"),
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
  },
}));

// array of components so we can call one dynamically below
const itemComponents = {
  Text,
  Video,
  Image,
  SingleSelect,
  MultiSelect,
  TextInput,
};

export default function Item(props) {
  const classes = useStyles();
  const { item, answer, showSolution } = props;

  // if author doesn't specify points, then use 1
  const points = item.points || 1;
  // get the relevant item component
  const ItemComponent = itemComponents[item.type];

  return (
    <>
      <Paper className={classes.block} elevation={2}>
        {answer && showSolution ? (
          <ItemHeader
            item={item}
            titleColor={answer.isCorrect ? green[600] : red[600]}
            points={points}
          />
        ) : (
          <ItemHeader item={item} points={points} />
        )}
        <ItemComponent {...props} />
        {answer && !showSolution && <ItemFooter hint={item.hint} />}
      </Paper>
    </>
  );
}
