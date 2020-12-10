import cx from "classnames";

import style from './style.module.scss';

export function Matrix({ data, onClick, checkedList = [], isActive }) {

  const handleClick = index => {
    isActive && onClick(index);
  };

  return (
    <div className={cx(style.BingoMatrix, {
      [style.active]: isActive,
    })}>
      {data.map((v, i) =>
        <div
          key={i}
          className={cx(style.box, {
            [style.checked]: checkedList.includes(data[i])
          })}
          onClick={handleClick.bind(this, i)}
        >{v}</div>
      )}
    </div>
  );
}
