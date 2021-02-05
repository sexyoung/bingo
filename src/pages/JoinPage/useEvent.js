import qrcode from 'qrcode';
import cx from "classnames";
import { useParams, useHistory } from "react-router-dom";
import { useLayoutEffect, createRef, useState, useEffect } from "react";

import { makeID } from "utils";
import { SocketEvent } from "domain/const";

import style from "./style.module.scss";

const mobileCheck = () => {
  let check = false;
  (function(a) {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

/** 這邊看起來還是有點亂，想一下怎麼改 */
export const useEvent = socket => {
  const nameDOM = createRef();
  const inputDOM = createRef();
  const history = useHistory();
  const { roomID } = useParams();
  const canvasDOM = createRef();
  const [size, setSize] = useState(5);
  const chatHistoryDOM = createRef([]);
  const [show, setShow] = useState("");
  const [count, setCount] = useState(null);
  const [user, setUser] = useState({});
  const [roomInfo, setRoomInfo] = useState({});
  const [userList, setUserList] = useState([]);
  const [qrcode64, setQRCode64] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [ matrix, setMatrix ] = useState(Array(size ** 2).fill(0));

  const updateProcess = matrix => {
    // user.matrix = matrix;
    socket.emit(
      SocketEvent.Room.UpdateProcess,
      roomID,
      matrix,
      matrix.filter(v => v).length / (roomInfo.size ** 2)
    );
  };

  // const matrixProcess = updateMatrix => {
  //   updateProcess(updateMatrix);
  // };

  const randomMatrix = () => {
    const updateMatrix = [...Array(size ** 2).keys()]
      .map(v => v + 1)
      .sort(() => .5 - Math.random());
    /** 這邊是不是有更好的寫法? */
    updateProcess(updateMatrix);
  };

  const handleStartGame = () => {
    socket.emit(SocketEvent.Room.TriggerStartGame, roomID);
  };

  useLayoutEffect(() => {

    const bingoUserID = localStorage.getItem('bingoUserID') || makeID();
    localStorage.setItem('bingoUserID', bingoUserID);

    // 加入
    socket.emit(SocketEvent.Room.PlayerJoin, roomID, bingoUserID);

    // 取得房間資訊
    socket.emit( SocketEvent.Room.InfoReq, roomID );

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

    const UserUpdate = user => setUser(user);
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
      socket.on(SocketEvent.User.InfoRes, UserUpdate);

      // 取得房間的資料
      socket.on(SocketEvent.Room.InfoRes, RoomInfoUpdate);

      // 訊息更新
      socket.on(SocketEvent.Room.MessageUpdate, MessageUpdate);

      // 開始倒數遊戲！
      socket.on(SocketEvent.Room.CountDown, CountDown);

      // 取消倒數
      socket.on(SocketEvent.Room.CountDownStop, CountDownStop);

      // 倒數結束
      socket.on(SocketEvent.Room.CountDownEnd, handleStartGame);

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
      socket.off(SocketEvent.User.InfoRes, UserUpdate);
      socket.off(SocketEvent.Room.InfoRes, RoomInfoUpdate);
      socket.off(SocketEvent.Room.Denied, Denied);
      socket.off(SocketEvent.Room.CountDown, CountDown);
      socket.off(SocketEvent.Room.PlayerUpdate, PlayerUpdate);
      socket.off(SocketEvent.Room.MessageUpdate, MessageUpdate);
      socket.off(SocketEvent.Room.CountDown, CountDown);
      socket.off(SocketEvent.Room.CountDownStop, CountDownStop);
      socket.off(SocketEvent.Room.CountDownEnd, handleStartGame);
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
    setUser(user => ({...user, name: newName}));
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

  const handleCopyLink = () => {
    const dummy = document.createElement('input');
    const text = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert('Copied!');
  };

  const handleCountDownCancel = () => {
    socket.emit(SocketEvent.Room.CountDownCancel, roomID);
  };

  return {
    show,
    size,
    user,
    count,
    matrix,
    qrcode64,
    userList,
    roomInfo,
    chatHistory,

    handleSubmit,
    handleRename,
    // updateProcess,
    handleStartCountDown,
    handleStartGame,
    // matrixProcess,
    resetMatrix,
    randomMatrix,
    handlePutNum,
    toggleShow,
    handleCopyLink,
    handleCountDownCancel,

    CanvasDOM: <canvas ref={canvasDOM} id="canvas" className={style.qrcode} />,
    NameDOM: <input
      required
      type="text"
      ref={nameDOM}
      className={style.name}
      placeholder="your name"
      defaultValue={user.name}
    />,
    InputDOM: <input type="text" ref={inputDOM} placeholder="輸入訊息" required />,
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