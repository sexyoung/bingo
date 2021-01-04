import { useRef } from "react";
import { useHistory, Link } from "react-router-dom";

import style from './style.module.scss';

const { REACT_APP_SOCKET_URL: SocketURL } = process.env;

export function HomePage() {
  const roomDOM = useRef();
  const history = useHistory();


  const handleClick = () => {
    fetch(`${SocketURL}/new-room`)
      .then(res => res.json())
      .then(roomName => {
        history.push(`/${roomName}/join`);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push(`/${roomDOM.current.value}/join`);
  };

  return (
    <div className={style.HomePage}>
      <div className={style.slogan}>
        <div className={style.ballGroup}>
          <div className={style.ball}>B</div>
          <div className={style.ball}>I</div>
          <div className={style.ball}>N</div>
          <div className={style.ball}>G</div>
          <div className={style.ball}>O</div>
        </div>
        <div className={style.subTitle}>
          ONLINE BATTLE
        </div>
      </div>
      <div className={style.menu}>
        <button className={style.create} onClick={handleClick}>CREATE</button>
        <h3>OR</h3>
        <form onSubmit={handleSubmit} className={style.form}>
          <input
            required
            type="text"
            ref={roomDOM}
            maxLength="4"
            pattern="[0-9A-Z]{4}"
            placeholder="ROOM ID" />
          <button>JOIN</button>
        </form>
      </div>
      <Link className={style.rule} to="/rule">HOW TO PLAY</Link>
    </div>
  );
}
