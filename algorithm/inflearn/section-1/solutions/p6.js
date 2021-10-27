function solution(arr) {
  let min = Number.MAX_SAFE_INTEGER;
  const answer = [0];
  for (let number of arr) {
    if (number % 2 === 0) continue;
    answer[0] += number;
    if (min > number) min = number;
  }

  answer.push(min);
  return answer;
}


arr = [12, 77, 38, 41, 53, 92, 85];
console.log(solution(arr));
