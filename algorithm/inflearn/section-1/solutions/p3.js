function solution(n){
  const das = 12;
  const quotient = n / das;

  return Math.ceil(quotient);
}

console.log(solution(10));
console.log(solution(12));
console.log(solution(14));
console.log(solution(178));
