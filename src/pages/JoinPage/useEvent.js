import qrcode from 'qrcode';
import cx from "classnames";
import { useParams, useHistory } from "react-router-dom";
import { useLayoutEffect, createRef, useState, useEffect } from "react";

import { SocketEvent } from "const";

import style from "./style.module.scss";

let num = 0;

/** 這邊看起來還是有點亂，想一下怎麼改 */
export const useEvent = (user) => {
  const nameDOM = createRef();
  const inputDOM = createRef();
  const canvasDOM = createRef();
  const chatHistoryDOM = createRef([
    {sender: 'sexyoung', text: '我說那個誰是不是有點慢啊'}
  ]);
  const history = useHistory();
  const { room } = useParams();
  const [size, setSize] = useState(5);
  const [show, setShow] = useState("");
  const [userList, setUserList] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [ matrix, setMatrix ] = useState(
    Array(size ** 2).fill(0)
  );

  const updateProcess = matrix => {
    console.warn('updateProcess');
    user.matrix = matrix;
    user.updateProcess(room, matrix.filter(v => v).length / (size ** 2));
  };

  const matrixProcess = updateMatrix => {
    num = updateMatrix.filter(v => v).length;
    setMatrix(updateMatrix);
    updateProcess(updateMatrix);
  };

  const randomMatrix = () => {
    const updateMatrix = [...Array(size ** 2).keys()]
      .map(v => v + 1)
      .sort(() => .5 - Math.random());
    /** 這邊是不是有更好的寫法? */
    matrixProcess(updateMatrix);
  };

  useLayoutEffect(() => {

    user.join(room);

    qrcode.toCanvas(canvasDOM.current, `${location.origin}/#/${room}/join`, error => {
      if (error) console.error(error);
      console.log('QR success!');
    });

    const PlayerUpdate = socketList => setUserList(socketList.filter(v => v));
    const MessageUpdate = message => setChatHistory(chatHistory => [ ...chatHistory, message ]);
    const Denied = () => {
      // user.leave();
      // history.push('/denied');
    };
    const StartGame = () => {
      user.save();
      user.saveMatrix2Server(room, user.matrix);
      history.replace(`/${room}/game`);
    };

    // 拒絕進入，導頁
    user.socket.on(SocketEvent.Room.Denied, Denied);

    // 使用者更新
    user.socket.on(SocketEvent.Room.PlayerUpdate, PlayerUpdate);

    // 訊息更新
    user.socket.on(SocketEvent.Room.MessageUpdate, MessageUpdate);

    // 開始遊戲！
    user.socket.on(SocketEvent.Room.StartGame, StartGame);

    randomMatrix();

    return () => {
      user.socket.off(SocketEvent.Room.Denied, Denied);
      user.socket.off(SocketEvent.Room.StartGame, StartGame);
      user.socket.off(SocketEvent.Room.PlayerUpdate, PlayerUpdate);
      user.socket.off(SocketEvent.Room.MessageUpdate, MessageUpdate);
    };
  }, []);

  useEffect(() => {
    console.warn('do it');
    chatHistoryDOM.current.scrollTop = chatHistoryDOM.current.scrollHeight;
  }, [chatHistory.length]);

  const handleSubmit = e => {
    e.preventDefault();
    user.send(room, inputDOM.current.value);
    inputDOM.current.value = '';
    setShow('');
  };

  const toggleShow = block => {
    setShow(
      show === block ? "": block
    );
  };

  const handleRename = e => {
    e.preventDefault();
    user.changeName(room, nameDOM.current.value);
  };

  const handleStartGame = () => {
    console.warn('satt');
    user.startGame(room, size, size);
  };

  const resetMatrix = () => {
    const updateMatrix = Array(size ** 2).fill(0);
    /** 這邊是不是有更好的寫法? */
    matrixProcess(updateMatrix);
  };

  const handlePutNum = index => {
    if(matrix[index]) return;
    const updateMatrix = [...matrix];
    updateMatrix[index] = num + 1;
    /** 這邊是不是有更好的寫法? */
    matrixProcess(updateMatrix);
  };

  return {
    show,
    size,
    matrix,
    userList,
    chatHistory,

    handleSubmit,
    handleRename,
    updateProcess,
    handleStartGame,
    matrixProcess,
    resetMatrix,
    randomMatrix,
    handlePutNum,
    toggleShow,

    CanvasDOM: <canvas ref={canvasDOM} id="canvas" />,
    NameDOM: <input type="text" defaultValue={user.name} ref={nameDOM} />,
    InputDOM: <input type="text" ref={inputDOM} placeholder="輸入訊息" />,
    ChatHistoryDOM: (
      <div className={style.chatHistory} ref={chatHistoryDOM}>
        {chatHistory.map((msg, i) =>
          <div
            key={i}
            className={cx(style.msgBox, {
              [style.isMe]: user.id === msg.user.id,
              [style.same]: msg.user.id === chatHistory[i - 1]?.user?.id
            })}
          >
            <div className={style.msg}>
              {user.id !== msg.user.id && msg.user.id !== chatHistory[i - 1]?.user?.id &&
                <div className={style.name}>{msg.user.name}</div>
              }
              <div className={style.text}>{msg.text}</div>
            </div>
          </div>
        )}
      </div>
    )
  };
};