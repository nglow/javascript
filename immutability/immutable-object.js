// Mutable
let o1 = {name: 'kim'};
let o2 = o1;
console.log(o1, o2, o1 === o2);

// Immutable
let o3 = {name: 'kim'};
let o4 = Object.assign({}, o3);
console.log(o3, o4, o3 === o4);
