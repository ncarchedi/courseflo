import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function ProgressBar({ value }) {
  return (
    <LinearProgress variant="determinate" color="secondary" value={value} />
  );
}
