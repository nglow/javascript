function solution(arr) {
  let sumRow = 0;
  let sumColumn = 0;
  let sumDiagonal = 0;
  let sumReverseDiagonal = 0;

  let max = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      sumRow += arr[i][j];
      sumColumn += arr[j][i];
      if (i === j) sumDiagonal += arr[i][j];
      if (i + j === arr.length - 1) sumReverseDiagonal += arr[i][j];
    }
    if (max < sumRow) max = sumRow;
    else if (max < sumColumn) max = sumColumn;
    sumRow = 0;
    sumColumn = 0;
  }

  if (max < sumReverseDiagonal) max = sumReverseDiagonal;
  if (max < sumDiagonal) max = sumDiagonal;

  return max;
}

let arr=[[10, 13, 10, 12, 15],
  [12, 39, 30, 23, 11],
  [11, 25, 50, 53, 15],
  [19, 27, 29, 37, 27],
  [19, 13, 30, 13, 19]];
console.log(solution(arr));
