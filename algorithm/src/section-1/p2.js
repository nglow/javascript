function solution(...args){
  let answer = true;

  let sum = 0;
  let max = 0;
  for (let arg of args) {
    sum += arg;
    if (arg > max) max = arg;
  }

  return max < sum - max;
}

console.log(solution(13, 33, 17));
console.log(solution(6, 7, 11));
