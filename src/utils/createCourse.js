export default function createCourse(userId) {
  return {
    title: "My New Course",
    userId,
    finalMessage: "Nice work! You've completed the course.",
    items: [],
  };
}
