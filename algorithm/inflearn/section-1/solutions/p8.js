function solution(arr) {
  let answer = '';
  const sum = arr.reduce((a, b) => {
    // console.log(a);
    // console.log(b);
    return a + b

  });

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (sum - arr[i] - arr[j] === 100) {
        for (let k in arr) {
          if (k === i || k === j) continue;
          answer += arr[k] + ' ';
        }
        return answer;
      }
    }
  }

  return answer;
}

let arr=[20, 7, 23, 19, 10, 15, 25, 8, 13];
console.log(solution(arr));
