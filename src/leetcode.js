const numDupDigitsAtMostN = function(N) {
  let result = 0;
  if(N < 11) return result;
  for (let i = 11; i <= N; i++) {
    if([...new Set(`${i}`.split(''))].length !== `${i}`.length) {
      result++;
    }
  }
  return result;
};

console.warn(numDupDigitsAtMostN(1000));