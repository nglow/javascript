let o1 = {
  name: 'kim',
  score: [1, 2],
};

Object.freeze(o1); // 객체의 프로퍼티 개수나 형태만 얼림. 얼린것을 녹일수는 없음. But, Nested Object는 더 추가해줘야함
o1.name = 'lee';
console.log(o1);
o1.score.push(3);
console.log(o1);

Object.freeze(o1.score);
// o1.score.push(4); // Cannot add property Error 발생




