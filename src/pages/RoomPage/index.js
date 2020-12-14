import {
  Route,
  Switch,
} from "react-router-dom";
import { useEffect, useMemo } from "react";
import socketIOClient from "socket.io-client";
import { useRouteMatch } from "react-router-dom";

import { User } from "class";
import * as Page from "pages";
const { REACT_APP_SOCKET_URL: SocketURL } = process.env;

export function RoomPage() {
  const { path } = useRouteMatch();
  const user = useMemo(() => new User(socketIOClient(SocketURL)), []);
  useEffect(() => {
    return () => user.leave();
  }, []);

  if(!user) return null;

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
