export const SocketEvent = {
  Room: {
    Denied: 'RoomDenied',
    PlayerJoin: 'RoomPlayerJoin',
    PlayerUpdate: 'RoomPlayerUpdate',
    UpdateProcess: 'RoomUpdateProcess',
    MessageSend: 'RoomMessageSend',
    MessageUpdate: 'RoomMessageUpdate',
    StartGame: 'RoomStartGame',
    SaveMatrix: 'RoomSaveMatrix',
    TriggerStartGame: 'RoomTriggerStartGame',
  },
  User: {
    ChangeName: 'UserChangeName',
  },
  Game: {
    GoJoin: 'GameGoJoin',
    RePlay: 'GameRePlay',
    CheckNum: 'GameCheckNum',
    SelfMatrix: 'GameSelfMatrix',
    FetchMatrix: 'GameFetchMatrix',
    UpdateChecked: 'GameUpdateChecked',
  }
};