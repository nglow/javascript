function solution(n){
  return (n * (n + 1)) / 2;
}

function solution2(n) {
  let sum = 0;
  for (let i = 1; i <= n; i ++) {
    sum += i;
  }

  return sum;
}

console.log(solution(10));
console.log(solution2(10));
