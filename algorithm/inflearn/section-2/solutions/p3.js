function solution(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (b[i] - a[i] === 1) console.log("B");
    else if (b[i] - a[i] === 2) console.log("A");
    else if (b[i] - a[i] === -1) console.log("A")
    else if (b[i] - a[i] === -2) console.log("B")
    else console.log("D")
  }
}

let a=[2, 3, 3, 1, 3];
let b=[1, 1, 2, 2, 3];
console.log(solution(a, b));
