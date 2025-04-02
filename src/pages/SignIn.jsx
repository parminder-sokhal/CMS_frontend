import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/reducers/userSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Importing eye icons

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("please fill out this fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-700 ring-offset-pink-500 rounded-lg text-white">
              Parminder-sokhal
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-3 rtl:space-x-reverse py-5">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/images/techtimes.png" className="h-16" alt="Logo" />
            </a>
            <div className="text-lg font-bold text-blue-700">
              Techtimes.co.in
            </div>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
                style={{ backgroundColor: 'white', color: 'black' }} // Set background to white and text color to black
              />
            </div>
            <div>
              <Label value="Your password" />
              <div className="relative">
                <TextInput
                  type={passwordVisible ? "text" : "password"} // Toggle password visibility
                  placeholder="********"
                  id="password"
                  onChange={handleChange}
                  style={{ backgroundColor: 'white',color:'black' }} // Set background to white
                />
                <span
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility on click
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {passwordVisible ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </span>
              </div>
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't Have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          <div className="text-sm mt-2 text-blue-500">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
