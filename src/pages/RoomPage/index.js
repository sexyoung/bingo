import {
  Route,
  Switch,
} from "react-router-dom";
import { useEffect, useMemo } from "react";
import socketIOClient from "socket.io-client";
import { useRouteMatch } from "react-router-dom";

import { userContext, useProvideUser } from "hooks/useUser";
import { countContext, useProvideCount } from "hooks/useCount";
import * as Page from "pages";

import style from './style.module.scss';

const { REACT_APP_SOCKET_URL: SocketURL } = process.env;

export function RoomPage() {
  const user = useProvideUser();
  const count = useProvideCount();
  const { path } = useRouteMatch();
  const socket = useMemo(() => socketIOClient(SocketURL), []);
  useEffect(() => {
    return () => socket.close();
  }, []);

  // if(!user) return null;

  return (
    <div className={style.RoomPage}>
      <userContext.Provider value={user}>
        <Switch>
          <Route path={`${path}/join`}>
            <countContext.Provider value={count}>
              <Page.JoinPage {...{ socket }} />
            </countContext.Provider>
          </Route>
          <Route path={`${path}/game`}><Page.GamePage {...{ socket }}  /></Route>
          <Route path="*"><Page.NotFoundPage /></Route>
        </Switch>
      </userContext.Provider>
    </div>
  );
}
