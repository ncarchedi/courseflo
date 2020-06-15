export default function createCourse(title, author) {
  return {
    title,
    author,
    finalMessage: "Congrats! You've completed the course.",
    items: [],
  };
}
