import { v4 as uuidv4 } from "uuid";

export default function createItem(type) {
  let item;

  switch (type) {
    case "Text":
      item = {
        id: uuidv4(),
        type: type,
        title: "New text item",
        body: "Body text here",
      };
      break;
    case "Video":
      item = {
        id: uuidv4(),
        type: type,
        title: "New video item",
        source: "https://www.youtube-nocookie.com/embed/1s58rW0_LN4",
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
        hint: "Hint here",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        solution: "Option 3",
      };
      break;
    case "MultiSelect":
      item = {
        id: uuidv4(),
        type: type,
        prompt: "New multiple select item",
        hint: "Hint here",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        solution: ["Option 2", "Option 4"],
      };
      break;
    case "TextInput":
      item = {
        id: uuidv4(),
        type: type,
        prompt: "New text input item",
        hint: "Hint here",
        solution: "Solution here",
      };
      break;
    default:
      item = null;
  }

  return item;
}
