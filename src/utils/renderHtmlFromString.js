import React from "react";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";

export default function renderHtmlFromString(string) {
  // if string isn't a string, make it on
  if (typeof string !== "string") string = string.toString();

  // find the math
  const index = string.search("\\$\\$");
  if (index === -1) return string;

  // split the string into an array
  const parsed = string.split("$$");

  // parse the math and leave the rest
  let htmlArray = [];
  for (var i = 0; i < parsed.length; i++) {
    // odd numbered elements are math
    if (i % 2 === 1) htmlArray.push(<TeX key={i} math={parsed[i]} />);
    else htmlArray.push(<span key={i}>{parsed[i]}</span>);
  }

  return [...htmlArray];
}
