import {
  Route,
  Switch,
} from "react-router-dom";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import { useRouteMatch } from "react-router-dom";

import { User } from "class";
import * as Page from "pages";

const user = new User();

export function RoomPage() {
  const { path } = useRouteMatch();
  const [ socket ] = useState(socketIOClient(process.env.REACT_APP_SOCKET_URL));

  useEffect(() => {
    return () => socket.close();
  }, []);

  return (
    <div classs="RoomPage">
      <Switch>
        <Route path={`${path}/join`}><Page.JoinPage {...{ user, socket }} /></Route>
        <Route path={`${path}`}><Page.GamePage {...{ user, socket }}  /></Route>
        <Route path="*"><Page.NotFoundPage /></Route>
      </Switch>
    </div>
  );
}
