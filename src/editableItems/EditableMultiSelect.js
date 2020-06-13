import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(2),
  },
}));

export default function EditableMultiSelect({ item }) {
  const classes = useStyles();

  return (
    <form className={classes.form}>
      {item.options.map((o) => (
        <Grid key={o} container alignItems="flex-end">
          <Grid item xs={1}>
            <CheckBoxOutlineBlankIcon color="disabled" />
          </Grid>
          <Grid item xs={11}>
            <TextField name="options" value={o} margin="dense" fullWidth />
          </Grid>
        </Grid>
      ))}
      <TextField
        name="solution"
        label="Solution"
        value={item.solution}
        margin="normal"
        multiline
        fullWidth
      />
      <TextField
        name="hint"
        label="Hint"
        value={item.hint}
        margin="normal"
        multiline
        fullWidth
      />
    </form>
  );
}
