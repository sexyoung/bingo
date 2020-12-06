import { SocketEvent } from "const";
import { Matrinx } from "components";
import { useLayoutEffect } from "react";

export function GamePage({ user }) {

  useLayoutEffect(() => {
    user.socket.on(
      SocketEvent.Game.UpdateChecked,
      checkList => {
        console.warn(checkList);
      }
    );
  }, []);

  const handleClick = index => {
    console.warn(user.matrix[index]);
    user.checked(user.matrix[index]);
    // save user checked num
    // and notice other user the number is checked
  };
  return (
    <div>
      <h2>GamePage</h2>
      <Matrinx {...{
        data: user.matrix,
        onClick: handleClick
      }} />
    </div>
  );
}
