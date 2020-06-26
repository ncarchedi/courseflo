import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableImage({ item, onChangeItemValue, onFocus }) {
  const handleChange = (e) => {
    onChangeItemValue(e.target.name, e.target.value);
  };

  return (
    <form>
      <TextField
        name="source"
        label="Public URL"
        value={item.source}
        onChange={handleChange}
        margin="normal"
        fullWidth
        onFocus={() => onFocus(item.id)}
      />
    </form>
  );
}
