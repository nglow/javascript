/*
* Arguments
* */

/*
* ...
* */
function arg(separator, ...args) {
  let result = '';

  for (let i = 0; i < args.length; i++) {
    if (i !== args.length - 1) result += `${args[i]}${separator} `
    else result += `${i}`
  }

  console.log(`args.length: ${args.length}`);
  return result
}

console.log(arg(',', 1, 2, 3, 4))

/*
* arguments
* */
function arg2(separator) {
  let result = '';

  for (let i = 1; i < arguments.length; i++) {
    if (i !== arguments.length - 1) result += `${arguments[i]}${separator} `
    else result += `${i}`
  }

  console.log(`args.length: ${arguments.length}`);
  return result;
}

console.log(arg2(',', 1, 2, 3, 4));
