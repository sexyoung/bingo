import {
  Link,
} from "react-router-dom";

export function HomePage() {
  return (
    <div>
      <h2>HomePage</h2>
      <Link to={`/abc/new`}>Create</Link>
      <div>
        should generate random string
      </div>
      <h3>or</h3>
      <input type="text" placeholder="input room id" />
    </div>
  );
}
