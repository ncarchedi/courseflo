import React from "react";
import Typography from "@material-ui/core/Typography";
import ItemHeader from "../components/ItemHeader";

export default function Statement({ item }) {
  return (
    <>
      <ItemHeader item={item} />
      <Typography variant="body1">{item.body}</Typography>
    </>
  );
}
