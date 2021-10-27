function fun(person) {
  person = Object.assign({}, person);
  person.name = 'lee';
  return person;
}

let o1 = {name: 'kim'}
console.log(o1)
o2 = fun(o1);
console.log(o1, o2);
