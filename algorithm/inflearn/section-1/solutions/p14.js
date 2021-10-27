const solution = (str) => {
  let answer = '';

  for (let s of str) {
    if (s.length > answer.length) answer = s;
  }

  return answer;
}

let str=["teacher", "time", "student", "beautiful", "good"];
console.log(solution(str));
