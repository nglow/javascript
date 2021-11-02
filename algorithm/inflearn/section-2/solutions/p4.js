function solution(arr) {
  let cnt = 0;
  let score = 0;

  for (let n of arr) {
    if (n === 1) {
      cnt++;
      score += cnt;
    } else cnt = 0;
  }

  return score;
}

let arr=[1, 0, 1, 1, 1, 0, 0, 1, 1, 0];
console.log(solution(arr));
