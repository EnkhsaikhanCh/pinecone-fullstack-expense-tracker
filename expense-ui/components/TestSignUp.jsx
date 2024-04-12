import { Mutator } from "@/pages/util";
import { useState } from "react";

export function TestSignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function SignUpSubmit() {
    console.log({ username, email, password });
    await Mutator("users/signUp", { username, email, password });
    alert("Success Sign Up. Now Login");
  }

  return (
    <div className="flex gap-1">
      <input
        type="text"
        placeholder="Username"
        className="input input-bordered"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-neutral" onClick={SignUpSubmit}>
        Sign Up
      </button>
    </div>
  );
}
