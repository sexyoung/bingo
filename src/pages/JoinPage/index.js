import cx from 'classnames';
import { useState } from "react";

import { Matrix } from "components";
import { useEvent } from './useEvent';

import style from "./style.module.scss";

export function JoinPage({ user }) {
  const [show, setShow] = useState("");
  const toggleShow = block => {
    setShow(
      show === block ? "": block
    );
  };

  const {
    NameDOM,
    InputDOM,
    ChatHistoryDOM,
    ...event
  } = useEvent(user);

  return (
    <div className={style.JoinPage}>
      <div className={style.header}>
        <div className={style.qrcode} onClick={toggleShow.bind(this, 'qrcode')} />
        <div className={style.playerCount} onClick={toggleShow.bind(this, 'player')}>
          {event.userList.length} Player
        </div>
        <div className={style.fit} />
        <div className={style.userName} onClick={toggleShow.bind(this, 'rename')}>
          {user.name}
        </div>
        <div className={style.matrix} onClick={toggleShow.bind(this, 'editor')}/>
      </div>

      <div className={style.content}>
        <div className={cx([style.chat], {
          [style.show]: show === ''
        })}>
          {ChatHistoryDOM}
        </div>
        {/* 線上玩家 */}
        <div className={cx([style.player], {
          [style.show]: show === 'player'
        })}>
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

        {/* 改名 */}
        <div className={cx([style.rename], {
          [style.show]: show === 'rename'
        })}>
          <form onSubmit={event.handleRename}>
            <strong>name: </strong>
            {NameDOM}
            <button>rename</button>
          </form>
        </div>

        {/* 表格 */}
        <div className={cx([style.editor], {
          [style.show]: show === 'editor'
        })}>
          <button onClick={event.resetMatrix}>reset</button>
          <button onClick={event.randomMatrix}>random</button>
          <Matrix {...{
            data: event.matrix,
            onClick: event.handlePutNum,
            isActive: true,
          }} />
        </div>

        <div className={cx([style.qrcode], {
          [style.show]: show === 'qrcode'
        })}>
          <button onClick={setShow.bind(this, "")}>close</button>
          {event.CanvasDOM}
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
