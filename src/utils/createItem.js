import { v4 as uuidv4 } from "uuid";

export default function createItem(type) {
  let item;

  switch (type) {
    case "Email":
      item = {
        id: uuidv4(),
        type: type,
      };
      break;
    case "Text":
      item = {
        id: uuidv4(),
        type: type,
        title: "New text item",
        body: "",
      };
      break;
    case "Video":
      item = {
        id: uuidv4(),
        type: type,
        title: "New video item",
        source: "https://player.vimeo.com/video/435845870",
      };
      break;
    case "YouTube":
      item = {
        id: uuidv4(),
        type: type,
        title: "New YouTube video item",
        videoId: "1s58rW0_LN4",
      };
      break;
    case "Document":
      item = {
        id: uuidv4(),
        type: type,
        title: "New document item",
        source:
          "https://docs.google.com/document/d/e/2PACX-1vRzLHBsIM5UzqweutGV7QGse9uPm3vix7Rx5NwJgdR0qCExi7uEop9bFoK6_5PF8dmz0XywzZ59DifC/pub?embedded=true",
      };
      break;
    case "Image":
      item = {
        id: uuidv4(),
        type: type,
        title: "New image item",
        source:
          "https://images.squarespace-cdn.com/content/5a81dd4eb07869101a54cbfe/1526931983351-HCLE49FZQCRFFTWYG3OL/Maslow.png",
      };
      break;
    case "SingleSelect":
      item = {
        id: uuidv4(),
        type: type,
        prompt: "New single select item",
        hint: "",
        options: [""],
        solution: "",
      };
      break;
    case "MultiSelect":
      item = {
        id: uuidv4(),
        type: type,
        prompt: "New multiple select item",
        hint: "",
        options: [""],
        solution: [],
      };
      break;
    case "TextInput":
      item = {
        id: uuidv4(),
        type: type,
        prompt: "New text input item",
        hint: "",
        solution: "",
      };
      break;
    default:
      item = null;
  }

  return item;
}
