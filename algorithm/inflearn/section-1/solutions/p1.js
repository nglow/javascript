function solution(...args) {
  let min = 101;

  for (let arg of args) {
    if (arg < min) min = arg;
  }

  return min;
}

console.log(solution(2, 5, 1));
