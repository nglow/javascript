function a() {
  console.log('A');
}

const b = function () { // Anonymous Function
  console.log('B')
}

function slowFunc(callback) {
  callback();
}

a();
b();
slowFunc(a);
slowFunc(b);
