function solution(date, arr) {
  let cnt = 0;
  for (let number of arr) {
    if (date % 10 === number % 10) cnt++;
  }

  return cnt;
}


arr=[25, 23, 11, 47, 53, 17, 33];
console.log(solution(3, arr));
