const solution = (str) => {
  const length = str.length;
  if (length % 2 === 0) return str.charAt(length / 2 - 1) + str.charAt(length / 2)
  else return str.charAt(length / 2);
}

console.log(solution("study"));
console.log(solution("studyy"));
