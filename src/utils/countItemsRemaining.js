export default function countItemsRemaining(answers) {
  if (!answers) return null;

  const numAnswered = answers.filter((a) => a.value.length).length;
  const numTotal = answers.length;

  return numTotal - numAnswered;
}
