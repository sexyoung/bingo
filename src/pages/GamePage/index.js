import { SocketEvent } from "const";
import { Matrinx } from "components";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function GamePage({ user }) {
  const { room } = useParams();
  const [ checkedList, setCheckedList ] = useState([]);
  useLayoutEffect(() => {
    user.join(room);
    user.socket.on(
      SocketEvent.Game.UpdateChecked,
      list => {
        setCheckedList(list);
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
      }} />
    </div>
  );
}
