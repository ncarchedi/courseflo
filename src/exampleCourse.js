import { v4 as uuidv4 } from "uuid";

export default {
  title: "Example Course",
  content: [
    {
      id: uuidv4(),
      type: "text",
      title: "Welcome to the Example Course 🙌",
      body: "This is a short demonstration of what's possible. Enjoy!",
    },
    {
      id: uuidv4(),
      type: "video",
      title: "Watch this brief video from the master of calm",
      source: "https://www.youtube.com/embed/1s58rW0_LN4",
    },
    {
      id: uuidv4(),
      type: "singleSelect",
      prompt: "What's 2 to the power of 3?",
      options: [4, 6, 8, 16],
      correct: 8,
    },
    {
      id: uuidv4(),
      type: "multiSelect",
      prompt: "Which of the following animals are reptiles?",
      options: ["Crocodile", "Otter", "Snake", "Horse", "Frog"],
      correct: ["Crocodile", "Snake", "Frog"],
    },
    {
      id: uuidv4(),
      type: "textInput",
      prompt: "What's the native language of Mexico?",
      correct: "Spanish",
    },
  ],
};
