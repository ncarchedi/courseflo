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
  onDeleteItem,
  setOpenReorderDialog,
}) {
  const classes = useStyles();

  const onClickDelete = () => {
    onDeleteItem(item.id);
  };

  return (
    <Box className={classes.container}>
      <Button
        variant="outlined"
        onClick={() => setOpenReorderDialog(true)}
        startIcon={<HeightIcon />}
      >
        Move
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onClickDelete}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    </Box>
  );
}
