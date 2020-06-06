import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { EmojiCorrect, EmojiIncorrect } from "../components/Emoji";

const useStyles = makeStyles((theme) => ({
  prompt: {
    marginBottom: theme.spacing(2),
  },
  solution: {
    marginTop: theme.spacing(2),
  },
}));

export default function TextInput({
  item,
  value,
  onChangeInput,
  showSolution,
}) {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.prompt} variant="h6">
        {item.prompt}
      </Typography>
      <Box component="span" display="flex" alignItems="center">
        {showSolution &&
          (item.solution === value ? <EmojiCorrect /> : <EmojiIncorrect />)}
        <TextField
          value={value}
          onChange={(e) => onChangeInput(item.id, e.target.value)}
          placeholder="Write your answer here..."
          fullWidth
          disabled={showSolution}
        />
      </Box>
      {showSolution && item.solution !== value && (
        <Box
          className={classes.solution}
          component="span"
          display="flex"
          alignItems="center"
        >
          <EmojiCorrect />
          <TextField value={item.solution} fullWidth disabled />
        </Box>
      )}
    </>
  );
}
