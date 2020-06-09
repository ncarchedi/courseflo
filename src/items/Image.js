import React from "react";
import ItemTitle from "../components/ItemTitle";

export default function Video({ item }) {
  return (
    <>
      <ItemTitle item={item} />
      <img src={item.source} alt={item.title} width="100%" />
    </>
  );
}
