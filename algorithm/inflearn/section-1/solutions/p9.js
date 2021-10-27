function solution(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === 'A') {
      str = str.substring(0, i) + '#' + str.substring(i + 1, str.length);
    }
  }
  return str;
}

let str="BANANA";
console.log(solution(str));
