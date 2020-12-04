import {
  useHistory,
} from "react-router-dom";

import { getRandomChar } from "utils";

export function HomePage() {
  const history = useHistory();

  function handleClick() {
    history.push(`/${getRandomChar(4)}/join`);
  }

  return (
    <div>
      <h2>HomePage</h2>
      <button onClick={handleClick}>Create</button>
      <div>
        should generate random string
      </div>
      <h3>or</h3>
      <input type="text" placeholder="input room id" />
    </div>
  );
}
