import cx from "classnames";
import { useState, useEffect } from 'react';

import style from './style.module.scss';

export function Matrix({
  data,
  onClick,
  isActive,
  className = '',
  checkedList = [],
}) {

  const [index, setIndex] = useState(-1);

  const handleClick = index => {
    if(isActive) {
      onClick(index);
      setIndex(index);
    }
  };

  useEffect(() => {
    setIndex(-1);
  }, [checkedList]);

  // console.warn('matrix render', JSON.stringify({
  //   data,
  //   onClick,
  //   isActive,
  //   className,
  //   checkedList,
  // }));

  return (
    <div className={cx(style.BingoMatrix, {
      [style.active]: isActive,
      [className]: Boolean(className),
    })}>
      {data.map((v, i) =>
        <div
          key={i}
          className={cx(style.box, {
            [style.ing]: index === i,
            [style.checked]: checkedList.includes(data[i])
          })}
          onClick={handleClick.bind(this, i)}
        >{v}</div>
      )}
    </div>
  );
}
