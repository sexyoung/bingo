import { SocketEvent } from "domain/const";
import { useProvideEvent } from "hooks/useProvideEvent";

let event = {};

export const useEvent = ({ socket, roomID }) => {
  const provideEvent = useProvideEvent({ socket, roomID });

  const on = (_event) => {
    for (const key in _event) {
      _event[key].forEach(eventName => {
        socket.on(SocketEvent[key][eventName], provideEvent[eventName]);
      });
    }

    event = {..._event};
  };

  const off = () => {
    for (const key in event) {
      event[key].forEach(eventName => {
        socket.off(SocketEvent[key][eventName], provideEvent[eventName]);
      });
    }
    event = {};
  };

  return {
    on,
    off,
    ...provideEvent,
  };
};
