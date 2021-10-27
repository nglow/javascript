const solution = (str) => {
  let answer = '';

  for (let c of str) {
    // console.log(c.charCodeAt());
    let code = c.charCodeAt(0);
    // console.log(code.fromCharCode());
    if (code >= 97 && code <= 122) answer += String.fromCharCode(code - 32);
    else answer += String.fromCharCode(code + 32)
  }

  return answer;
}

let str="ItisTimeToStudy";
console.log(solution(str));
