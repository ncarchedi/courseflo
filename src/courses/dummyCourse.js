export default {
  id: "dummyCourse",
  title: "Dummy Course",
  finalMessage: "Thanks for completing the course! We'll be in touch ✌️",
  content: [
    {
      id: "welcome",
      type: "text",
      title: "Welcome to the example course 🙌",
      body:
        "This is a short demonstration of what's possible. For example, here's a math expression: $$\\int_0^\\infty x^2 dx$$. Enjoy!",
    },
    {
      id: "bobRoss",
      type: "video",
      title: "Watch this brief video from the master of calm",
      source: "https://www.youtube-nocookie.com/embed/1s58rW0_LN4",
    },
    {
      id: "someMath",
      type: "singleSelect",
      prompt: "What's $$2^3$$?",
      options: [4, 6, 8, 16],
      solution: 8,
    },
    {
      id: "reptiles",
      type: "multiSelect",
      prompt: "Which of the following animals are reptiles?",
      options: ["Crocodile", "Otter", "Snake", "Horse", "Frog"],
      solution: ["Crocodile", "Snake", "Frog"],
    },
    {
      id: "maslow",
      type: "image",
      title: "Maslow's hierarchy of needs",
      source:
        "https://images.squarespace-cdn.com/content/5a81dd4eb07869101a54cbfe/1526931983351-HCLE49FZQCRFFTWYG3OL/Maslow.png?content-type=image%2Fpng",
    },
    {
      id: "mexico",
      type: "textInput",
      prompt: "What's the native language of Mexico?",
      solution: "Spanish",
    },
  ],
};