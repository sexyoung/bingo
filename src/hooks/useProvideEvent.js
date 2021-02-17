import { useState } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "hooks/useUser";
import { useCount } from "hooks/useCount";
import { SocketEvent } from "domain/const";

export const useProvideEvent = ({ socket, roomID }) => {
  const history = useHistory();
  const [show, setShow] = useState("");
  const {setCount} = useCount();
  const [roomInfo, ResRoom] = useState({});
  const [userList, setUserList] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const {setUser: ResUser} = useUser();

  /** common */
  const Denied = () => history.push('/denied');
  const PlayerUpdate = socketList => setUserList(socketList.filter(v => v));
  const MessageUpdate = message => setChatHistory(chatHistory => [ ...chatHistory, message ]);

  // JoinPage(socket)
  const CountDown = setCount;
  const CountDownStop = () => setCount(null);
  const CountDownEnd = () => socket.emit(SocketEvent.Room.TriggerStartGame, roomID);
  const StartGame = () => {
    setCount(null);
    history.push(`/${roomID}/game`);
  };

  return {
    // common(socket)
    Denied,
    ResUser,
    PlayerUpdate,
    MessageUpdate,

    // JoinPage(socket)
    ResRoom,
    CountDown,
    CountDownStop,
    CountDownEnd,
    StartGame,

    // JoinPage
    show,
    // count,
    roomInfo,
    userList,
    chatHistory,
    setShow

  };
};