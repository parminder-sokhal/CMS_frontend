import {
  Alert,
  Button,
  Label,
  Spinner,
  TextInput,
  Checkbox,
} from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginUser } from "../redux/actions/authAction";
import { useEffect } from "react";


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [rememberPassword, setRememberPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { loading, error } = useSelector((state) => state.auth); // using auth slice
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);


  useEffect(() => {
    const token = localStorage.getItem("Bearer");
    if (token || isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return alert("Please fill out all fields");
    }

    const loginData = {
      ...formData,
      rememberPassword,
    };

    dispatch(loginUser(loginData)).then((res) => {
      const token = localStorage.getItem("Bearer");
      if (token) {
        navigate("/"); 
      }
    });
  };

  return (
    <div className="flex items-center justify-center py-20 ">
      <div className="w-full max-w-md bg-whitep-6 ">
        <div className="flex items-center  space-x-3 rtl:space-x-reverse py-5 justify-start">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/images/techtimes.png" className="h-16" alt="Logo" />
          </a>
          <div className="text-lg font-bold text-blue-700">Techtimes.co.in</div>
        </div>
  
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label value="Your email" />
            <TextInput
              type="email"
              placeholder="name@company.com"
              id="email"
              onChange={handleChange}
              style={{ backgroundColor: "white", color: "black" }}
            />
          </div>
  
          <div>
            <Label value="Your password" />
            <div className="relative">
              <TextInput
                type={passwordVisible ? "text" : "password"}
                placeholder="********"
                id="password"
                onChange={handleChange}
                style={{ backgroundColor: "white", color: "black" }}
              />
              <span
                onClick={() => setPasswordVisible(!passwordVisible)}
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
  
          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberPassword"
              checked={rememberPassword}
              onChange={() => setRememberPassword(!rememberPassword)}
              style={{ backgroundColor: "white", color: "black" }}

            />
            <Label htmlFor="rememberPassword">Remember Me</Label>
          </div>
  
          <Button
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
  
        <div className="flex gap-2 text-sm mt-5 justify-center">
          <span>Don't Have an account?</span>
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </div>
  
        <div className="text-sm mt-2 text-center text-blue-500">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
  
        {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
  
}
