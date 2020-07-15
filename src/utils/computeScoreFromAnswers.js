export default function computeScoreFromAnswers(userItems) {
  // number of items correct
  const numCorrect = userItems.filter((a) => a.isCorrect).length;
  // number of answerable items
  const numTotal = userItems.filter((a) => a.solution).length;
  // percent correct (0-100)
  const percCorrect = Math.round((numCorrect / numTotal) * 100);

  return { numCorrect, numTotal, percCorrect };
}
