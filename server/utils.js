// TODO: don't need
/**
 *
 * @param size => `,n,n,n,|,n,n,n,|...`
 */
export const genWinStr = size => {
  const result = [];
  const serial = [...Array(size).keys()];
  const serialPow = [...Array(size ** 2).keys()];

  /** 直線 與 橫線 */
  for (let i = 0; i < size; i++) {
    result.push(serial.map(v => v * size + i));
    result.push(serialPow.slice(i * size, (i + 1) * size));
  }

  /** 交叉線 */
  result.push(serial.map(v => v * (size + 1)));
  result.push(serial.map(v => (v + 1) * (size - 1)));
  return result.map(line => `,${line.join(',')},`).join('|');
};