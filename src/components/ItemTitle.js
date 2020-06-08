import React from "react";
import Typography from "@material-ui/core/Typography";

export default function ItemTitle(props) {
  return (
    <Typography {...props} variant="h6" style={{ fontSize: "1.15rem" }}>
      {props.children}
    </Typography>
  );
}
