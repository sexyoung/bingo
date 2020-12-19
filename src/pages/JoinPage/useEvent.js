import { useParams, useHistory } from "react-router-dom";
import { useLayoutEffect, createRef, useState } from "react";

import { SocketEvent } from "const";

let num = 0;

/** 這邊看起來還是有點亂，想一下怎麼改 */
export const useEvent = (user) => {
  const nameDOM = createRef();
  const inputDOM = createRef();
  const history = useHistory();
  const { room } = useParams();
  const canvasDOM = createRef();
  const [size, setSize] = useState(5);
  const [userList, setUserList] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  // const [showQRCode, setShowQRCode] = useState(false);
  const [ matrix, setMatrix ] = useState(
    Array(size ** 2).fill(0)
  );

  useLayoutEffect(() => {
    // qrcode.toCanvas(canvasDOM.current, `${location.origin}/#/${room}/join`, error => {
    //   if (error) console.error(error);
    //   console.log('QR success!');
    // });

    user.join(room);

    const PlayerUpdate = socketList => setUserList(socketList.filter(v => v));
    const MessageUpdate = message => setChatHistory(chatHistory => [ message, ...chatHistory ]);
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

    return () => {
      user.socket.off(SocketEvent.Room.Denied, Denied);
      user.socket.off(SocketEvent.Room.StartGame, StartGame);
      user.socket.off(SocketEvent.Room.PlayerUpdate, PlayerUpdate);
      user.socket.off(SocketEvent.Room.MessageUpdate, MessageUpdate);
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    user.send(room, inputDOM.current.value);
    inputDOM.current.value = '';
  };

  const handleRename = e => {
    e.preventDefault();
    user.changeName(room, nameDOM.current.value);
  };

  const updateProcess = matrix => {
    console.warn('updateProcess');
    user.matrix = matrix;
    user.updateProcess(room, matrix.filter(v => v).length / (size ** 2));
  };

  const handleStartGame = () => {
    user.startGame(room, size, size);
  };

  const matrixProcess = updateMatrix => {
    num = updateMatrix.filter(v => v).length;
    setMatrix(updateMatrix);
    updateProcess(updateMatrix);
  };

  const resetMatrix = () => {
    const updateMatrix = Array(size ** 2).fill(0);
    /** 這邊是不是有更好的寫法? */
    matrixProcess(updateMatrix);
  };

  const randomMatrix = () => {
    const updateMatrix = [...Array(size ** 2).keys()]
      .map(v => v + 1)
      .sort(() => .5 - Math.random());
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

    nameDOM: <input type="text" defaultValue={user.name} ref={nameDOM} />,
    inputDOM: <input type="text" ref={inputDOM} placeholder="聊天" />,
  };
};