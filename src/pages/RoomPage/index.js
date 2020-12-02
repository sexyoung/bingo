import {
  Route,
  Switch,
} from "react-router-dom";
import { useEffect } from "react";
import socketIOClient from "socket.io-client";

import { useParams, useRouteMatch } from "react-router-dom";

import * as Page from "pages";

export function RoomPage() {

  const { roomID } = useParams();
  const { path, url } = useRouteMatch();

  useEffect(() => {
    const socket = socketIOClient('http://127.0.0.1:4001');
    socket.on("FromAPI", data => {
      console.log(data);
    });
  }, []);

  return (
    <div classs="RoomPage">
      <Switch>
        <Route path={`${path}/new`}><Page.NewPage /></Route>
        <Route path={`${path}/join`}><Page.JoinPage /></Route>
        <Route path={`${path}`}><Page.GamePage /></Route>
        <Route path="*"><Page.NotFoundPage /></Route>
      </Switch>
    </div>
  );
}
