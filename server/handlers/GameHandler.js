import UserManager from "../UserManager";
import GameManager from '../GameManager';
import { SocketEvent } from "const";

import { UserDepartment, RoomDepartment } from "class";

const getLineCount = (matrix, checkedList, winStr, size) => {
  const result = checkedList
    .map(num => matrix.findIndex(v => v === num))
    .reduce((result, index) =>
      result.replace(new RegExp(`,${index},`, 'g'), ',,')
    , winStr)
    .match(new RegExp(`${','.repeat(size + 1)}`, 'g'));
  return result ? result.length: 0;
};

const getPlayerLineCount = ({ idList, checkedList, winStr, size }) => {
  return idList.map(user => ({
    id: user.id,
    name: UserManager.get({ id: user.id }).name,
    winCount: getLineCount(user.matrix, checkedList, winStr, size)
  }));
};

const getResponse = ({ game, checkedList }) => {
  const { turnIndex, idList, winLine } = game;
  const winCountList = getPlayerLineCount(game);
  const winList = winCountList
    .filter(user =>
      user.winCount >= winLine
    )
    .map(({ name }) => name);

  return [
    checkedList,
    idList[turnIndex].id,
    winCountList,
    winList,
    winLine,
  ];
};

export const GameHandler = ({ io, socket }) => {
  const socketID = socket.id;

  /** 取得game資訊 */
  socket.on(SocketEvent.Game.InfoReq, roomID => {
    const room = RoomDepartment.load(roomID);
    console.warn('game', room.game);
    io.to(socketID).emit(
      SocketEvent.Game.InfoRes,
      room.game
    );
  });

  socket.on(SocketEvent.Game.CheckNum, (room, num) => {
    const game = GameManager.get(room);
    if(!game) return;
    io.in(room).emit(
      SocketEvent.Game.UpdateChecked,
      ...getResponse({
        game,
        checkedList: GameManager.checked(room, num),
      }),
    );
  });

  /** @deprecated */
  socket.on(SocketEvent.Game.FetchMatrix, room => {
    const game = GameManager.get(room);
    if(!game) return;
    const { checkedList = [], idList = [] } = game;
    const user = idList.find(({ id }) => UserManager.get({ socketID: socket.id }).id === id);
    if(!user) {
      return console.log('===== user', idList, UserManager.all());
    }
    io.to(socket.id).emit(
      SocketEvent.Game.SelfMatrix,
      idList.find(({ id }) => UserManager.get({ socketID: socket.id }).id === id).matrix,
      ...getResponse({
        game,
        checkedList,
      }),
    );
  });

  socket.on(SocketEvent.Game.RePlay, room => {
    const socketIDList = GameManager.close(room);
    socketIDList.forEach(socketID => {
      UserManager.remove(socketID);
    });
    io.in(room).emit(
      SocketEvent.Game.GoJoin,
    );
  });
};