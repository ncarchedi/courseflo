import React from "react";
import Typography from "@material-ui/core/Typography";
import renderHtmlFromString from "../utils/renderHtmlFromString";

export default function Statement({ item }) {
  return (
    <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
      {renderHtmlFromString(item.body)}
    </Typography>
  );
}
