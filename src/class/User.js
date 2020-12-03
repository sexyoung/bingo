const RandChar = [
  ...[...Array(10).keys()].map(v => v + 48),
  ...[...Array(26).keys()].map(v => v + 65)
];

const getRandomChar = () =>
  String.fromCharCode(
    RandChar[~~(RandChar.length * Math.random())]
  );

export const getGUID = (len = 32) => {
  let result = '';
  for (let i = 0; i < len; i++) {
    result += getRandomChar();
    if(i % 8 === 7) result += '-';
  }
  return result.slice(0, result.length - 1);
};

export class User {
  constructor() {
    let user = localStorage.getItem('bingoUser');
    if(!user) {
      user = JSON.stringify({id: getGUID()});
      localStorage.setItem('bingoUser', user);
    }
    const attr = JSON.parse(user);
    for (const key in attr) {
      this[key] = attr[key];
    }
  }
}