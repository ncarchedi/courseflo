import React from "react";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import sanitizeHtml from "sanitize-html";

export default function renderHtmlFromString(string) {
  // if string is empty, just return it
  if (!string) return string;

  // if string isn't a string, make it one
  if (typeof string !== "string") string = string.toString();

  // sanitize and split the string into an array
  // based on the math delimiter
  const sanitizedArray = sanitizeHtml(string).split("$$");

  // loop over elements of the sanitized array and parse each
  let htmlArray = [];
  for (var i = 0; i < sanitizedArray.length; i++) {
    // even numbered elements are html
    if (i % 2 === 0)
      htmlArray.push(
        <span key={i} dangerouslySetInnerHTML={{ __html: sanitizedArray[i] }} />
      );
    // odd numbered elements are math
    else htmlArray.push(<TeX key={i} math={sanitizedArray[i]} />);
  }

  return htmlArray;
}
