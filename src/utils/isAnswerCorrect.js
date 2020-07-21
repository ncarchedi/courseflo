export default function isAnswerCorrect(answer, solution) {
  // borrowed some ideas from https://stackoverflow.com/a/16436975/2338922
  let ans = answer;
  let sol = solution;

  // if the solution is null, return null
  if (solution === null) return null;

  // if the answer is null, empty, etc.
  if (!ans) return false;

  if (typeof sol === "object") {
    // if the solution is an array...
    // they must be the same length
    if (ans.length !== sol.length) return false;

    // sort before comparing element-wise
    ans = ans.sort();
    sol = sol.sort();

    // element-wise comparison
    for (var i = 0; i < sol.length; i++) {
      if (ans[i] !== sol[i]) return false;
    }
  } else {
    // if the solution is not an array...
    if (
      // ignore leading/trailing whitespace and caps
      ans.toString().trim().toLowerCase() !==
      sol.toString().trim().toLowerCase()
    )
      return false;
  }

  // if all checks are passed, the answer is correct
  return true;
}
