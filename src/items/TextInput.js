import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  prompt: {
    marginBottom: theme.spacing(2),
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
      <TextField
        value={value}
        onChange={(e) => onChangeInput(item.id, e.target.value)}
        placeholder="Write your answer here..."
        fullWidth
        disabled={showSolution}
      />
    </>
  );
}
