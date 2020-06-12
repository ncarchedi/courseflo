import React from "react";

export default function Video({ item }) {
  return <img src={item.source} alt={item.title.raw} width="100%" />;
}
