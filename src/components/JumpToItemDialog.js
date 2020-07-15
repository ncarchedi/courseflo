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
import CheckIcon from "@material-ui/icons/Check";
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
  items,
  itemNumber,
  onChangeItemNumber,
  open,
  setOpen,
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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="jump-to-dialog-title"
    >
      <DialogTitle id="jump-to-dialog-title">Jump to...</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select an item to jump directly to it.
        </DialogContentText>
        <List dense>
          {items &&
            items.map((item, index) => (
              <ListItem
                className={`${index === itemNumber && classes.currentItem}`}
                key={item.id}
                button
                onClick={() => handleSelectItem(index)}
              >
                <ListItemIcon>
                  {index < itemNumber && <CheckIcon color="primary" />}
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
