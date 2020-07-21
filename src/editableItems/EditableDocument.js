import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableDocument({ item, onFocus, onChangeItemValue }) {
  return (
    <form onFocus={() => onFocus(item.id)}>
      <TextField
        name="source"
        label="Document URL"
        value={item.source}
        onChange={onChangeItemValue}
        margin="dense"
        fullWidth
      />
    </form>
  );
}
