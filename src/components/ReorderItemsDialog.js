import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { getItemIcon } from "../components/Icons";
import renderHtmlFromString from "../utils/renderHtmlFromString";

const useStyles = makeStyles((theme) => ({
  listItem: {
    cursor: "row-resize",
  },
  // https://github.com/clauderic/react-sortable-hoc/issues/87
  sortableHelper: {
    zIndex: theme.zIndex.modal + 100,
  },
}));

export default function ReorderItemsDialog({
  items,
  open,
  setOpen,
  onUpdateItems,
}) {
  const classes = useStyles();
  const [itemsArray, setItemsArray] = useState(items);

  const SortableItem = SortableElement(({ item }) => (
    <ListItem className={classes.listItem}>
      <ListItemIcon>{getItemIcon(item.type)}</ListItemIcon>
      <ListItemText
        primary={renderHtmlFromString(item.title || item.prompt)}
        primaryTypographyProps={{ noWrap: true }}
      />
    </ListItem>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <List dense>
        {items.map((item, index) => (
          <SortableItem key={item.id} index={index} item={item} />
        ))}
      </List>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const updatedList = arrayMove(itemsArray, oldIndex, newIndex);
    setItemsArray(updatedList);
  };

  const handleCancel = () => {
    setOpen(false);
    setItemsArray(items); // reset list order
  };

  const handleDone = () => {
    setOpen(false);
    onUpdateItems(itemsArray);
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Move Item(s)</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Drag-and-drop the items below to reorder them.
        </DialogContentText>
        <SortableList
          items={itemsArray}
          onSortEnd={onSortEnd}
          helperClass={classes.sortableHelper}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleDone}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
