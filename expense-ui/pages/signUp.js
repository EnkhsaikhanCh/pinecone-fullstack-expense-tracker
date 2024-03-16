import { useState } from "react";
import axios from "axios";
import { LogoSVG } from "@/components/image/LogoSVG";
import { BiSolidHide } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateForm = () => {
    const { username, email, password, rePassword } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate required fields
    if (!username || !email || !password || !rePassword) {
      setError("All fields are required");
      return false;
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Validate password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }

    // Validate password match
    if (password !== rePassword) {
      setError("Passwords do not match");
      return false;
    }

    // If all validations pass
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUpUser = () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError("");

    axios
      .post(`http://localhost:3000/users/signUp`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then(() => {
        setFormData({
          username: "",
          email: "",
          password: "",
          rePassword: "",
        });
        setError("");
      })
      .catch((error) => {
        let errorMessage = "Something went wrong. Please try again";
        if (error.response && error.response.data) {
          errorMessage =
            error.response.data.error || error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        setError(errorMessage);
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
                <div className="relative w-full max-w-xs">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    className="input input-sm input-bordered w-full rounded-md bg-[#F5F5F5] pr-10"
                    value={formData.password}
                    onChange={handleChange}
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
              {/* Confirm Password */}
              <label className="form-control gap-1">
                <span className="label-text font-bold">Confirm Password</span>
                <div className="relative w-full max-w-xs">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="rePassword"
                    className="input input-sm input-bordered w-full rounded-md bg-[#F5F5F5] pr-10"
                    value={formData.rePassword}
                    onChange={handleChange}
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
