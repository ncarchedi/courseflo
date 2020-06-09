import React from "react";
import Typography from "@material-ui/core/Typography";
import ItemTitle from "../components/ItemTitle";

export default function Statement({ item }) {
  return (
    <>
      <ItemTitle item={item} />
      <Typography variant="body1">{item.body}</Typography>
    </>
  );
}
