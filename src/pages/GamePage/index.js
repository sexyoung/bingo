import { SocketEvent } from "const";
import { Matrix } from "components";
import { useLayoutEffect, useState } from "react";
import {
  Link,
  useParams,
  useHistory,
} from "react-router-dom";

import style from './style.module.scss';

let winLine = 0;
let winList = [];
let checkedList = [];
let plyerInfoList = [];

const nameColor = name => {
  const num = +name.split('').map(s => s.charCodeAt()).join('');
  const r = (~~(num / 23)) % 256;
  const g = (~~(num / 24)) % 256;
  const b = (~~(num / 25)) % 256;
  return `rgba(${r}, ${g}, ${b}, .25)`;
};

export function GamePage({ user }) {
  const { room } = useParams();
  const history = useHistory();
  const [ turnID, setTurnID ] = useState("");
  useLayoutEffect(() => {
    const Denied = () => {
      user.leave();
      history.push('/denied');
    };

    const UpdateChecked = (newCheckedList, newTurnID, newPlyerInfoList, newWinList = [], newWinLine) => {
      checkedList = newCheckedList;
      plyerInfoList = newPlyerInfoList;
      winList = newWinList;
      winLine = newWinLine;
      setTurnID(newTurnID);
    };

    const SelfMatrix = (matrix, newCheckedList, newTurnID, newPlyerInfoList, newWinList = [], newWinLine) => {
      user.matrix = matrix;
      UpdateChecked(newCheckedList, newTurnID, newPlyerInfoList, newWinList, newWinLine);
    };

    // 如果使用者重整的話，並且立馬停止監聽
    const fetchMatrix = () => {
      user.fetchMatrix(room);
      user.socket.off(SocketEvent.Room.PlayerUpdate, fetchMatrix);
    };

    const GoJoin = () => {
      history.replace(`/${room}/join`);
    };

    // 拒絕進入，導頁
    user.socket.on(SocketEvent.Room.Denied, Denied);

    // 點擊數字
    user.socket.on(SocketEvent.Game.UpdateChecked, UpdateChecked);

    // 從伺服端取得自己的matrix
    user.socket.on(SocketEvent.Game.SelfMatrix, SelfMatrix);

    // 從伺服端取得自己的matrix
    user.socket.on(SocketEvent.Game.GoJoin, GoJoin);

    if(user.socket.connected) {
      user.fetchMatrix(room); // trigger RoomPlayerUpdate
    } else {
      // join
      // 如果使用者重整的話，會需要執行這行
      user.join(room);
      user.socket.on(SocketEvent.Room.PlayerUpdate, fetchMatrix);
    }

    return () => {
      user.socket.off(SocketEvent.Game.GoJoin, GoJoin);
      user.socket.off(SocketEvent.Room.Denied, Denied);
      user.socket.off(SocketEvent.Game.SelfMatrix, SelfMatrix);
      user.socket.off(SocketEvent.Game.UpdateChecked, UpdateChecked);
    };
  }, []);

  const handleClick = index => {
    if (checkedList.includes(user.matrix[index])) return;
    user.checked(room, user.matrix[index]);
    // save user checked num
    // and notice other user the number is checked
  };

  const handleReplay = () => {
    user.replay(room);
  };

  // winLine = 5;
  // plyerInfoList = [
  //   {name: '謝', winCount: ~~(Math.random() * 6)},
  //   {name: 'def', winCount: ~~(Math.random() * 6)},
  // ];
  // winList = ['sexyoung', 'kelly']; // test
  // console.warn(Boolean(winList.length)); // test
  // user.matrix = [...Array(25).keys()]; // test

  if(!user.matrix?.length) return null;
  return (
    <div className={style.GamePage}>
      <div className={style.winMap}>
        <div className={style.start}>0</div>
        <div className={style.way}>
          {plyerInfoList.map((playerInfo, index) =>
            <div
              key={index}
              className={style.player}
              style={{
                zIndex: index,
                left: `${100 * (playerInfo.winCount / winLine)}%`,
              }}
            >
              <div
                className={style.nameColor}
                style={{
                  backgroundColor: nameColor(playerInfo.name),
                }}
              />
              {playerInfo.name.slice(0, 1)}
            </div>
          )}
        </div>
        <div className={style.end}>{winLine}</div>
      </div>
      <div className={style.gap}>
        {
          Boolean(winList.length) &&
          <div className={style.result}>
            <div className={style.winList}>
              <div className={style.winnerIs}>Winner is</div>
              <span>{winList.join(', ')}</span>
            </div>
            <div className={style.buttons}>
              <div onClick={handleReplay}>Replay</div>
              <Link to="/">Home</Link>
            </div>
          </div>
        }
      </div>
      <Matrix {...{
        checkedList,
        data: user.matrix,
        onClick: handleClick,
        className: style.Matrix,
        isActive: turnID === user.id && !winList.length,
      }} />
    </div>
  );
}
