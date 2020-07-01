export default function createCourse(authorEmail) {
  return {
    title: "My New Course",
    authorEmail,
    finalMessage: "Nice work! You've completed the course.",
    items: [],
  };
}
