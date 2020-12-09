import { SocketEvent } from "const";
import { Matrix } from "components";
import { useLayoutEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export function GamePage({ user }) {
  const { room } = useParams();
  const history = useHistory();
  const [ turnID, setTurnID ] = useState("");
  const [ checkedList, setCheckedList ] = useState([]);
  useLayoutEffect(() => {
    const Denied = () => {
      user.leave();
      history.push('/denied');
    };

    const UpdateChecked = (checkList, turnID) => {
      setCheckedList(checkList);
      setTurnID(turnID);
    };

    // 如果使用者重整的話，會需要執行這行
    if(!user.room) user.join(room);

    // 拒絕進入，導頁
    user.socket.on(SocketEvent.Room.Denied, Denied);

    // 點擊數字
    user.socket.on(SocketEvent.Game.UpdateChecked, UpdateChecked);

    user.fetchMatrix(room);

    return () => {
      user.socket.off(SocketEvent.Room.Denied, Denied);
      user.socket.off(SocketEvent.Game.UpdateChecked, UpdateChecked);
    };
  }, []);

  const handleClick = index => {
    user.checked(room, user.matrix[index]);
    // save user checked num
    // and notice other user the number is checked
  };
  return (
    <div>
      <h2>GamePage</h2>
      <Matrix {...{
        checkedList,
        data: user.matrix,
        onClick: handleClick,
        isActive: turnID === user.id,
      }} />
    </div>
  );
}
