const o1 = {
  name: 'kim'
};

Object.freeze(o1);
const o2 = {
  name: 'kim'
}

o1.name = 'park';
console.log(o1);
