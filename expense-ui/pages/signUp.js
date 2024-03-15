import { useState } from "react";
import axios from "axios";
import { LogoSVG } from "@/components/image/LogoSVG";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState("");

  const validateForm = () => {
    const { username, email, password, rePassword } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username || !email || !password || !rePassword) {
      setError("All fields are required");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }

    if (password !== rePassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUpUser = () => {
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    axios
      .post(`http://localhost:3000/users/signUp`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        if (response.data && response.data.message) {
          setFormData({
            username: "",
            email: "",
            password: "",
            rePassword: "",
          });
        }
      })
      .catch((error) => {
        setError("Error creating user: " + error.message);
      });
  };

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
              {/* Username */}
              <label className="form-control gap-1">
                <span className="label-text font-bold">Username</span>
                <input
                  type="text"
                  name="username"
                  className="input input-sm input-bordered rounded-md bg-[#F5F5F5]"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
              {/* Email */}
              <label className="form-control gap-1">
                <span className="label-text font-bold">Email</span>
                <input
                  type="email"
                  name="email"
                  className="input input-sm input-bordered rounded-md bg-[#F5F5F5]"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              {/* Password */}
              <label className="form-control gap-1">
                <span className="label-text font-bold">Password</span>
                <input
                  type="password"
                  name="password"
                  className="input input-sm input-bordered rounded-md bg-[#F5F5F5]"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
              {/* Confirm Password */}
              <label className="form-control gap-1">
                <span className="label-text font-bold">Confirm Password</span>
                <input
                  type="password"
                  name="rePassword"
                  className="input input-sm input-bordered rounded-md bg-[#F5F5F5]"
                  value={formData.rePassword}
                  onChange={handleChange}
                />
              </label>
              {/* Error message */}
              {error && (
                <p className="text-center text-sm text-red-500">{error}</p>
              )}
            </div>
            {/* Sign up button */}
            <button
              className="btn btn-neutral btn-sm mt-2 rounded-md text-white"
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
              Already have an account?
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
