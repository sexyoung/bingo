import { SocketEvent } from "const";
import { Matrinx } from "components";
import { useLayoutEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export function GamePage({ user }) {
  const { room } = useParams();
  const history = useHistory();
  const [ turnID, setTurnID ] = useState("");
  const [ checkedList, setCheckedList ] = useState([]);
  useLayoutEffect(() => {
    user.join(room);

    // 拒絕進入，導頁
    user.socket.on(SocketEvent.Room.Denied, () => {
      user.leave();
      history.push('/denied');
    });

    user.socket.on(
      SocketEvent.Game.UpdateChecked,
      (checkList, turnID) => {
        setCheckedList(checkList);
        setTurnID(turnID);
      }
    );

    user.fetchMatrix(room);
  }, []);

  const handleClick = index => {
    user.checked(user.matrix[index]);
    // save user checked num
    // and notice other user the number is checked
  };
  return (
    <div>
      <h2>GamePage</h2>
      <Matrinx {...{
        checkedList,
        data: user.matrix,
        onClick: handleClick,
        isActive: turnID === user.id,
      }} />
    </div>
  );
}
