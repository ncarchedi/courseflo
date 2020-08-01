import React from "react";
import unified from "unified";
import markdown from "remark-parse";
import externalLinks from "remark-external-links";
import math from "remark-math";
import remark2rehype from "remark-rehype";
import katex from "rehype-katex";
import rehype2react from "rehype-react";
import "katex/dist/katex.min.css";

export default function renderHtmlFromString(string) {
  // if string is empty, just return it
  if (!string) return string;

  // if string isn't a string, make it one
  if (typeof string !== "string") string = string.toString();

  // render the markdown with katex
  return unified()
    .use(markdown)
    .use(externalLinks, { target: "_blank" })
    .use(math)
    .use(remark2rehype)
    .use(katex)
    .use(rehype2react, {
      createElement: React.createElement,
      Fragment: React.Fragment,
    })
    .processSync(string).result;
}
