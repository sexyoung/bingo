export const SocketEvent = {
  Room: {
    Denied: 'RoomDenied',
    PlayerJoin: 'RoomPlayerJoin',
    PlayerUpdate: 'RoomPlayerUpdate',
    UpdateProcess: 'RoomUpdateProcess',
    MessageSend: 'RoomMessageSend',
    MessageUpdate: 'RoomMessageUpdate',
    StartGame: 'RoomStartGame',
    TriggerStartGame: 'RoomTriggerStartGame',
  },
  User: {
    ChangeName: 'UserChangeName',
  },
  Game: {
    CheckNum: 'GameCheckNum',
    FetchMatrix: 'GameFetchMatrix',
    UpdateChecked: 'GameUpdateChecked',
  }
};