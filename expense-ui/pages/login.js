import { LogoSVG } from "@/components/image/LogoSVG";
import { useState } from "react";
import axios from "axios";
import { BiSolidHide } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";
import { Mutator } from "./util";

export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleClick() {
    const accessToken = await Mutator("users/login", {
      username,
      email,
      password,
    });
    console.log({ accessToken });
    localStorage.setItem("accessToken", accessToken);
    window.location = "/";

    // if (!username || !email || !password) {
    //   setError("All fields are required");
    //   return;
    // }

    // axios
    //   .post("http://localhost:3000/users/login", {
    //     username,
    //     email,
    //     password,
    //   })
    //   .then(() => {
    //     localStorage.setItem("login", `${email}:${password}`);
    //     window.location = "/";
    //   })
    //   .catch((error) => {
    //     console.error("Error occurred:", error);
    //     if (
    //       error.response &&
    //       error.response.data &&
    //       error.response.data.message
    //     ) {
    //       setError(error.response.data.message);
    //     } else {
    //       setError("Oops... Please try again later.");
    //     }
    //   });
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
            Welcome back
          </h1>
        </div>
        <div className="card w-full rounded-md border bg-white">
          <div className="card-body px-[20px] py-4">
            <div className="flex flex-col gap-3">
              {/* Username */}
              <label className="form-control gap-1">
                <span className="label-text font-bold">Username</span>
                <input
                  type="text"
                  placeholder=""
                  className="input input-sm input-bordered w-full max-w-xs rounded-md bg-[#F5F5F5]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              {/* Email */}
              <label className="form-control gap-1">
                <span className="label-text font-bold">Email</span>
                <input
                  type="email"
                  placeholder=""
                  className="input input-sm input-bordered w-full max-w-xs rounded-md bg-[#F5F5F5]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              {/* Password */}
              <label className="form-control gap-1">
                <div className="label p-0">
                  <span className="label-text font-bold">Password</span>
                  <button className="label-text-alt text-[#2F81F7]">
                    Forget password?
                  </button>
                </div>
                <div className="relative w-full max-w-xs">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="input input-sm input-bordered w-full rounded-md bg-[#F5F5F5] pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                    type="button"
                  >
                    {passwordVisible ? (
                      <RxEyeOpen size={15} />
                    ) : (
                      <BiSolidHide size={15} />
                    )}
                  </button>
                </div>
              </label>
              {/* Error message */}
              {error && (
                <p className="text-center text-sm text-red-500">{error}</p>
              )}
            </div>
            {/* Login button */}
            <button
              className="btn btn-neutral btn-sm mt-2 rounded-md text-white"
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
              Don't have account?
              <a href="http://localhost:3001/signUp">
                <button className="text-[#2F81F7]">Sign up</button>
              </a>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
