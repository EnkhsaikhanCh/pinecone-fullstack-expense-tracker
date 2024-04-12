import { useState } from "react";
import axios from "axios";
import { LogoSVG } from "@/components/image/LogoSVG";
import { BiSolidHide } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";
import { Mutator } from "./util";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
      global: "",
    }));

    setFormErrors((currentFormErrors) => {
      const newErrors = { ...currentFormErrors, [name]: "" };

      if (name === "username" && !value) {
        newErrors.username = "Username is required";
      } else if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email address";
        }
      } else if (name === "password") {
        if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        }
      } else if (name === "rePassword") {
        if (value !== formData.password) {
          newErrors.rePassword = "Passwords do not match";
        }
      }

      return newErrors;
    });
  };

  const canSubmit = () => {
    return (
      Object.values(formErrors).every((val) => val === "") &&
      Object.values(formData).every((val) => val)
    );
  };

  const signUpUser = async (e) => {
    e.preventDefault();
    if (canSubmit()) {
      setIsLoading(true);
      try {
        await Mutator("users/signUp", {
          username,
          email,
          password,
        });

        // await axios.post("http://localhost:3000/users/signUp", formData);
        alert("Sign up successful!");
        setFormData({
          username: "",
          email: "",
          password: "",
          rePassword: "",
        });
        setFormErrors({});
      } catch (error) {
        let errorMessage = "Something went wrong. Please try again";

        if (error.response && error.response.status === 400) {
          errorMessage =
            error.response.data.message || "Username or email already exists.";
        } else if (error.message) {
          errorMessage = error.message;
        }

        setFormErrors({ ...formErrors, global: errorMessage });
      } finally {
        setIsLoading(false);
      }
    } else {
      setFormErrors({
        ...formErrors,
        global: "Please correct the errors before submitting.",
      });
    }
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
                {formErrors.username && (
                  <p className="text-sm text-red-500">{formErrors.username}</p>
                )}
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
                {formErrors.email && (
                  <p className="text-sm text-red-500">{formErrors.email}</p>
                )}
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
                {formErrors.password && (
                  <p className="text-sm text-red-500">{formErrors.password}</p>
                )}
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
                {formErrors.rePassword && (
                  <p className="text-sm text-red-500">
                    {formErrors.rePassword}
                  </p>
                )}
              </label>
            </div>
            {/* Sign up button */}
            <button
              className="btn btn-neutral btn-sm mt-2 rounded-md text-white"
              onClick={signUpUser}
              disabled={isLoading || !canSubmit()}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
            {formErrors.global && (
              <p className="text-center text-red-500">{formErrors.global}</p>
            )}
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
