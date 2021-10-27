/*
* 1. forEach
* 수정된 배열을 return 하지 않음 (undefined). 하려면 아래와 같이 람다식 안에서 할당을 받아야한다.
* 기존 배열을 가공하여 평균, 합산 등을 구할 때 사용
* */
let data = [10, 15, 20, 25, 30];
let result = [];

data.forEach(x => result.push(x - 5));
console.log(data); // [ 10, 15, 20, 25, 30 ]
console.log(result); // [ 5, 10, 15, 20, 25 ]


data.forEach(((value, index, array) => {
  console.log(`value: ${value}, index: ${index}`);
}))
// value: 10, index: 0
// value: 15, index: 1
// value: 20, index: 2
// value: 25, index: 3
// value: 30, index: 4

/*
* 2. map
* 수정된 배열을 return함
* 새롭게 가공후 수정된 배열을 리턴 받을 때 사용
* */
let data2 = [10, 15, 20, 25, 30];

let result2 = data2.map(x => x - 5);
console.log(data2); // [ 10, 15, 20, 25, 30 ]
console.log(result2); // [ 5, 10, 15, 20, 25 ]

result2[0] -= 5;

console.log(data2); // [ 10, 15, 20, 25, 30 ]
console.log(result2); // [ 0, 10, 15, 20, 25 ]

/*
* 3. filter
* 콜백함수에 지정된 조건에 맞는 요소를 새롭게 반환
* 콜백함수의 인자는 순서대로 value, index, array
* */
let data3 = [
  {name: 'Jack', age: 20},
  {name: 'Kevin', age: 16},
  {name: 'rick', age: 27},
  {name: 'marry', age: 21},
  {name: 'rilly', age: 19},
]

let result3 = data3.filter(x => x.age >= 20);
console.log(result3);
// [
//   { name: 'Jack', age: 20 },
//   { name: 'rick', age: 27 },
//   { name: 'marry', age: 21 }
// ]
console.log(`result3: ${result3}`); // result3: [object Object],[object Object],[object Object]
console.log(`length: ${result3.length}`); // length: 3

/*
* 4. every, some
* 특정 조건을 만족하는지 배열의 내부 원소를 순회하면서 검사
* 조건에 만족하면 True, 반대는 False 리턴
* 프로젝트 진행 중 배열 원소값에 대해서 검토가 필요한 경우 빈번하게 사용
* every -> 성능을 위해 만족하지 않는 값이 발견되면 즉시 중단
* some -> 성능을 위해 만족하는 값이 발견되면 즉시 중단
* */
let data4 = [
  {name: 'Jack', age: 20},
  {name: 'Kevin', age: 16},
  {name: 'rick', age: 27},
  {name: 'marry', age: 21},
  {name: 'rilly', age: 19},
]

let result4 = data4.every(x => x.age >= 20);
console.log(result4); // false

result4 = data4.some(x => x.age >= 20);
console.log(result4); // true

/*
* 5. reduce
* Array객체의 Prototype에 정의되어 있는 고차함수
* 배열의 값을 한개로 감소시킴
* map, filter, find함수로 구현할 수 있는 기능은 모두 reduce함수로 구현 가능
* 두 번째 매개변수인 initialValue를 통해서 반환 값을 자유롭게 지정하여 유연하게 사용가능
* */
/*
* 5.1 Without initial value
* */
let arr = [12, 4, 19, 33, 86];
let sum = arr.reduce(((previousValue, currentValue, currentIndex, array) =>
  previousValue + currentValue));
console.log(sum); // 154
/*
* 5.2 With initial value
* */
let sum2 = arr.reduce(((previousValue, currentValue, currentIndex, array) =>
  previousValue + currentValue), 0);
console.log(sum2); // 154
