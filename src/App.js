import qrcode from 'qrcode';
import { useEffect, createRef } from "react";
import socketIOClient from "socket.io-client";

import style from './App.module.scss';

function App() {

  const canvas = createRef();

  useEffect(() => {
    console.log(canvas.current);

    qrcode.toCanvas(canvas.current, 'http://localhost:3000/', function (error) {
      if (error) console.error(error)
      console.log('success!');
    });

    const socket = socketIOClient('http://127.0.0.1:4001');
    socket.on("FromAPI", data => {
      console.log(data);
    });
  }, []);

  return (
    <div className={style.App}>
      hello2
      <canvas ref={canvas} id="canvas"></canvas>
    </div>
  );
}

export default App;
