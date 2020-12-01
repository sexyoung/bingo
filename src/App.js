import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import {
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";

import * as Page from "pages";
import style from './App.module.scss';

function App() {

  useEffect(() => {
    const socket = socketIOClient('http://127.0.0.1:4001');
    socket.on("FromAPI", data => {
      console.log(data);
    });
  }, []);

  return (
    <div className={style.App}>
      <HashRouter>
        <Switch>
          <Route exact path="/"><Page.HomePage /></Route>
          <Route exact path="/room/:roomID"><Page.RoomPage /></Route>
          <Route exact path="/join/:roomID"><Page.JoinPage /></Route>
          <Route exact path="/game/:roomID"><Page.GamePage /></Route>
          <Route path="*"><Page.NotFoundPage /></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
