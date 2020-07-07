export default function computeScoreFromAnswers(answers) {
  const numCorrect = answers.filter((a) => a.isCorrect).length;
  const numTotal = answers.length;
  const percCorrect = Math.round((numCorrect / numTotal) * 100);

  return { numCorrect, numTotal, percCorrect };
}
