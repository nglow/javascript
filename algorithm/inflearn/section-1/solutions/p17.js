const solution = (arr) => {
  const answer = arr.filter((v, i) => {
    if (i === arr.indexOf(v)) return v;
  });

  return answer;
}


let str=["good", "time", "good", "time", "student"];
console.log(solution(str));
