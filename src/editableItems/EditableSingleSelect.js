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

export default function EditableSingleSelect({ item, onChangeItemValue }) {
  const classes = useStyles();

  const handleChange = (e) => {
    onChangeItemValue(e.target.name, e.target.value);
  };

  const handleChangeOptions = (e) => {
    const updatedOptions = [...item.options];
    const index = Number(e.target.name);
    updatedOptions[index] = e.target.value;
    onChangeItemValue("options", updatedOptions);
  };

  return (
    <form className={classes.form}>
      {item.options.map((o, index) => (
        <Grid key={"option" + index} container alignItems="flex-end">
          <Grid item xs={1}>
            <RadioButtonUncheckedIcon color="disabled" />
          </Grid>
          <Grid item xs={11}>
            <TextField
              name={String(index)}
              value={o}
              onChange={handleChangeOptions}
              margin="dense"
              fullWidth
            />
          </Grid>
        </Grid>
      ))}
      <TextField
        name="solution"
        label="Solution"
        value={item.solution}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
      />
      <TextField
        name="hint"
        label="Hint"
        value={item.hint}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
      />
    </form>
  );
}
