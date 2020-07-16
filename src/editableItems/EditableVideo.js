import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableVideo({ item, onFocus, onChangeItemValue }) {
  return (
    <form onFocus={() => onFocus(item.id)}>
      <TextField
        name="source"
        label="Video URL"
        value={item.source}
        onChange={onChangeItemValue}
        margin="normal"
        fullWidth
      />
    </form>
  );
}
