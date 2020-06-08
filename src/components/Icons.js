import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

export function CorrectIcon() {
  return <CheckIcon style={{ color: green[600] }} />;
}

export function IncorrectIcon() {
  return <CloseIcon style={{ color: red[600] }} />;
}
