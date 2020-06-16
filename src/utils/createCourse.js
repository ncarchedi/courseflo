export default function createCourse(title, author) {
  return {
    title,
    author,
    finalMessage: "Nice work! You've completed the course.",
    items: [],
  };
}
