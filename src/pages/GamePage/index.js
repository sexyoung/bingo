import { SocketEvent } from "const";
import { Matrix } from "components";
import { useLayoutEffect, useState } from "react";
import {
  Link,
  useParams,
  useHistory,
} from "react-router-dom";

let checkedList = [];
let plyerInfoList = [];
let winList = [];

export function GamePage({ user }) {
  const { room } = useParams();
  const history = useHistory();
  const [ turnID, setTurnID ] = useState("");
  useLayoutEffect(() => {
    const Denied = () => {
      user.leave();
      history.push('/denied');
    };

    const UpdateChecked = (newCheckedList, newTurnID, newPlyerInfoList, newWinList = []) => {
      checkedList = newCheckedList;
      plyerInfoList = newPlyerInfoList;
      winList = newWinList;
      setTurnID(newTurnID);
    };

    const SelfMatrix = (matrix, newCheckedList, newTurnID, newPlyerInfoList, newWinList = []) => {
      user.matrix = matrix;
      UpdateChecked(newCheckedList, newTurnID, newPlyerInfoList, newWinList);
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

  if(!user.matrix?.length) return null;
  return (
    <div>
      <h2>GamePage</h2>
      {Boolean(winList.length) &&
        <div>
          <h2>Result</h2>
          {winList.map((name, index) =>
            <div key={index}>{name} WIN!</div>
          )}
          <div onClick={handleReplay}>Play again</div>
          <Link to="/">Home</Link>
        </div>
      }
      <Matrix {...{
        checkedList,
        data: user.matrix,
        onClick: handleClick,
        isActive: turnID === user.id && !winList.length,
      }} />
      {plyerInfoList.map((playerInfo, index) =>
        <div key={index}>
          {playerInfo.name}: {playerInfo.winCount}
        </div>
      )}
    </div>
  );
}
