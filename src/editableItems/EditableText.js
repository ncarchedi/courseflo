import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import useDebounce from "../hooks/useDebounce";

export default function EditableText({ item, onFocus, onChangeItem }) {
  const [values, setValues] = useState(item);
  const debouncedValues = useDebounce(values, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChangeItem(debouncedValues), [debouncedValues]);

  const handleChange = (e) => {
    setValues({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <TextField
        name="body"
        label="Body"
        value={values.body}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
        onFocus={() => onFocus(values.id)}
      />
    </form>
  );
}
