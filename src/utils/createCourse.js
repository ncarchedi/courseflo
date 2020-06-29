export default function createCourse(author) {
  return {
    title: "My New Course",
    author,
    finalMessage: "Nice work! You've completed the course.",
    items: [],
  };
}
