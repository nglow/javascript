function solution(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      console.log(arr[i]);
    } else if (arr[i] > arr[i - 1]) console.log(arr[i]);
  }
}

let arr=[7, 3, 9, 5, 6, 12];
console.log(solution(arr));
