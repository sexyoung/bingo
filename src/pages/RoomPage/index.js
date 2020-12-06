import {
  Route,
  Switch,
} from "react-router-dom";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useRouteMatch } from "react-router-dom";

import { User } from "class";
import * as Page from "pages";
const { REACT_APP_SOCKET_URL: SocketURL } = process.env;

export function RoomPage() {
  const [ user ] = useState(
    new User(socketIOClient(SocketURL))
  );
  const { path } = useRouteMatch();

  useEffect(() => user.leave, []);

  return (
    <div classs="RoomPage">
      <Switch>
        <Route path={`${path}/join`}><Page.JoinPage {...{ user }} /></Route>
        <Route path={`${path}/game`}><Page.GamePage {...{ user }}  /></Route>
        <Route path="*"><Page.NotFoundPage /></Route>
      </Switch>
    </div>
  );
}
