import { useState } from "react";
import { BiSolidHide } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";

export function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function SignUpSubmit() {
    if (!username || !email || !password || !rePassword) {
      alert("All fields are required");
      return;
    }

    if (password !== rePassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      alert("Invalid email format");
      return;
    }

    try {
      setIsLoading(true);
      console.log({ username, email, password });
      await Mutator("users/signUp", { username, email, password });
      alert("Success Sign Up. Now Login");
      window.location.href = "/login";
    } catch (error) {
      alert("Error signing up: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="card w-full rounded-md border bg-white">
        <div className="card-body px-[20px] py-4">
          <div className="flex flex-col gap-3">
            {/* Username */}
            <label className="form-control gap-1">
              <span className="label-text font-bold">Username</span>
              <input
                type="text"
                name="username"
                className="input input-sm input-bordered rounded-md bg-[#F5F5F5]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-label="Username"
              />
            </label>
            {/* Email */}
            <label className="form-control gap-1">
              <span className="label-text font-bold">Email</span>
              <input
                type="email"
                name="email"
                className="input input-sm input-bordered rounded-md bg-[#F5F5F5]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
              />
            </label>
            {/* Password */}
            <label className="form-control gap-1">
              <span className="label-text font-bold">Password</span>
              <div className="relative w-full max-w-xs">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  className="input input-sm input-bordered w-full rounded-md bg-[#F5F5F5] pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Password"
                />
                <button
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                  type="button"
                  aria-label={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                >
                  {passwordVisible ? (
                    <RxEyeOpen size={15} />
                  ) : (
                    <BiSolidHide size={15} />
                  )}
                </button>
              </div>
            </label>
            {/* Confirm Password */}
            <label className="form-control gap-1">
              <span className="label-text font-bold">Confirm Password</span>
              <div className="relative w-full max-w-xs">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="rePassword"
                  className="input input-sm input-bordered w-full rounded-md bg-[#F5F5F5] pr-10"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  aria-label="Confirm Password"
                />
                <button
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                  type="button"
                  aria-label={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                >
                  {passwordVisible ? (
                    <RxEyeOpen size={15} />
                  ) : (
                    <BiSolidHide size={15} />
                  )}
                </button>
              </div>
            </label>
          </div>
          {/* Sign up button */}
          <button
            onClick={SignUpSubmit}
            className="btn btn-neutral btn-sm mt-2 rounded-md text-white"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign up"}
          </button>
        </div>
      </div>
      {/* Login */}
      <div className="card w-full rounded-md border bg-white">
        <div className="card-body py-[20px]">
          <span className="flex justify-center gap-2">
            Already have an account?
            <a href="http://localhost:3001/login">
              <button className="text-[#2F81F7]">Log in</button>
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
