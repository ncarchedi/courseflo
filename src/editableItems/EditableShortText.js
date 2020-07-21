import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export default function EditableShortText({
  item,
  onFocus,
  onChangeItemValue,
  setItemValuesDirectly,
}) {
  const [openSolutionForm, setOpenSolutionForm] = useState(false);

  const toggleSolution = () => {
    handleRemoveSolution();
    setOpenSolutionForm(!openSolutionForm);
  };

  const handleRemoveSolution = () => {
    setItemValuesDirectly({ ...item, solution: null });
  };

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
      {openSolutionForm && (
        <TextField
          name="solution"
          label="Solution"
          value={item.solution || ""}
          onChange={onChangeItemValue}
          margin="dense"
          multiline
          fullWidth
        />
      )}
      <Box mt={2}>
        <Button variant="outlined" onClick={toggleSolution}>
          {openSolutionForm ? "Remove solution" : "Add solution"}
        </Button>
      </Box>
    </form>
  );
}
