import React from "react";
import Typography from "@material-ui/core/Typography";
import renderHtmlFromString from "../utils/renderHtmlFromString";
import { ItemIcon } from "../components/Icons";
import ItemHeader from "../components/ItemHeader";

export default function Text({ item }) {
  return (
    <>
      <ItemHeader title={item.title} icon={<ItemIcon type={item.type} />} />
      <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
        {renderHtmlFromString(item.body)}
      </Typography>
    </>
  );
}
