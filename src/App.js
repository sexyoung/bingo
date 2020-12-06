import { useEffect } from "react";
import {
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";

import { User } from "class";
import * as Page from "pages";
import style from './App.module.scss';

function App() {

  useEffect(() => {
    new User();
  }, []);

  return (
    <div className={style.App}>
      <HashRouter>
        <Switch>
          <Route exact path="/"><Page.HomePage /></Route>
          <Route path="/denied"><Page.DeniedPage /></Route>
          <Route path="/:room"><Page.RoomPage /></Route>
          <Route path="*"><Page.NotFoundPage /></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
