import { useState } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "hooks/useUser";
import { SocketEvent } from "domain/const";

export const useProvideEvent = ({ socket, roomID }) => {
  const history = useHistory();
  const [count, setCount] = useState(null);
  const [roomInfo, ResRoom] = useState({});
  const [userList, setUserList] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const { user, setUser: ResUser, rename } = useUser();

  const Denied = () => history.push('/denied');
  const PlayerUpdate = socketList => setUserList(socketList.filter(v => v));
  const MessageUpdate = message => setChatHistory(chatHistory => [ ...chatHistory, message ]);

  const CountDown = setCount;
  const CountDownStop = () => setCount(null);
  const CountDownEnd = () => socket.emit(SocketEvent.Room.TriggerStartGame, roomID);
  const StartGame = () => history.push(`/${roomID}/game`);

  return {
    user,
    count,
    userList,
    chatHistory,

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

    rename,

  };
};