import cx from 'classnames';
import { useParams } from "react-router-dom";
import { Matrix } from "components";
import { useEvent } from './useEvent';

import style from "./style.module.scss";

export function JoinPage({ socket }) {
  const {
    NameDOM,
    InputDOM,
    ChatHistoryDOM,
    ...event
  } = useEvent(socket);

  const { room } = useParams();

  return (
    <div className={style.JoinPage}>
      <div className={style.header}>
        <div className={style.qrcode} onClick={event.toggleShow.bind(this, 'qrcode')} />
        <div className={style.playerCount} onClick={event.toggleShow.bind(this, 'player')}>
          {event.userList.length} Player
        </div>
        <div className={style.fit} />
        <div className={style.userName} onClick={event.toggleShow.bind(this, 'rename')}>
          {event.user.name}
        </div>
        <div className={style.matrix} onClick={event.toggleShow.bind(this, 'editor')}/>
      </div>

      <div className={style.content}>
        <div className={cx([style.chatPane], {
          [style.show]: event.show === ''
        })}>
          {ChatHistoryDOM}
        </div>
        {/* 線上玩家 */}
        <ul className={cx([style.playerPane], {
          [style.show]: event.show === 'player'
        })}>
          {event.userList.map(user =>
            <li key={user.id}>
              <div className={style.name}>{user.name}</div>
              <div className={cx(style.percentage, {
                // [style.fin]: user.percentage === 1
              })}>
                <div
                  className={style.bar}
                  // style={{ width: `${~~(user.percentage * 100)}%`}}
                />
              </div>
            </li>
          )}
        </ul>

        {/* 改名 */}
        <div className={cx([style.renamePane], {
          [style.show]: event.show === 'rename'
        })}>
          <form onSubmit={event.handleRename}>
            {NameDOM}
            <button>Rename</button>
          </form>
        </div>

        {/* 表格 */}
        <div className={cx([style.editorPane], {
          [style.show]: event.show === 'editor'
        })}>
          <Matrix {...{
            data: event.matrix,
            onClick: event.handlePutNum,
            isActive: true,
          }} />
          <div className={style.buttons}>
            <button className={style.reset} onClick={event.resetMatrix}>RESET</button>
            <button className={style.random} onClick={event.randomMatrix}>RANDOM</button>
          </div>
        </div>

        {/* qr code */}
        <div className={cx([style.qrcodePane], {
          [style.show]: event.show === 'qrcode'
        })}>
          <img src={event.qrcode64} width="100%" />
          <div className={style.roomID}>{room}</div>
          <div className={style.link} onClick={event.handleCopyLink}>
            Copy the Link
          </div>
        </div>

      </div>

      <form className={style.sendMsgBar} onSubmit={event.handleSubmit}>
        {/* {!event.userList.findIndex(u => u.id === user.id) &&
          <button
            type="button"
            className={style.startBtn}
            onClick={event.handleStartCountDown}
            disabled={event.userList.length <= 1 || event.userList.some(({ percentage = 0 }) => percentage !== 1)}
          >Start</button>
        } */}
        {InputDOM}
        <button type="submit" className={style.sendBtn}>　</button>
      </form>

      {event.count !== null &&
          <div className={cx(style.countdown)}>
            {event.count}
            <button className={style.stopBtn} onClick={event.handleCountDownCancel}>CANCEL</button>
          </div>
      }
    </div>
  );
}
