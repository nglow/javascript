const members = ['nglow', 's8615', 'nam'];
console.log(members[1]);
let i = 0;
while (i < members.length) {
  console.log(`members[${i}]: ${members[i]}`);
  i++;
}

console.log('================')

const roles = {
  programmer: 'nglow',
  designer: 's8615',
  manager: 'nam',
}
console.log(roles.programmer)
for (let name in roles) {
  console.log(`roles[${name}]: ${roles[name]}`);
}

