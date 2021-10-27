const solution = (str) => {
  const strToCompare = str.toUpperCase();
  let cnt = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === strToCompare.charAt(i)) cnt++
  }
  return cnt;
}


let str="KoreaTimeGood";
console.log(solution(str));
