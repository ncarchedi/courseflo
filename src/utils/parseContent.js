import renderHtmlFromString from "./renderHtmlFromString";

const parseString = (string) => {
  return {
    raw: string,
    rendered: renderHtmlFromString(string),
  };
};

const parseItem = (item) => {
  if (item.title) item.title = parseString(item.title);
  if (item.body) item.body = parseString(item.body);
  if (item.prompt) item.prompt = parseString(item.prompt);
  if (item.hint) item.hint = parseString(item.hint);
  if (item.options) item.options = item.options.map((o) => parseString(o));

  return item;
};

export default function parseContent(items) {
  return items.map((item) => parseItem(item));
}
