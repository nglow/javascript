/*
* Introduction
* */
function foo(a, b, c) {
  console.log(a + b + c);
}

foo(1,2, 3); // 6
foo.call(null, 1, 2, 3); // 6
foo.apply(null, [1, 2, 3]); // 6

/*
* 0. Data Set
* */
let person1 = {
  lastName: 'Jo',
  firstName: 'Lisa'
};

let person2 = {
  lastName: 'Kim',
  firstName: 'Jason',
  study: function(location, time) {
    console.log(`${this.lastName} ${this.firstName} 이/가 ${location}에서 ${time}시에 공부를 하고 있었습니다`);
  },

  study2: (location, time, self) => {
    console.log(`${self.lastName} ${self.firstName} 이/가 ${location}에서 ${time}시에 공부를 하고 있었습니다`);
  },
}

/*
* 1. Function.prototype.call()
* 기본적으로 함수를 호출하는 역할을 함
* call 함수의 첫번째 인자로 전될되는 객체와 함수의 this가 바인딩 됨
* */
person2.study('도서관', 10); // Kim Jason 이/가 도서관에서 10시에 공부를 하고 있었습니다
person2.study.call(person1, '도서관', 10); // Jo Lisa 이/가 도서관에서 10시에 공부를 하고 있었습니다
person2.study2('서산', '10', person2);
/*
* 2. Function.prototype.apply()
* call()과 동일하게 동작하지만, 첫번째 인자를 제외한 나머지가 배열 형태로 들어감(arguments object)
* */
person2.study('도서관', 10); // Kim Jason 이/가 도서관에서 10시에 공부를 하고 있었습니다
person2.study.apply(person1, ['도서관', 10]); // Jo Lisa 이/가 도서관에서 10시에 공부를 하고 있었습니다

/*
* 3. Function.prototype.bind()
* bind()가 실행되는 순간에 실행되는 것이 아니고, 또 다른 변수에 저장된 다음, 그 변수가 실행될때 실행된다.
* 아래의 2가지 케이스와 같이 변수가 자유롭게 인자로 받아들여질 수 있다.
* */
const message = person2.study.bind(person1, '카페', 12); // Jo Lisa 이/가 카페에서 12시에 공부를 하고 있었습니다
message();

const message2 = person2.study.bind(person1, '카페'); //Jo Lisa 이/가 카페에서 11시에 공부를 하고 있었습니다
message2(11);


// person2.study3('서산', '10');
