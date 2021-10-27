const solution = (str) => {
  let answer = '';

  for (let c of str) {
    if (isIn(c, answer)) continue;
    answer += c;
  }

  return answer;
}

const isIn = (char, str) => {
  for (let c of str) {
    if (char === c) return true;
  }
  return false;
}

console.log(solution("ksekkset"));
