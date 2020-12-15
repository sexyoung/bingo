import { useRef } from "react";
import { useHistory } from "react-router-dom";

import { getRandomChar } from "utils";

export function HomePage() {
  const history = useHistory();
  const roomDOM = useRef();

  const handleClick = () => {
    history.replace(`/${getRandomChar(4)}/join`);
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.replace(`/${roomDOM.current.value}/join`);
  };

  return (
    <div>
      <h2>HomePage</h2>
      <button onClick={handleClick}>Create</button>
      <div>
        should generate random string
      </div>
      <h3>or</h3>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          ref={roomDOM}
          maxLength="4"
          pattern="[0-9A-Z]{4}"
          placeholder="input room id" />
      </form>
    </div>
  );
}
