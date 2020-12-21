import cx from "classnames";

import style from './style.module.scss';

export function Matrix({
  data,
  onClick,
  isActive,
  className = '',
  checkedList = [],
}) {

  const handleClick = index => {
    isActive && onClick(index);
  };

  return (
    <div className={cx(style.BingoMatrix, {
      [style.active]: isActive,
      [className]: Boolean(className),
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
