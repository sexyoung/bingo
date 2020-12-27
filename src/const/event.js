export const SocketEvent = {
  Room: {
    Denied: 'RoomDenied',
    PlayerJoin: 'RoomPlayerJoin',
    PlayerUpdate: 'RoomPlayerUpdate',
    UpdateProcess: 'RoomUpdateProcess',
    MessageSend: 'RoomMessageSend',
    MessageUpdate: 'RoomMessageUpdate',
    CountDown: 'RoomCountDown', // ← 遊戲開始前的倒數
    CountDownStop: 'RoomCountDownStop',
    CountDownEnd: 'RoomCountDownEnd',
    CountDownCancel: 'RoomCountDownCancel',
    StartGame: 'RoomStartGame',
    SaveMatrix: 'RoomSaveMatrix',
    TriggerCountDown: 'RoomTriggerCountDown',
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