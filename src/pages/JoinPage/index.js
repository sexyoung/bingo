import { useLayoutEffect, useState } from "react";

import { SocketEvent } from "const";

export function JoinPage({ user, socket }) {

  const [list, setList] = useState([]);

  useLayoutEffect(() => {
    socket.emit(SocketEvent.Room.PlayerJoin, 'abc', user.id);
    socket.on(SocketEvent.Room.PlayerUpdate, socketList => {
      setList(socketList);
    });
  }, []);

  return (
    <div>
      <h2>JoinPage</h2>
      {list.map(user =>
        <div key={user}>{user}</div>
      )}
    </div>
  );
}
