import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import useDebounce from "../hooks/useDebounce";

export default function EditableLongText({ item, onFocus, onChangeItem }) {
  const [values, setValues] = useState(item);
  const debouncedValues = useDebounce(values, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChangeItem(debouncedValues), [debouncedValues]);

  const handleChange = (e) => {
    setValues({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <form onFocus={() => onFocus(values.id)}>
      <TextField
        name="image"
        label="Image (optional)"
        value={values.image}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
      />
      <TextField
        name="solution"
        label="Solution"
        value={values.solution}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
      />
      <TextField
        name="hint"
        label="Hint (optional)"
        value={values.hint}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
      />
    </form>
  );
}