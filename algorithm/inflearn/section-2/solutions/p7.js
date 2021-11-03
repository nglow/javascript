function solution(arr) {
  let cnt = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (isPeak(arr, i, j)) {
        cnt++;
      }
    }
  }
  return cnt;
}

function isPeak(arr, i, j) {
  const length = arr.length;

  return (i !== 0 ? arr[i][j] > arr[i - 1][j] : true) &&
    (j !== 0 ? arr[i][j] > arr[i][j - 1] : true) &&
    (i !== length - 1 ? arr[i][j] > arr[i + 1][j] : true) &&
    (j !== length - 1 ? arr[i][j] > arr[i][j + 1] : true);
}

let arr=[[5, 3, 7, 2, 3],
  [3, 7, 1, 6, 1],
  [7, 2, 5, 3, 4],
  [4, 3, 6, 4, 1],
  [8, 7, 3, 5, 2]];
console.log(solution(arr));
