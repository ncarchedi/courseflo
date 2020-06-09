import renderHtmlFromString from "./renderHtmlFromString";

const parseItem = (item) => {
  if (item.title) item.title = renderHtmlFromString(item.title);
  if (item.body) item.body = renderHtmlFromString(item.body);
  if (item.prompt) item.prompt = renderHtmlFromString(item.prompt);
  if (item.hint) item.hint = renderHtmlFromString(item.hint);
  if (item.options)
    item.options = item.options.map((o) => ({
      raw: o,
      rendered: renderHtmlFromString(o),
    }));

  return item;
};

export default function parseContent(content) {
  return content.map((item) => parseItem(item));
}
