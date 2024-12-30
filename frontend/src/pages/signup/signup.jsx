import { Link } from "react-router-dom";
import GenderCheckbox from "./gendercheckbox";
import { useState } from "react";
import useSignup from "../../hooks/usesignup.js";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      await signup(inputs);
   
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm p-6 rounded-lg shadow-md bg-gray-800 bg-opacity-90">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500">Chat App</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="label" htmlFor="fullName">
              <span className="text-base label-text text-gray-200">Full Name</span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}

            />
          </div>

          <div>
            <label className="label" htmlFor="username">
              <span className="text-base label-text text-gray-200">Username</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}

            />
          </div>

          <div>
            <label className="label" htmlFor="password">
              <span className="text-base label-text text-gray-200">Password</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              required
              aria-label="Password"
            />
          </div>

          <div>
            <label className="label" htmlFor="confirmpassword">
              <span className="text-base label-text text-gray-200">Confirm Password</span>
            </label>
            <input
              id="confirmpassword"
              type="password"
              placeholder="Re-enter your password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmpassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmpassword: e.target.value })
              }
              required
              aria-label="Confirm Password"
            />
          </div>

          <GenderCheckbox
            oncheckboxchange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link
            to="/login"
            className="text-sm hover:underline text-blue-400 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
