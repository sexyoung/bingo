import qrcode from 'qrcode';
import { useParams } from "react-router-dom";
import { useLayoutEffect, createRef, useState } from "react";

import { SocketEvent } from "const";

export function JoinPage({ user }) {

  const inputDOM = createRef();
  const { room } = useParams();
  const canvasDOM = createRef();
  const [userList, setUserList] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  useLayoutEffect(() => {
    qrcode.toCanvas(canvasDOM.current, `${location.origin}/#/${room}/join`, error => {
      if (error) console.error(error);
      console.log('QR success!');
    });

    user.socket.on("connected", data => {
      console.log('socket connected', data);
      user.join(room);
    });

    user.socket.on(SocketEvent.Room.PlayerUpdate, socketList => {
      setUserList(socketList);
    });

    user.socket.on(SocketEvent.Room.MessageUpdate, message => {
      setChatHistory(chatHistory => [
        message,
        ...chatHistory
      ]);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    user.send(inputDOM.current.value);
    inputDOM.current.value = '';
  };

  return (
    <div>
      <h2>JoinPage</h2>
      {userList.map(user =>
        <div key={user}>{user}</div>
      )}
      <h3>{`${location.origin}/#/${room}/join`}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputDOM} />
      </form>
      <div>
        {chatHistory.map((message, i) =>
          <div key={i}>{message}</div>
        )}
      </div>
      <canvas ref={canvasDOM} id="canvas" />
    </div>
  );
}
