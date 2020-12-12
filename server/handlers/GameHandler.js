import UserManager from "../UserManager";
import GameManager from '../GameManager';
import { SocketEvent } from "../../src/const";

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
    // id: user.id,
    name: UserManager.get({ id: user.id }).name,
    winCount: getLineCount(user.matrix, checkedList, winStr, size)
  }));
};

export const GameHandler = ({ io, socket }) => {

  socket.on(SocketEvent.Game.CheckNum, (room, num) => {
    const checkedList = GameManager.checked(room, num);
    const game = GameManager.get(room);
    const { turnIndex, idList } = game;
    io.in(room).emit(
      SocketEvent.Game.UpdateChecked,
      checkedList,
      idList[turnIndex].id,
      getPlayerLineCount(game)
    );
  });

  socket.on(SocketEvent.Game.FetchMatrix, room => {
    const game = GameManager.get(room);
    const { checkedList, turnIndex, idList } = game;
    io.to(socket.id).emit(
      SocketEvent.Game.SelfMatrix,
      idList.find(({ id }) => UserManager.get({ socketID: socket.id }).id === id).matrix,
      checkedList,
      idList[turnIndex].id,
      getPlayerLineCount(game),
    );
  });
};