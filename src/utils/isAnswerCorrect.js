export default function isAnswerCorrect(answer, solution) {
  // borrowed some ideas from https://stackoverflow.com/a/16436975/2338922
  let ans = answer;
  let sol = solution;

  // if the answer is null, empty, etc.
  if (!ans) return false;

  // if the solution is an array...
  if (typeof sol === "object") {
    // they must be the same length
    if (ans.length !== sol.length) return false;

    // sort before comparing element-wise
    ans = ans.sort();
    sol = sol.sort();

    // element-wise comparison
    for (var i = 0; i < sol.length; i++) {
      if (ans[i] !== sol[i]) return false;
    }
    // if the solution is not an array...
  } else {
    if (ans.toString().toLowerCase() !== sol.toString().toLowerCase())
      return false;
  }

  // if all checks are passed, the the answer is correct
  return true;
}
