import { useEffect, useState } from "react";

import style from './style.module.scss';

let num = 0;

export let resetMatrix = (setMatrix, size) => {
  setMatrix(Array(size ** 2).fill(0));
};

export let randomMatrix = (setMatrix, size) => {
  setMatrix(
    [...Array(size ** 2).keys()]
      .map(v => v + 1)
      .sort(() => .5 - Math.random())
  );
};

export function Matrinx({ size = 5, updateProcess }) {

  const [ matrix, setMatrix ] = useState(
    Array(size ** 2).fill(0)
  );

  resetMatrix = resetMatrix.bind(this, setMatrix, size);
  randomMatrix = randomMatrix.bind(this, setMatrix, size);

  useEffect(() => {
    updateProcess && updateProcess(
      matrix,
      matrix.filter(v => v).length / (size ** 2)
    );
  }, [matrix.join(',')]);

  // 這邊可以用來決定數字或圈數字
  const handleClick = index => {
    if(matrix[index]) return;
    const updateMatrix = [...matrix];
    updateMatrix[index] = ++num;
    setMatrix(updateMatrix);
  };

  return (
    <div className={style.BingoMatrix}>
      {matrix.map((v, i) =>
        <div
          key={i}
          onClick={handleClick.bind(this, i)}
          className={style.box}
        >{v}</div>
      )}
    </div>
  );
}
