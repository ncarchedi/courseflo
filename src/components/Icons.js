import React from "react";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import NotesIcon from "@material-ui/icons/Notes";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import KeyboardIcon from "@material-ui/icons/Keyboard";

// icons for marking individual options/inputs
export function CorrectIcon() {
  return <CheckIcon style={{ color: green[800] }} />;
}

export function IncorrectIcon() {
  return <CloseIcon style={{ color: red[800] }} />;
}

// icons for marking entire items
export function CorrectItemIcon() {
  return <CheckCircleIcon style={{ color: green[800] }} />;
}

export function IncorrectItemIcon() {
  return <CancelIcon style={{ color: red[800] }} />;
}

// icons representing different item types
export function getItemIcon(itemType) {
  let icon;

  switch (itemType) {
    case "Text":
      icon = <NotesIcon color="disabled" />;
      break;
    case "Video":
      icon = <OndemandVideoIcon color="disabled" />;
      break;
    case "YouTube":
      icon = <OndemandVideoIcon color="disabled" />;
      break;
    case "Document":
      icon = <DescriptionIcon color="disabled" />;
      break;
    case "Image":
      icon = <ImageIcon color="disabled" />;
      break;
    case "SingleSelect":
      icon = <FormatListBulletedIcon color="disabled" />;
      break;
    case "MultiSelect":
      icon = <DoneAllIcon color="disabled" />;
      break;
    case "TextInput":
      icon = <KeyboardIcon color="disabled" />;
      break;
    default:
      icon = null;
  }

  return icon;
}
