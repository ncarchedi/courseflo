import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import renderHtmlFromString from "../utils/renderHtmlFromString";

const useStyles = makeStyles((theme) => ({
  currentItem: {
    backgroundColor: theme.palette.grey[300],
    borderRadius: theme.shape.borderRadius,
    "& span": {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
}));

export default function JumpToItemDialog({
  open,
  setOpen,
  items,
  userItems,
  itemNumber,
  onChangeItemNumber,
}) {
  const classes = useStyles();

  const handleSelectItem = (index) => {
    handleClose();
    onChangeItemNumber(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // wait until items have loaded
  if (!items) return null;

  // array of IDs for items that have been started
  const itemsStarted = userItems.map((ui) => ui.itemId);

  // array of IDs for items that have been completed
  // (for unanswerable items, this means started)
  // TODO: prevent this from running on every keystroke!
  const itemsCompleted = userItems
    .filter((ui) => {
      const isAnswerable = !!ui.solution;
      return isAnswerable
        ? ui.answer && !!ui.answer.length
        : itemsStarted.includes(ui.itemId);
    })
    .map((ui) => ui.itemId);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="jump-to-dialog-title"
    >
      <DialogTitle id="jump-to-dialog-title">Jump to...</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select an item you've already completed to jump back to it.
        </DialogContentText>
        <List dense>
          {items &&
            items.map((item, index) => (
              <ListItem
                className={`${index === itemNumber && classes.currentItem}`}
                key={item.id}
                button
                onClick={() => handleSelectItem(index)}
                disabled={!itemsStarted.includes(item.id)}
              >
                <ListItemIcon>
                  {itemsCompleted.includes(item.id) ? (
                    <CheckCircleOutlineOutlinedIcon color="primary" />
                  ) : (
                    <RadioButtonUncheckedOutlinedIcon color="primary" />
                  )}
                </ListItemIcon>
                <Tooltip
                  title={renderHtmlFromString(item.title || item.prompt)}
                >
                  <ListItemText
                    primary={renderHtmlFromString(item.title || item.prompt)}
                    primaryTypographyProps={{ noWrap: true }}
                  />
                </Tooltip>
              </ListItem>
            ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
