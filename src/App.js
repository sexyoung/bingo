import {
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";

import * as Page from "pages";
import style from './App.module.scss';

function App() {

  return (
    <div className={style.App}>
      <HashRouter>
        <Switch>
          <Route exact path="/"><Page.HomePage /></Route>
          <Route path="/:roomID"><Page.RoomPage /></Route>
          {/* <Route exact path="/new/:roomID"><Page.NewPage /></Route>
          <Route exact path="/join/:roomID"><Page.JoinPage /></Route>
          <Route exact path="/game/:roomID"><Page.GamePage /></Route> */}
          <Route path="*"><Page.NotFoundPage /></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
