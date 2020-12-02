import {
  Route,
  Switch,
} from "react-router-dom";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import { useParams, useRouteMatch } from "react-router-dom";

import { User } from "class";
import * as Page from "pages";

const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);
socket.on("connected", data => {
  console.log('socket connected');
});

export function RoomPage() {
  const { roomID } = useParams();
  const { path, url } = useRouteMatch();

  useEffect(() => {
    const user = new User();
    return () => socket.close();
  }, []);

  return (
    <div classs="RoomPage">
      <Switch>
        <Route path={`${path}/new`}><Page.NewPage {...{ socket }} /></Route>
        <Route path={`${path}/join`}><Page.JoinPage {...{ socket }}  /></Route>
        <Route path={`${path}`}><Page.GamePage {...{ socket }}  /></Route>
        <Route path="*"><Page.NotFoundPage /></Route>
      </Switch>
    </div>
  );
}
