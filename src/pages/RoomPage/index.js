import {
  Route,
  Switch,
} from "react-router-dom";
import { useEffect, useMemo } from "react";
import socketIOClient from "socket.io-client";
import { useRouteMatch } from "react-router-dom";

import * as Page from "pages";

import style from './style.module.scss';

const { REACT_APP_SOCKET_URL: SocketURL } = process.env;

export function RoomPage() {
  const { path } = useRouteMatch();
  const socket = useMemo(() => socketIOClient(SocketURL), []);
  useEffect(() => {
    return () => socket.close();
  }, []);

  // if(!user) return null;

  return (
    <div className={style.RoomPage}>
      <Switch>
        <Route path={`${path}/join`}><Page.JoinPage {...{ socket }} /></Route>
        <Route path={`${path}/game`}><Page.GamePage {...{ socket }}  /></Route>
        <Route path="*"><Page.NotFoundPage /></Route>
      </Switch>
    </div>
  );
}
