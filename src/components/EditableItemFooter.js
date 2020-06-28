import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import HeightIcon from "@material-ui/icons/Height";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function EditableItemFooter({
  item,
  onClickMove,
  onClickDelete,
}) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Button
        variant="outlined"
        onClick={onClickMove}
        startIcon={<HeightIcon />}
      >
        Move
      </Button>
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
