import qrcode from 'qrcode';
import { useParams } from "react-router-dom";
import { useLayoutEffect, createRef, useState } from "react";

import { SocketEvent } from "const";

export function JoinPage({ user }) {

  const nameDOM = createRef();
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

    user.join(room);

    user.socket.on(SocketEvent.Room.PlayerUpdate, socketList => {
      console.warn(socketList);
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

  const handleRename = e => {
    e.preventDefault();
    user.changeName(nameDOM.current.value);
  };

  return (
    <div>
      <h3>JoinPage</h3>
      <div>{`${location.origin}/#/${room}/join`}</div>
      <strong>name: </strong>
      <form onSubmit={handleRename}>
        <input type="text" defaultValue={user.name} ref={nameDOM} />
        <button>rename</button>
      </form>
      {userList.map(user =>
        <div key={user.id}>{user.name}</div>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputDOM} />
      </form>
      <div>
        {chatHistory.map((msg, i) =>
          <div key={i}>{msg.sender}: {msg.text}</div>
        )}
      </div>
      <canvas ref={canvasDOM} id="canvas" />
    </div>
  );
}
