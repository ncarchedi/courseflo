import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import HeightIcon from "@material-ui/icons/Height";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: "flex",
  },
}));

export default function EditableItemFooter({
  item,
  onChangeItem,
  onClickMove,
  onClickDelete,
}) {
  const classes = useStyles();

  const handleToggleRequired = () => {
    onChangeItem({
      ...item,
      required: !item.required,
    });
  };

  // is the item gradable (i.e. can it have a solution)?
  const isGradable = "solution" in item;

  return (
    <Box className={classes.container}>
      <Box flexGrow={1}>
        {isGradable && (
          <FormControlLabel
            control={
              <Switch
                checked={item.required || false}
                onChange={handleToggleRequired}
                color="primary"
              />
            }
            label="Required"
          />
        )}
      </Box>
      <Box mr={1}>
        <Button
          variant="outlined"
          onClick={onClickMove}
          startIcon={<HeightIcon />}
        >
          Move
        </Button>
      </Box>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => onClickDelete(item.id)}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    </Box>
  );
}
