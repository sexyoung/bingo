import qrcode from 'qrcode';
import cx from 'classnames';
import { useState } from "react";

import { Matrix } from "components";
import { useEvent } from './useEvent';

import style from "./style.module.scss";

export function JoinPage({ user }) {

  const event = useEvent(user);
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <div className={style.JoinPage}>
      <h3>JoinPage</h3>

      {/* step 1 */}
      <form onSubmit={event.handleRename}>
        <strong>name: </strong>
        {event.nameDOM}
        {/* <input type="text" defaultValue={user.name} ref={event.nameDOM} /> */}
        <button>rename</button>
      </form>

      {/* step 2 */}
      <button onClick={event.resetMatrix}>reset</button>
      <button onClick={event.randomMatrix}>random</button>
      <Matrix {...{
        data: event.matrix,
        onClick: event.handlePutNum,
        isActive: true,
      }} />

      {/* step 3 */}
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
      <form onSubmit={event.handleSubmit}>
        {event.inputDOM}
        {/* <input type="text" ref={event.inputDOM} placeholder="聊天" /> */}
      </form>
      <div>
        {event.chatHistory.map((msg, i) =>
          <div key={i}>{msg.sender}: {msg.text}</div>
        )}
      </div>

      {/* final */}
      {!event.userList.findIndex(u => u.id === user.id) &&
        <button
          onClick={event.handleStartGame}
          disabled={event.userList.some(({ percentage = 0 }) => percentage !== 1)}
        >start!!!!</button>
      }
      <div>
        <button onClick={setShowQRCode.bind(this, true)}>qr code</button>
      </div>
      <div className={cx(style.modal, {
        [style.show]: showQRCode
      })}>
        <button onClick={setShowQRCode.bind(this, false)}>close</button>
        <canvas ref={event.canvasDOM} id="canvas" />
      </div>
    </div>
  );
}
