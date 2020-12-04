import qrcode from 'qrcode';
import { useParams } from "react-router-dom";
import { useLayoutEffect, createRef, useState } from "react";

import { SocketEvent } from "const";

export function JoinPage({ socket, user }) {

  const canvas = createRef();
  const { roomID } = useParams();
  const [list, setList] = useState([]);

  useLayoutEffect(() => {
    qrcode.toCanvas(canvas.current, `${location.origin}/#/${roomID}/join`, error => {
      if (error) console.error(error);
      console.log('QR success!');
    });

    socket.on("connected", data => {
      console.log('socket connected', data);
      socket.emit(SocketEvent.Room.PlayerJoin, roomID);
    });

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
      <h3>{`${location.origin}/#/${roomID}/join`}</h3>
      <canvas ref={canvas} id="canvas" />
    </div>
  );
}
