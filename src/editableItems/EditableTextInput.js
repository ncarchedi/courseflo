import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableTextInput({
  item,
  onChangeItemValue,
  onFocus,
}) {
  const handleChange = (e) => {
    onChangeItemValue(e.target.name, e.target.value);
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
