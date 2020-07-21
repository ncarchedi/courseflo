import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { getItemIcon } from "./Icons";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    position: "fixed",
    top: "auto",
    right: theme.spacing(1),
    bottom: theme.spacing(1),
    left: "auto",
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const items = [
  {
    type: "LongText",
    name: "Long Text Response",
    icon: getItemIcon("LongText"),
  },
  {
    type: "ShortText",
    name: "Short Text Response",
    icon: getItemIcon("ShortText"),
  },
  {
    type: "MultiSelect",
    name: "Multiple Select",
    icon: getItemIcon("MultiSelect"),
  },
  {
    type: "SingleSelect",
    name: "Single Select",
    icon: getItemIcon("SingleSelect"),
  },
  { type: "YouTube", name: "YouTube Video", icon: getItemIcon("YouTube") },
  { type: "Video", name: "Video (Non-YouTube)", icon: getItemIcon("YouTube") },
  { type: "Image", name: "Image", icon: getItemIcon("Image") },
  { type: "Document", name: "Document", icon: getItemIcon("Document") },
  { type: "Text", name: "Text", icon: getItemIcon("Text") },
];

export default function AddItemFab({ onAddItem }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = (type) => {
    onAddItem(type);
    setOpen(false);
  };

  const handleClose = (event, reason) => {
    // close on click, blur, or esc keydown
    if (["toggle", "blur", "escapeKeyDown"].includes(reason)) setOpen(false);
  };

  const handleOpen = (event, reason) => {
    // open only on click
    if (reason === "toggle") setOpen(true);
  };

  return (
    <div className={classes.container}>
      <SpeedDial
        ariaLabel="add item"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {items.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            onClick={() => handleClick(item.type)}
            tooltipTitle={item.name}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
