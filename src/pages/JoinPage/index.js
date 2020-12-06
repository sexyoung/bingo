import qrcode from 'qrcode';
import { useParams, useHistory } from "react-router-dom";
import { useLayoutEffect, createRef, useState } from "react";

import { Matrinx, resetMatrix, randomMatrix } from "components";
import { SocketEvent } from "const";

export function JoinPage({ user }) {

  const nameDOM = createRef();
  const inputDOM = createRef();
  const history = useHistory();
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

    // 拒絕進入，導頁
    user.socket.on(SocketEvent.Room.Denied, () => {
      user.leave();
      history.push('/denied');
    });

    // 使用者更新
    user.socket.on(SocketEvent.Room.PlayerUpdate, socketList => {
      setUserList(socketList);
    });

    // 訊息更新
    user.socket.on(SocketEvent.Room.MessageUpdate, message => {
      setChatHistory(chatHistory => [
        message,
        ...chatHistory
      ]);
    });

    // 開始遊戲！
    user.socket.on(SocketEvent.Room.StartGame, () => {
      // user.save();
      // 不應該存在 client, 應該存在 server side
      history.replace(`/${room}/game`);
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

  const updateProcess = (matrix, percentage) => {
    console.warn('updateProcess');
    user.matrix = matrix;
    user.updateProcess(percentage);
  };

  const handleStartGame = () => {
    user.startGame();
  };

  return (
    <div>
      <h3>JoinPage</h3>
      <form onSubmit={handleRename}>
        <strong>name: </strong>
        <input type="text" defaultValue={user.name} ref={nameDOM} />
        <button>rename</button>
      </form>
      {userList.map((user, index) =>
        <div key={user.id}>
          {(user.percentage ?? 0) < 1 ?
            <span>{~~(user.percentage * 100)}%</span>:
            <span>Ready!!!</span>
          }
          /
          {user.name}
          {!index && <span>← start button here</span>}
        </div>
      )}
      {!userList.findIndex(u => u.id === user.id) &&
        <button
          onClick={handleStartGame}
          disabled={userList.some(({ percentage = 0 }) => percentage !== 1)}
        >start!!!!</button>
      }
      <div>=================</div>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputDOM} placeholder="聊天" />
      </form>
      <div>
        {chatHistory.map((msg, i) =>
          <div key={i}>{msg.sender}: {msg.text}</div>
        )}
      </div>
      <div>=================</div>
      {/* 賓果 */}
      <button onClick={resetMatrix}>reset</button>
      <button onClick={randomMatrix}>random</button>
      <Matrinx {...{ updateProcess }} />
      <canvas ref={canvasDOM} id="canvas" />
      <div>{`${location.origin}/#/${room}/join`}</div>
    </div>
  );
}
