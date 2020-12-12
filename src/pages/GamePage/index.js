import { SocketEvent } from "const";
import { Matrix } from "components";
import { useLayoutEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

let checkedList = [];
let plyerInfoList = [];

export function GamePage({ user }) {
  const { room } = useParams();
  const history = useHistory();
  const [ turnID, setTurnID ] = useState("");
  useLayoutEffect(() => {
    const Denied = () => {
      user.leave();
      history.push('/denied');
    };

    const UpdateChecked = (newCheckedList, newTurnID, newPlyerInfoList) => {
      checkedList = newCheckedList;
      plyerInfoList = newPlyerInfoList;
      setTurnID(newTurnID);
    };

    const SelfMatrix = (matrix, newCheckedList, newTurnID, newPlyerInfoList) => {
      user.matrix = matrix;
      UpdateChecked(newCheckedList, newTurnID, newPlyerInfoList);
    };

    // 拒絕進入，導頁
    user.socket.on(SocketEvent.Room.Denied, Denied);

    // 點擊數字
    user.socket.on(SocketEvent.Game.UpdateChecked, UpdateChecked);

    // 從伺服端取得自己的matrix
    user.socket.on(SocketEvent.Game.SelfMatrix, SelfMatrix);

    if(user.socket.connected) {
      user.fetchMatrix(room); // trigger RoomPlayerUpdate
    } else {
      // join
      // 如果使用者重整的話，會需要執行這行
      if(!user.room) user.join(room);

      user.socket.on(SocketEvent.Room.PlayerUpdate, () => {
        user.fetchMatrix(room); // trigger RoomPlayerUpdate
      });
    }

    return () => {
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
  if(!user.matrix?.length) return null;
  return (
    <div>
      <h2>GamePage</h2>
      <Matrix {...{
        checkedList,
        data: user.matrix,
        onClick: handleClick,
        isActive: turnID === user.id,
      }} />
      {plyerInfoList.map((playerInfo, index) =>
        <div key={index}>
          {playerInfo.name}: {playerInfo.winCount}
        </div>
      )}
    </div>
  );
}
