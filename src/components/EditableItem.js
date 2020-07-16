import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import EditableItemHeader from "./EditableItemHeader";
import EditableItemFooter from "./EditableItemFooter";
import getItemComponent from "../utils/getItemComponent";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    margin: theme.spacing(0, "auto"),
    maxWidth: theme.breakpoints.values.md,
  },
  focused: {
    borderLeft: "solid",
    borderLeftWidth: theme.spacing(1),
    borderLeftColor: theme.palette.primary.main,
  },
}));

export default function EditableItem({
  item,
  focused,
  onFocus,
  onChangeItem,
  onClickMove,
  onClickDelete,
}) {
  const classes = useStyles();

  if (!item) return null;

  // get component based on item type
  const Component = getItemComponent(item.type, true);
  const icon = null;

  return (
    <Paper
      className={`${classes.container} ${focused && classes.focused}`}
      elevation={2}
    >
      <EditableItemHeader
        item={item}
        icon={icon}
        onFocus={onFocus}
        onChangeItem={onChangeItem}
      />
      <Component item={item} onFocus={onFocus} onChangeItem={onChangeItem} />
      <EditableItemFooter
        item={item}
        onChangeItem={onChangeItem}
        onClickMove={onClickMove}
        onClickDelete={onClickDelete}
      />
    </Paper>
  );
}
