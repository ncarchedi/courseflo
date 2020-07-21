import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import EditableItemHeader from "./EditableItemHeader";
import EditableItemFooter from "./EditableItemFooter";
import getItemMetadata from "../utils/getItemMetadata";
import useDebounce from "../hooks/useDebounce";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    margin: theme.spacing(0, "auto"),
    maxWidth: theme.breakpoints.values.md,
  },
  focused: {
    border: "solid",
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
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
  // should only update `itemValues` directly from the form
  // global `item` state will be updated after debounce
  const [itemValues, setItemValues] = useState(item);
  const debouncedValues = useDebounce(itemValues, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChangeItem(debouncedValues), [debouncedValues]);

  const handleChangeItemValue = (e) => {
    setItemValues({ ...itemValues, [e.target.name]: e.target.value });
  };

  // get metadata based on item type
  let { Component, icon } = getItemMetadata(item, true);

  return (
    <Paper
      className={`${classes.container} ${focused && classes.focused}`}
      elevation={2}
    >
      <EditableItemHeader
        item={itemValues}
        icon={icon}
        onFocus={onFocus}
        onChangeItemValue={handleChangeItemValue}
      />
      <Component
        item={itemValues}
        onFocus={onFocus}
        onChangeItemValue={handleChangeItemValue}
        setItemValuesDirectly={setItemValues}
      />
      <EditableItemFooter
        item={itemValues}
        onFocus={onFocus}
        setItemValuesDirectly={setItemValues}
        onClickMove={onClickMove}
        onClickDelete={onClickDelete}
      />
    </Paper>
  );
}
