import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(2),
  },
}));

export default function EditableSingleSelect({ item }) {
  const classes = useStyles();

  return (
    <form className={classes.form}>
      {item.options.map((o) => (
        <Grid key={o.raw} container alignItems="flex-end">
          <Grid item xs={1}>
            <RadioButtonUncheckedIcon color="disabled" />
          </Grid>
          <Grid item xs={11}>
            <TextField name="options" value={o.raw} margin="dense" fullWidth />
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
        value={item.hint.raw}
        margin="normal"
        multiline
        fullWidth
      />
    </form>
  );
}
