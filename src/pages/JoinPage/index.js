import { useEffect } from "react";

import { User } from "class";

export function JoinPage({ socket }) {

  useEffect(() => {
    const user = new User();
    socket.emit('joinRequest', 'abc', user.id);
  }, []);

  return (
    <div>
      <h2>JoinPage</h2>
    </div>
  );
}
