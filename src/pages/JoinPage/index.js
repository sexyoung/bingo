import cx from 'classnames';

import { Matrix } from "components";
import { useEvent } from './useEvent';

import style from "./style.module.scss";

export function JoinPage({ user }) {
  const {
    NameDOM,
    InputDOM,
    ChatHistoryDOM,
    ...event
  } = useEvent(user);

  return (
    <div className={style.JoinPage}>
      <div className={style.header}>
        <div className={style.qrcode} onClick={event.toggleShow.bind(this, 'qrcode')} />
        <div className={style.playerCount} onClick={event.toggleShow.bind(this, 'player')}>
          {event.userList.length} Player
        </div>
        <div className={style.fit} />
        <div className={style.userName} onClick={event.toggleShow.bind(this, 'rename')}>
          {user.name}
        </div>
        <div className={style.matrix} onClick={event.toggleShow.bind(this, 'editor')}/>
      </div>

      <div className={style.content}>
        <div className={cx([style.chat], {
          [style.show]: event.show === ''
        })}>
          {ChatHistoryDOM}
        </div>
        {/* 線上玩家 */}
        <div className={cx([style.player], {
          [style.show]: event.show === 'player'
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
          [style.show]: event.show === 'rename'
        })}>
          <form onSubmit={event.handleRename}>
            <strong>name: </strong>
            {NameDOM}
            <button>rename</button>
          </form>
        </div>

        {/* 表格 */}
        <div className={cx([style.editor], {
          [style.show]: event.show === 'editor'
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
          [style.show]: event.show === 'qrcode'
        })}>
          <button onClick={event.toggleShow.bind(this, 'qrcode')}>close</button>
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
