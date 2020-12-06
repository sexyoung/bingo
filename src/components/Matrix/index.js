import { useEffect } from "react";

import style from './style.module.scss';

export function Matrinx({ updateProcess, data, onClick, size }) {
  useEffect(() => {
    data.every(v => v) && updateProcess && updateProcess(
      data,
      data.filter(v => v).length / (size ** 2)
    );
  }, [data.join(',')]);

  return (
    <div className={style.BingoMatrix}>
      {data.map((v, i) =>
        <div
          key={i}
          onClick={onClick.bind(this, i)}
          className={style.box}
        >{v}</div>
      )}
    </div>
  );
}
