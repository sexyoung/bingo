export const SocketEvent = {
  Room: {
    InfoReq: 'RoomInfoReq',
    InfoRes: 'RoomInfoRes',
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
    InfoRes: 'UserInfoRes',
    ChangeName: 'UserChangeName',
  },
  Game: {
    InfoReq: 'GameInfoReq',
    InfoRes: 'GameInfoRes',
    GoJoin: 'GameGoJoin',
    RePlay: 'GameRePlay',
    Turn: 'GameTurn',
    CheckNum: 'GameCheckNum',
    SelfMatrix: 'GameSelfMatrix',
    FetchMatrix: 'GameFetchMatrix',
    UpdateChecked: 'GameUpdateChecked',
  }
};