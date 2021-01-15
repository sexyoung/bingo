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
  return `rgba(${r}, ${g}, ${b}, .45)`;
};

export function GamePage({ socket }) {
  const { roomID } = useParams();
  const history = useHistory();
  const [game, setGame] = useState({});
  const [user, setUser] = useState({});
  const [ turnID, setTurnID ] = useState("");
  useLayoutEffect(() => {
    const Denied = () => {
      history.push('/denied');
    };

    socket.on('connect', () => {
      console.warn('ccc');
      const UpdateChecked = (newCheckedList, newTurnID, newPlyerInfoList, newWinList = [], newWinLine) => {
        checkedList = newCheckedList;
        plyerInfoList = newPlyerInfoList;
        winList = newWinList;
        winLine = newWinLine;
        setTurnID(newTurnID);
      };

      const SelfMatrix = (matrix, newCheckedList, newTurnID, newPlyerInfoList, newWinList = [], newWinLine) => {
        // user.matrix = matrix;
        UpdateChecked(newCheckedList, newTurnID, newPlyerInfoList, newWinList, newWinLine);
      };

      // 如果使用者重整的話，並且立馬停止監聽
      const fetchMatrix = () => {
        // user.fetchMatrix(room);
        socket.off(SocketEvent.Room.PlayerUpdate, fetchMatrix);
      };

      const GoJoin = () => {
        history.push(`/${roomID}/join`);
      };

      const UserUpdate = user => setUser(user);

      const GameUpdate = game => setGame(game);

      // 拒絕進入，導頁
      socket.on(SocketEvent.Room.Denied, Denied);

      // 點擊數字
      socket.on(SocketEvent.Game.UpdateChecked, UpdateChecked);

      // 從伺服端取得自己的matrix
      socket.on(SocketEvent.Game.SelfMatrix, SelfMatrix);

      // 從伺服端取得自己的matrix
      socket.on(SocketEvent.Game.GoJoin, GoJoin);

      // 取得自己的資料
      socket.on(SocketEvent.User.InfoRes, UserUpdate);

      // 取得遊戲資料
      socket.emit(SocketEvent.Game.InfoReq, roomID);

      // if(socket.connected) {
      //   // user.fetchMatrix(roomID); // trigger RoomPlayerUpdate
      // } else {
      // join
      // 如果使用者重整的話，會需要執行這行
      const bingoUserID = localStorage.getItem('bingoUserID') || makeID();
      socket.emit( SocketEvent.Room.PlayerJoin, roomID, bingoUserID );
      socket.on(SocketEvent.Room.PlayerUpdate, fetchMatrix);
      // 取得房間的資料
      socket.on(SocketEvent.Game.InfoRes, GameUpdate);
      // }

      return () => {
        socket.off(SocketEvent.Game.GoJoin, GoJoin);
        socket.off(SocketEvent.Room.Denied, Denied);
        socket.off(SocketEvent.Game.SelfMatrix, SelfMatrix);
        socket.off(SocketEvent.Game.UpdateChecked, UpdateChecked);
        socket.off(SocketEvent.User.InfoRes, UserUpdate);
        socket.off(SocketEvent.Game.InfoRes, GameUpdate);
      };
    });
  }, []);

  const handleClick = index => {
    if (checkedList.includes(user.matrix[index])) return;
    user.checked(roomID, user.matrix[index]);
    // save user checked num
    // and notice other user the number is checked
  };

  const handleReplay = () => {
    user.replay(roomID);
  };

  if(!user?.matrix?.length) return null;
  console.warn(user);
  const turnUser = plyerInfoList.find(({ id }) => id === turnID) || {};

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
          Boolean(winList.length) ?
            <div className={style.result}>
              <div className={style.winList}>
                <div className={style.winnerIs}>Winner is</div>
                <span>{winList.join(', ')}</span>
              </div>
              <div className={style.buttons}>
                <div onClick={handleReplay}>Replay</div>
                <Link to="/">Home</Link>
              </div>
            </div>:
            <div className={style.turn}>
              <div className={style.title}>
                {turnID === user.id ?
                  <div className={style.your}>YOUR</div>:
                  <div className={style.others}>
                    {turnUser?.name}'s
                  </div>
                }
                TURN
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
