import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import renderHtmlFromString from "../utils/renderHtmlFromString";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
  },
  hintText: {
    fontStyle: "italic",
  },
}));

export default function EditableItemFooter({
  item,
  editing,
  setEditing,
  onSaveItemValues,
  onDeleteItem,
}) {
  const classes = useStyles();

  const onClickDone = () => {
    setEditing(false);
    onSaveItemValues();
  };

  const onClickDelete = () => {
    setEditing(false);
    onDeleteItem(item.id);
  };

  if (editing)
    return (
      <Box className={classes.container}>
        <Button variant="contained" color="primary" onClick={onClickDone}>
          Done
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

  if (!item.hint) return null;

  return (
    <Box className={classes.container}>
      <Typography className={classes.hintText} color="textSecondary">
        {renderHtmlFromString(item.hint)}
      </Typography>
    </Box>
  );
}
