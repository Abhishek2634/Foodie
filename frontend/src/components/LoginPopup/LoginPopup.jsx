import React, { useState, useEffect, useRef } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import apiRequest from "../../lib/apiRequest";


const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [forgotFlow, setForgotFlow] = useState(false);
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate=useNavigate();

  const popupRef = useRef();
  const otpRefs = useRef([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLogin(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setShowLogin(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [setShowLogin]);

  useEffect(() => {
    let interval;
    if (stage === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stage, timer]);

  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Enter email");
    toast.success("OTP sent to your email");
    setStage(2);
    setTimer(60);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp.join("").length !== 6) return toast.error("Enter 6-digit OTP");
    toast.success("OTP verified");
    setStage(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");
      toast.success("Password reset successfully!");
      setForgotFlow(false);
      setStage(1);
      setOtp(Array(6).fill(""));
      setCurrState("Login");
    };
    const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password || (currState === "Sign Up" && !name)) {
      return toast.error("Please fill all fields");
    }

    const endpoint =
      currState === "Sign Up" ? "/api/auth/register" : "/api/auth/login";

    try {
      const { data } = await apiRequest.post(endpoint, { name, email, password });

      toast.success(`${currState} successful!`);

      // Store user info locally (no token)
      localStorage.setItem("user", JSON.stringify(data.user));

      setShowLogin(false);
      window.location.reload();
    } catch (err) {
      const message =
        err.response?.data?.message || `${currState} failed. Please try again.`;
      toast.error(message);
      console.error(err);
    }
  };



  return (
    <div className='LoginPopup'>
      <Toaster />
      <form ref={popupRef} className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{forgotFlow ? "Reset Password" : currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>

        <div className="login-popup-inputs">
          {!forgotFlow && currState !== "Login" && (
            <input type="text" name="name" placeholder="Your Name" required />
          )}

          {!forgotFlow && (
            <>
              <input type="email" name="email" placeholder="Your Email" required />
              <input type="password" name="password" placeholder="Your Password" required />
              <button type="submit">{currState === 'Sign Up' ? "Create Account" : "Login"}</button>
              {currState === "Login" && (
                <p className="forgot-password-link" onClick={() => {
                  setForgotFlow(true);
                  setStage(1);
                }}>
                  Forgot Password?
                </p>
              )}
            </>
          )}

          {forgotFlow && stage === 1 && (
            <>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button onClick={handleSendOTP}>Send OTP</button>
            </>
          )}

          {forgotFlow && stage === 2 && (
            <>
              <div className="otp-container">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    ref={(el) => otpRefs.current[i] = el}
                    onChange={(e) => handleOTPChange(e, i)}
                  />
                ))}
              </div>
              <button onClick={handleVerifyOTP}>Verify OTP</button>
              <button
                type="button"
                disabled={timer > 0}
                className={`resend-otp-btn ${timer > 0 ? 'disabled' : ''}`}
                onClick={() => {
                  setTimer(60);
                  toast.success("OTP resent!");
                }}
              >
                Resend OTP {timer > 0 ? `(${timer}s)` : ""}
              </button>
            </>
          )}

          {forgotFlow && stage === 3 && (
            <>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button onClick={handleResetPassword}>Reset Password</button>
            </>
          )}
        </div>

        {!forgotFlow && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}

        {!forgotFlow && (
          currState === "Login" ? (
            <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
          )
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
