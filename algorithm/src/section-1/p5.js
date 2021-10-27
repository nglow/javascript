function solution(arr) {
  const length = arr.length;

  let min = arr[0];
  for (let i = 1; i < length; i++) {
    if (min > arr[i]) min = arr[i];
  }
  return min;
}

function solutionInstructor(arr) {
  let answer, min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
  }

  answer = min;
  return answer;
}

function solutionInstructor2(arr) {
  // return Math.min(...arr);
  return Math.min.apply(null, arr)
}

function solutionInstructor3(arr) {
  // return Math.max(...arr);
  return Math.max.apply(null, arr)
}




let arr=[5, 7, 1, 3, 2, 9, 11];
console.log(solution(arr));
console.log(solutionInstructor(arr));
console.log(solutionInstructor2(arr));
console.log(solutionInstructor3(arr));
