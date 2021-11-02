function solution(arr) {
  let max = -1;
  let cnt = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      cnt++;
    }
  }

  return cnt;
}

let arr=[130, 135, 148, 140, 145, 150, 150, 153];
console.log(solution(arr));
