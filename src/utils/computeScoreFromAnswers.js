export default function computeScoreFromAnswers(answers) {
  const numCorrect = answers.filter((a) => a.isCorrect).length;
  const numTotal = answers.length;
  return { numCorrect, numTotal };
}
