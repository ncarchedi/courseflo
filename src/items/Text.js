import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Statement({ item }) {
  return <Typography variant="body1">{item.body.rendered}</Typography>;
}
