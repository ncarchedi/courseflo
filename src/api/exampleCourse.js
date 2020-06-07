import { v4 as uuidv4 } from "uuid";

export default {
  title: "Example Course",
  finalMessage: "Thanks for completing the course! We'll be in touch ✌️",
  content: [
    {
      id: uuidv4(),
      type: "text",
      title: "Welcome to the example course 🙌",
      body:
        "This is a short demonstration of what's possible. For example, here's a math expression: $$\\int_0^\\infty x^2 dx$$. Enjoy!",
    },
    {
      id: uuidv4(),
      type: "video",
      title: "Watch this brief video from the master of calm",
      source: "https://www.youtube-nocookie.com/embed/1s58rW0_LN4",
    },
    {
      id: uuidv4(),
      type: "singleSelect",
      prompt: "What's $$2^3$$?",
      options: [4, 6, 8, 16],
      solution: 8,
    },
    {
      id: uuidv4(),
      type: "multiSelect",
      prompt: "Which of the following animals are reptiles?",
      options: ["Crocodile", "Otter", "Snake", "Horse", "Frog"],
      solution: ["Crocodile", "Snake", "Frog"],
    },
    {
      id: uuidv4(),
      type: "image",
      title: "Maslow's hierarchy of needs",
      source:
        "https://images.squarespace-cdn.com/content/5a81dd4eb07869101a54cbfe/1526931983351-HCLE49FZQCRFFTWYG3OL/Maslow.png?content-type=image%2Fpng",
    },
    {
      id: uuidv4(),
      type: "textInput",
      prompt: "What's the native language of Mexico?",
      solution: "Spanish",
    },
  ],
};
