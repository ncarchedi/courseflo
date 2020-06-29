import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import useDebounce from "../hooks/useDebounce";

export default function EditableDocument({ item, onFocus, onChangeItem }) {
  const [values, setValues] = useState(item);
  const debouncedValues = useDebounce(values, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChangeItem(debouncedValues), [debouncedValues]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <TextField
        name="source"
        label="Document URL"
        value={values.source}
        onChange={handleChange}
        margin="normal"
        fullWidth
        onFocus={() => onFocus(values.id)}
      />
    </form>
  );
}
