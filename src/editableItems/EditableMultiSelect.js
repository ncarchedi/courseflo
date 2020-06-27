import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import useDebounce from "../hooks/useDebounce";

export default function EditableMultiSelect({ item, onFocus, onChangeItem }) {
  const [values, setValues] = useState(item);
  const debouncedValues = useDebounce(values, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChangeItem(debouncedValues), [debouncedValues]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeOptions = (e) => {
    const options = [...values.options];
    const index = Number(e.target.name);
    options[index] = e.target.value;
    setValues({ ...values, options });
  };

  return (
    <form>
      <TextField
        name="image"
        label="Image (optional)"
        value={values.image}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
        onFocus={() => onFocus(values.id)}
      />
      {values.options.map((o, index) => (
        <Grid key={"option" + index} container alignItems="flex-end">
          <Grid item xs={1}>
            <CheckBoxOutlineBlankIcon color="disabled" />
          </Grid>
          <Grid item xs={11}>
            <TextField
              name={String(index)}
              value={o}
              onChange={handleChangeOptions}
              margin="dense"
              fullWidth
              onFocus={() => onFocus(values.id)}
            />
          </Grid>
        </Grid>
      ))}
      <TextField
        name="solution"
        label="Solution"
        value={values.solution}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
        onFocus={() => onFocus(values.id)}
      />
      <TextField
        name="hint"
        label="Hint"
        value={values.hint}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
        onFocus={() => onFocus(values.id)}
      />
    </form>
  );
}
