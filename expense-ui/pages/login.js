import { Logo } from "@/components/image/Logo";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function handleClick() {
    console.log({ email, pass });
    axios
      .post("http://localhost:3000/login", {
        email,
        pass,
      })
      .then(() => {
        alert("Success");
        localStorage.setItem("login", `${email}:${pass}`);
        window.location = "/records";
      })
      .catch((e) => {
        if (e.response.status === 401) {
          alert("username or password is incorrect");
        }
      });
  }

  return (
    <main>
      <div className="container mx-auto mt-10 flex w-[342px] flex-col items-center gap-3 px-4">
        <div className="flex items-center gap-2">
          <Logo />
          <h1 className="text-2xl font-bold">Gelt</h1>
        </div>
        <div className="mb-3 mt-5 flex h-full flex-col gap-2">
          <h1 className="flex justify-center text-xl font-bold">
            Welcome back
          </h1>
          {/* <p className="text-sm">Welcome back, Please enter your details</p> */}
        </div>
        <div className="card w-full rounded-md border bg-white">
          <div className="card-body px-[20px] py-4">
            <div className="flex flex-col gap-4">
              {/* Email */}
              <label className="form-control w-full max-w-xs">
                <div className="label px-0 pt-0">
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
              <label className="form-control mb-[15px] w-full max-w-xs">
                <div className="label px-0 pt-0">
                  <span className="label-text font-bold">Password</span>
                  <button className="label-text-alt text-[#2F81F7]">
                    Forget password?
                  </button>
                </div>
                <input
                  type="password"
                  placeholder=""
                  className="input input-sm input-bordered w-full max-w-xs rounded-md bg-[#F5F5F5]"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </label>
            </div>

            {/* Login button */}
            <button
              className="btn btn-neutral btn-sm rounded-md"
              onClick={handleClick}
            >
              Log in
            </button>
          </div>
        </div>
        {/* Sign up */}
        <div className="card w-full rounded-md border bg-white">
          <div className="card-body py-[20px]">
            <span className="flex justify-center gap-2">
              Don't have account?{" "}
              <button className="text-[#2F81F7]">Sign up</button>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
