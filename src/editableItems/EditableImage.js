import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableImage({ item, onFocus, onChangeItemValue }) {
  return (
    <form onFocus={() => onFocus(item.id)}>
      <TextField
        name="source"
        label="Public URL"
        value={item.source}
        onChange={onChangeItemValue}
        margin="normal"
        fullWidth
      />
    </form>
  );
}
