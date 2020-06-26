import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import HeightIcon from "@material-ui/icons/Height";
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
  delete: {
    marginLeft: theme.spacing(1),
  },
}));

export default function EditableItemFooter({
  item,
  editing,
  setEditing,
  onSaveItemValues,
  onDeleteItem,
  setOpenReorderDialog,
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
        <Box>
          <Button
            variant="outlined"
            onClick={() => setOpenReorderDialog(true)}
            startIcon={<HeightIcon />}
          >
            Move
          </Button>
          <Button
            className={classes.delete}
            variant="outlined"
            color="secondary"
            onClick={onClickDelete}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
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
