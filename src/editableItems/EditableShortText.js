import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableShortText({
  item,
  onFocus,
  onChangeItemValue,
}) {
  return (
    <form onFocus={() => onFocus(item.id)}>
      <TextField
        name="image"
        label="Image (optional)"
        value={item.image}
        onChange={onChangeItemValue}
        margin="dense"
        multiline
        fullWidth
      />
      <TextField
        name="hint"
        label="Hint (optional)"
        value={item.hint}
        onChange={onChangeItemValue}
        margin="dense"
        multiline
        fullWidth
      />
      {item.solution !== null && (
        <TextField
          name="solution"
          label="Solution"
          value={item.solution}
          onChange={onChangeItemValue}
          margin="dense"
          multiline
          fullWidth
        />
      )}
    </form>
  );
}
