const RandChar = [
  ...[...Array(10).keys()].map(v => v + 48),
  ...[...Array(26).keys()].map(v => v + 65)
];

export const getRandomChar = (len = 1) => {
  let result = '';
  for (let i = 0; i < len; i++) {
    result += String.fromCharCode(
      RandChar[~~(RandChar.length * Math.random())]
    );
  }
  return result;
};