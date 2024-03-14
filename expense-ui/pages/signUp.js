import { LogoSVG } from "@/components/image/LogoSVG";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signUpUser() {
    axios
      .post(`http://localhost:3000/users/signUp`, {
        username: username,
        email: email,
        password: password,
      })
      .then(() => {
        setUsername("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  }

  return (
    <main>
      <div className="container mx-auto mt-10 flex w-[342px] flex-col items-center gap-3 px-4">
        <div className="flex items-center gap-2">
          <LogoSVG />
          <h1 className="text-2xl font-bold">Gelt</h1>
        </div>
        <div className="mb-3 mt-5 flex h-full flex-col gap-2">
          <h1 className="flex justify-center text-xl font-bold">
            Create Geld account
          </h1>
        </div>
        <div className="card w-full rounded-md border bg-white">
          <div className="card-body px-[20px] py-4">
            <div className="flex flex-col gap-3">
              {/* Name */}
              <label className="form-control w-full max-w-xs">
                <div className="label px-0 pb-1 pt-0">
                  <span className="label-text font-bold">Username</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-sm input-bordered w-full max-w-xs rounded-md bg-[#F5F5F5]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              {/* Email */}
              <label className="form-control w-full max-w-xs">
                <div className="label px-0 pb-1 pt-0">
                  <span className="label-text font-bold">Email</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-sm input-bordered w-full max-w-xs rounded-md bg-[#F5F5F5]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              {/* Password */}
              <label className="form-control w-full max-w-xs">
                <div className="label px-0 pb-1 pt-0">
                  <span className="label-text font-bold">Password</span>
                </div>
                <input
                  type="password"
                  placeholder=""
                  className="input input-sm input-bordered w-full max-w-xs rounded-md bg-[#F5F5F5]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label className="form-control mb-[15px] w-full max-w-xs">
                <div className="label px-0 pb-1 pt-0">
                  <span className="label-text font-bold">Re-password</span>
                </div>
                <input
                  type="password"
                  placeholder=""
                  className="input input-sm input-bordered w-full max-w-xs rounded-md bg-[#F5F5F5]"
                />
              </label>
            </div>
            {/* Sign up button */}
            <button
              className="btn btn-neutral btn-sm rounded-md text-white"
              onClick={signUpUser}
            >
              Sign up
            </button>
          </div>
        </div>
        {/* Sign up */}
        <div className="card w-full rounded-md border bg-white">
          <div className="card-body py-[20px]">
            <span className="flex justify-center gap-2">
              Already have account?
              <a href="http://localhost:3001/login">
                <button className="text-[#2F81F7]">Log in</button>
              </a>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
