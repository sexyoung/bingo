import qrcode from 'qrcode';
import cx from 'classnames';
import { useParams } from "react-router-dom";
import { useState, useLayoutEffect, createRef } from "react";

import { Matrix } from "components";
import { useEvent } from './useEvent';

import style from "./style.module.scss";

export function JoinPage({ user }) {
  const { room } = useParams();
  const canvasDOM = createRef();
  const [showQRCode, setShowQRCode] = useState(false);

  useLayoutEffect(() => {
    qrcode.toCanvas(canvasDOM.current, `${location.origin}/#/${room}/join`, error => {
      if (error) console.error(error);
      console.log('QR success!');
    });
  }, []);

  const {
    NameDOM,
    InputDOM,
    ChatHistoryDOM,
    ...event
  } = useEvent(user);

  return (
    <div className={style.JoinPage}>
      <div className={style.header}>
        <div className={style.qrcode} onClick={setShowQRCode.bind(this, true)} />
        <div className={style.playerCount}>
          {event.userList.length}人在線
        </div>
        <div className={style.fit} />
        <div className={style.userName}>
          {user.name}
        </div>
        <div className={style.matrix} />
      </div>

      <div className={style.content}>
        {ChatHistoryDOM}

        {/* step 3 */}
        <div className={style.modal}>
          {event.userList.map((user, index) =>
            <div key={user.id}>
              {(user.percentage ?? 0) < 1 ?
                <span>{~~(user.percentage * 100)}%</span>:
                <span>Ready!!!</span>
              }
            /
              {user.name}
              {!index && <span>← start button here</span>}
            </div>
          )}
        </div>

        {/* step 1 */}
        <div className={style.modal}>
          <form onSubmit={event.handleRename}>
            <strong>name: </strong>
            {NameDOM}
            <button>rename</button>
          </form>
        </div>

        {/* step 2 */}
        <div className={style.modal}>
          <button onClick={event.resetMatrix}>reset</button>
          <button onClick={event.randomMatrix}>random</button>
          <Matrix {...{
            data: event.matrix,
            onClick: event.handlePutNum,
            isActive: true,
          }} />
        </div>

        <div className={cx(style.modal, {
          [style.show]: showQRCode
        })}>
          <button onClick={setShowQRCode.bind(this, false)}>close</button>
          <canvas ref={canvasDOM} id="canvas" />
        </div>

      </div>

      <form className={style.sendMsgBar} onSubmit={event.handleSubmit}>
        {!event.userList.findIndex(u => u.id === user.id) &&
          <button
            type="button"
            className={style.startBtn}
            onClick={event.handleStartGame}
            disabled={event.userList.some(({ percentage = 0 }) => percentage !== 1)}
          >Start</button>
        }
        {InputDOM}
        <button type="submit" className={style.sendBtn}>　</button>
      </form>
    </div>
  );
}
