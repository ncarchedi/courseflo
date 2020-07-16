import React from "react";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SubjectIcon from "@material-ui/icons/Subject";
import ShortTextIcon from "@material-ui/icons/ShortText";

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
export function ItemIcon({ type }) {
  let icon;

  switch (type) {
    case "Text":
      icon = <MenuBookIcon color="disabled" />;
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
      icon = <RadioButtonCheckedIcon color="disabled" />;
      break;
    case "MultiSelect":
      icon = <CheckBoxIcon color="disabled" />;
      break;
    case "LongText":
      icon = <SubjectIcon color="disabled" />;
      break;
    case "ShortText":
    case "TextInput": // legacy support
      icon = <ShortTextIcon color="disabled" />;
      break;
    default:
      icon = null;
  }

  return icon;
}
