import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ClearIcon from "@material-ui/icons/Clear";
import renderHtmlFromString from "../utils/renderHtmlFromString";

export default function EditableSingleSelect({
  item,
  onFocus,
  onChangeItemValue,
  setItemValuesDirectly,
}) {
  const [openSolutionForm, setOpenSolutionForm] = useState(false);

  const handleChangeOption = (index, value) => {
    const options = [...item.options];
    options[index] = value;
    setItemValuesDirectly({ ...item, options });
  };

  const handleAddOption = () => {
    const options = [...item.options];
    options.push("");
    setItemValuesDirectly({ ...item, options });
  };

  const handleDeleteOption = (index) => {
    const options = [...item.options];
    options.splice(index, 1);
    setItemValuesDirectly({ ...item, options });
  };

  const handleEditSolution = () => {
    setOpenSolutionForm(true);
  };

  const handleSaveSolution = () => {
    setOpenSolutionForm(false);
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
      <>
        {openSolutionForm ? (
          <>
            <Box my={1}>
              <Typography variant="button">Choose correct answer:</Typography>
            </Box>
            <RadioGroup
              name="solution"
              value={item.solution}
              onChange={onChangeItemValue}
            >
              {item.options.map((o, index) => (
                <Box key={"option" + index}>
                  <FormControlLabel
                    value={o}
                    label={renderHtmlFromString(o)}
                    control={<Radio color="primary" />}
                  />
                </Box>
              ))}
            </RadioGroup>
            <Box mt={2}>
              <Button
                variant="outlined"
                onClick={handleSaveSolution}
                disabled={!item.solution}
              >
                Save solution
              </Button>
            </Box>
          </>
        ) : (
          <>
            {item.options.map((o, index) => (
              <Box key={"option" + index} display="flex" alignItems="center">
                <Box marginRight={1} display="flex">
                  {o && o === item.solution ? (
                    <RadioButtonCheckedIcon color="disabled" />
                  ) : (
                    <RadioButtonUncheckedIcon color="disabled" />
                  )}
                </Box>
                <TextField
                  name={String(index)}
                  value={o}
                  placeholder={"Option " + (index + 1)}
                  onChange={(e) => handleChangeOption(index, e.target.value)}
                  fullWidth
                />
                <Box>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDeleteOption(index)}>
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            ))}
            <Box display="flex" alignItems="center" marginTop={1.5}>
              <Box marginRight={1} display="flex">
                <RadioButtonUncheckedIcon color="disabled" />
              </Box>
              <Link
                variant="body1"
                color="textSecondary"
                onClick={handleAddOption}
              >
                Add option
              </Link>
            </Box>
            <Box mt={2}>
              {item.solution !== null && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleEditSolution}
                  disabled={
                    item.options.length === 0 ||
                    (item.options.length === 1 && item.options[0] === "")
                  }
                >
                  Edit solution
                </Button>
              )}
            </Box>
          </>
        )}
      </>
    </form>
  );
}
