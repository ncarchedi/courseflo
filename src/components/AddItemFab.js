import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { getItemIcon } from "../components/Icons";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    position: "fixed",
    top: "auto",
    right: theme.spacing(3),
    bottom: theme.spacing(3),
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
  { type: "Text", name: "Text", icon: getItemIcon("Text") },
  { type: "Video", name: "Video", icon: getItemIcon("Video") },
  { type: "Image", name: "Image", icon: getItemIcon("Image") },
  {
    type: "SingleSelect",
    name: "Single Select",
    icon: getItemIcon("SingleSelect"),
  },
  {
    type: "MultiSelect",
    name: "Multi Select",
    icon: getItemIcon("MultiSelect"),
  },
  {
    type: "TextInput",
    name: "Text Input",
    icon: getItemIcon("TextInput"),
  },
];

export default function AddItemFab({ onAddItem }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = (type) => {
    handleClose();
    onAddItem(type);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
