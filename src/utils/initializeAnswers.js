export default function initializeAnswers(course, setAnswers) {
  if (!course) return null;

  let a = [];
  course.items.forEach((item) => {
    // for each item type that requires a response
    if (
      !["Email", "Text", "Video", "YouTube", "Document", "Image"].includes(
        item.type
      )
    ) {
      a.push({
        itemId: item.id,
        value: item.type === "MultiSelect" ? [] : "",
        solution: item.solution,
        isCorrect: false,
      });
    }
  });
  setAnswers(a);
}
