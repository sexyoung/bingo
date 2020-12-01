import qrcode from 'qrcode';
import { useParams } from "react-router-dom";
import { useLayoutEffect, createRef } from "react";

export function RoomPage() {

  const { roomID } = useParams();

  const canvas = createRef();

  useLayoutEffect(() => {
    qrcode.toCanvas(canvas.current, `${location.origin}/#/join/${roomID}`, error => {
      if (error) console.error(error);
      console.log('success!');
    });
  }, []);

  return (
    <div>
      <h2>RoomPage</h2>
      <h3>{`${location.origin}/#/join/${roomID}`}</h3>
      <canvas ref={canvas} id="canvas" />
    </div>
  );
}
