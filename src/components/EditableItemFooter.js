import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import HeightIcon from "@material-ui/icons/Height";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
}));

export default function EditableItemFooter({
  item,
  onFocus,
  onToggleRequired,
  onToggleGraded,
  onClickMove,
  onClickDelete,
}) {
  const classes = useStyles();

  // is the item answerable (i.e. can it have a solution)?
  const isAnswerable = "solution" in item;

  return (
    <Box className={classes.container}>
      <Box flexGrow={1}>
        {isAnswerable && (
          <form onFocus={() => onFocus(item.id)}>
            <FormControlLabel
              control={
                <Switch
                  checked={item.required || false}
                  onChange={onToggleRequired}
                  color="primary"
                />
              }
              label="Required"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={item.solution !== null}
                  onChange={onToggleGraded}
                  color="primary"
                />
              }
              label="Graded"
            />
          </form>
        )}
      </Box>
      <Tooltip title="Move">
        <IconButton onClick={onClickMove} aria-label="move">
          <HeightIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          onClick={() => onClickDelete(item.id)}
          edge="end"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
