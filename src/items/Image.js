import React from "react";
import ItemHeader from "../components/ItemHeader";

export default function Video({ item }) {
  return (
    <>
      <ItemHeader item={item} />
      <img src={item.source} alt={item.title} width="100%" />
    </>
  );
}
