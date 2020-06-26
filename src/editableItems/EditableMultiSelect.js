import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

export default function EditableMultiSelect({
  item,
  onFocus,
  onChangeItemValue,
}) {
  const handleChange = (e) => {
    onChangeItemValue(item.id, e.target.name, e.target.value);
  };

  const handleChangeOptions = (e) => {
    const updatedOptions = [...item.options];
    const index = Number(e.target.name);
    updatedOptions[index] = e.target.value;
    onChangeItemValue(item.id, "options", updatedOptions);
  };

  return (
    <form>
      <TextField
        name="image"
        label="Image (optional)"
        value={item.image}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
        onFocus={() => onFocus(item.id)}
      />
      {item.options.map((o, index) => (
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
              onFocus={() => onFocus(item.id)}
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
        onFocus={() => onFocus(item.id)}
      />
      <TextField
        name="hint"
        label="Hint"
        value={item.hint}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
        onFocus={() => onFocus(item.id)}
      />
    </form>
  );
}
