import renderHtmlFromString from "./renderHtmlFromString";

const parseString = (string) => {
  return {
    raw: string,
    rendered: renderHtmlFromString(string),
  };
};

const parseItem = (item, index) => {
  let parsedItem = { ...item };

  if (item.title) parsedItem.title = parseString(item.title);
  if (item.body) parsedItem.body = parseString(item.body);
  if (item.prompt) parsedItem.prompt = parseString(item.prompt);
  if (item.hint) parsedItem.hint = parseString(item.hint);
  if (item.options)
    parsedItem.options = item.options.map((o) => parseString(o));

  // return parsed item with item number
  return {
    ...parsedItem,
    number: index + 1,
  };
};

export default function parseItems(items) {
  return items.map((item, index) => parseItem(item, index));
}
