import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Statement({ content }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {content.header}
      </Typography>
      <Typography variant="body1">{content.body}</Typography>
    </>
  );
}
