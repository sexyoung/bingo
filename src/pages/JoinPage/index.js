import cx from 'classnames';
import qrcode from 'qrcode';
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useLayoutEffect, createRef, useState, useEffect } from "react";

import { Matrix } from "components";

import { useUser } from "hooks/useUser";
import { makeID, mobileCheck, handleCopyLink } from "utils";
import { SocketEvent } from "domain/const";

import { Header } from "./components/Header";

import style from "./style.module.scss";

export function JoinPage({ socket }) {
  const history = useHistory();
  const { roomID } = useParams();

  const nameDOM = createRef();
  const inputDOM = createRef();
  const chatHistoryDOM = createRef([]);

  const [size, setSize] = useState(5);
  const [show, setShow] = useState("");
  const [count, setCount] = useState(null);

  const [roomInfo, setRoomInfo] = useState({});
  const [userList, setUserList] = useState([]);
  const [qrcode64, setQRCode64] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const { user, setUser, rename } = useUser();
  console.warn(user);

  const updateProcess = matrix => {
    socket.emit(
      SocketEvent.Room.UpdateProcess,
      roomID,
      matrix,
      matrix.filter(v => v).length / (roomInfo.size ** 2)
    );
  };

  const randomMatrix = () => {
    const updateMatrix = [...Array(size ** 2).keys()]
      .map(v => v + 1)
      .sort(() => .5 - Math.random());
    /** 這邊是不是有更好的寫法? */
    updateProcess(updateMatrix);
  };

  const CountDownEnd = () => {
    socket.emit(SocketEvent.Room.TriggerStartGame, roomID);
  };

  useLayoutEffect(() => {

    const bingoUserID = localStorage.getItem('bingoUserID') || makeID();
    localStorage.setItem('bingoUserID', bingoUserID);

    // 加入
    socket.emit(SocketEvent.Room.PlayerJoin, roomID, bingoUserID);

    // 取得房間資訊
    socket.emit(SocketEvent.Room.ReqRoom, roomID );

    qrcode.toDataURL(
      `${location.origin + location.pathname}/#/${roomID}/join`.replace('bingo//', 'bingo/'), {
        width: 512,
        height: 512,
      },
      (error, url) => {
        if (error) return console.error(error);
        setQRCode64(url);
      }
    );

    // const UserUpdate = user => setUser(user);
    const RoomInfoUpdate = roomInfo => setRoomInfo(roomInfo);
    const PlayerUpdate = socketList => {
      setUserList(socketList.filter(v => v));
    };
    const MessageUpdate = message => setChatHistory(chatHistory => [ ...chatHistory, message ]);
    const Denied = () => {
      history.push('/denied');
    };

    const CountDown = count => {
      setCount(count);
    };

    const CountDownStop = () => {
      setCount(null);
    };

    const StartGame = () => {
      history.push(`/${roomID}/game`);
    };

    const initial = () => {

      // 拒絕進入，導頁
      socket.on(SocketEvent.Room.Denied, Denied);

      // 使用者清單更新
      socket.on(SocketEvent.Room.PlayerUpdate, PlayerUpdate);

      // 取得自己的資料
      socket.on(SocketEvent.User.ResUser, setUser);

      // 取得房間的資料
      socket.on(SocketEvent.Room.ResRoom, RoomInfoUpdate);

      // 訊息更新
      socket.on(SocketEvent.Room.MessageUpdate, MessageUpdate);

      // 開始倒數遊戲！
      socket.on(SocketEvent.Room.CountDown, CountDown);

      // 取消倒數
      socket.on(SocketEvent.Room.CountDownStop, CountDownStop);

      // 倒數結束
      socket.on(SocketEvent.Room.CountDownEnd, CountDownEnd);

      // 開始遊戲!
      socket.on(SocketEvent.Room.StartGame, StartGame);
    };

    // 導頁過來的
    if(socket.connected) {
      initial();
    } else {
      // 重整的
      socket.on('connect', initial);
    }

    return () => {
      socket.off(SocketEvent.User.ResUser, setUser);
      socket.off(SocketEvent.Room.ResRoom, RoomInfoUpdate);
      socket.off(SocketEvent.Room.Denied, Denied);
      socket.off(SocketEvent.Room.CountDown, CountDown);
      socket.off(SocketEvent.Room.PlayerUpdate, PlayerUpdate);
      socket.off(SocketEvent.Room.MessageUpdate, MessageUpdate);
      socket.off(SocketEvent.Room.CountDown, CountDown);
      socket.off(SocketEvent.Room.CountDownStop, CountDownStop);
      socket.off(SocketEvent.Room.CountDownEnd, CountDownEnd);
      socket.off(SocketEvent.Room.StartGame, StartGame);
    };

  }, []);

  useEffect(() => {
    chatHistoryDOM.current.scrollTop = chatHistoryDOM.current.scrollHeight;
  }, [chatHistory.length]);

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit(SocketEvent.Room.MessageSend, user.id ,roomID, inputDOM.current.value);
    inputDOM.current.value = '';
    setShow('');
    if(mobileCheck()) inputDOM.current.blur();
  };

  const toggleShow = block => {
    setShow(show === block ? "": block);
  };

  const handleRename = e => {
    e.preventDefault();
    if(!nameDOM.current.value) return;
    const newName = nameDOM.current.value;
    socket.emit(SocketEvent.User.ChangeName, roomID, newName);
    rename(newName);
    setShow('');
  };

  const handleStartCountDown = () => {
    socket.emit(SocketEvent.Room.TriggerCountDown, roomID);
  };

  const resetMatrix = () => {
    const updateMatrix = Array(size ** 2).fill(0);
    /** 這邊是不是有更好的寫法? */
    updateProcess(updateMatrix);
  };

  const handlePutNum = index => {
    if(user.matrix[index]) return;
    user.matrix[index] = user.matrix.filter(v => v).length + 1;
    updateProcess(user.matrix);
  };

  const handleCountDownCancel = () => {
    socket.emit(SocketEvent.Room.CountDownCancel, roomID);
  };

  if(roomInfo?.game) {
    return <Redirect to="/denied" />;
  }

  return (
    <div className={style.JoinPage}>
      <Header />
      <div className={style.header}>
        <div className={style.qrcode} onClick={toggleShow.bind(this, 'qrcode')} />
        <div className={style.playerCount} onClick={toggleShow.bind(this, 'player')}>
          {userList.length} Player
        </div>
        <div className={style.fit} />
        <div className={style.userName} onClick={toggleShow.bind(this, 'rename')}>
          {user.name}
        </div>
        <div className={style.matrix} onClick={toggleShow.bind(this, 'editor')}/>
      </div>

      <div className={style.content}>
        <div className={cx([style.chatPane], {
          [style.show]: show === ''
        })}>
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
        </div>
        {/* 線上玩家 */}
        <ul className={cx([style.playerPane], {
          [style.show]: show === 'player'
        })}>
          {userList.map(user =>
            <li key={user.id}>
              <div className={style.name}>{user.name}</div>
              <div className={cx(style.percentage, {
                [style.fin]: user.percentage === 1
              })}>
                <div
                  className={style.bar}
                  style={{ width: `${~~(user.percentage * 100)}%`}}
                />
              </div>
            </li>
          )}
        </ul>

        {/* 改名 */}
        <div className={cx([style.renamePane], {
          [style.show]: show === 'rename'
        })}>
          <form onSubmit={handleRename}>
            <input
              required
              type="text"
              ref={nameDOM}
              className={style.name}
              placeholder="your name"
              defaultValue={user.name}
            />
            <button>Rename</button>
          </form>
        </div>

        {/* 表格 */}
        {user.matrix &&
          <div className={cx([style.editorPane], {
            [style.show]: show === 'editor'
          })}>
            <Matrix {...{
              data: user.matrix,
              onClick: handlePutNum,
              isActive: true,
            }} />
            <div className={style.buttons}>
              <button className={style.reset} onClick={resetMatrix}>RESET</button>
              <button className={style.random} onClick={randomMatrix}>RANDOM</button>
            </div>
          </div>
        }

        {/* qr code */}
        <div className={cx([style.qrcodePane], {
          [style.show]: show === 'qrcode'
        })}>
          <img src={qrcode64} width="100%" />
          <div className={style.roomID}>{roomID}</div>
          <div className={style.link} onClick={handleCopyLink}>
            Copy the Link
          </div>
        </div>

      </div>

      <form className={style.sendMsgBar} onSubmit={handleSubmit}>
        {!userList.findIndex(u => u.id === user.id) &&
          <button
            type="button"
            className={style.startBtn}
            onClick={handleStartCountDown}
            disabled={userList.some(({ percentage = 0 }) => percentage !== 1)}
          >Start</button>
        }
        <input type="text" ref={inputDOM} placeholder="輸入訊息" required />
        <button type="submit" className={style.sendBtn}>　</button>
      </form>

      {count !== null &&
        <div className={cx(style.countdown)}>
          {count}
          <button className={style.stopBtn} onClick={handleCountDownCancel}>CANCEL</button>
        </div>
      }
    </div>
  );
}
