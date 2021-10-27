function solution(str, char) {
  let cnt = 0;
  for (let c of str) {
    if (c === char) cnt++;
  }

  return cnt;
}
let str="COMPUTERPROGRAMMING";
console.log(solution(str, 'R'));
