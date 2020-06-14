import React from "react";
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

export default function ReorderItemsDialog({ items, open }) {
  return (
    <Dialog
      open={open}
      onClose={() => console.log("closing!")}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Reorder Items</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Drag-and-drop the items below to reorder them.
        </DialogContentText>
        <List dense>
          {items.map((item) => (
            <ListItem>
              <ListItemIcon>{getItemIcon(item.type)}</ListItemIcon>
              <ListItemText
                primary={renderHtmlFromString(item.title || item.prompt)}
                primaryTypographyProps={{ noWrap: true }}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => console.log("closing!")} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("closing!")}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
