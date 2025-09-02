import React, { useState, useEffect, useRef } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import toast, { Toaster } from 'react-hot-toast';

import { auth, provider, signInWithPopup } from "../../firebase";

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

  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const [showPasswordChecker, setShowPasswordChecker] = useState(false);

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
const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    toast.success(`Welcome ${user.displayName || "User"}!`);
    setShowLogin(false); // close popup after login
  } catch (error) {
    console.error(error);
    toast.error("Google Sign-In failed");
  }
};

  useEffect(() => {
    if (password) {
      const newStrength = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      };
      setPasswordStrength(newStrength);
    } else {
      setPasswordStrength({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
      });
    }
  }, [password]);

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
    const confirmPassword = formData.get("confirmPassword");

    if (!email || !password || (currState === "Sign Up" && !name)) {
        return toast.error("Please fill all fields");
      }

    if (currState === "Sign Up" && password !== confirmPassword) {
      return toast.error("Passwords do not match");
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
              {currState === "Sign Up" && (
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setShowPasswordChecker(true)}
                  required
                />
              )}
              {currState === "Sign Up" && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                />
              )}
              {currState === "Sign Up" && showPasswordChecker && (
                <div className="password-checker-box">
                  <div className="password-strength-checker">
                    <p className={passwordStrength.length ? 'valid' : 'invalid'}>
                      {passwordStrength.length ? '✔️' : '❌'} At least 8 characters long
                    </p>
                    <p className={passwordStrength.uppercase ? 'valid' : 'invalid'}>
                      {passwordStrength.uppercase ? '✔️' : '❌'} Contains at least one uppercase letter
                    </p>
                    <p className={passwordStrength.lowercase ? 'valid' : 'invalid'}>
                      {passwordStrength.lowercase ? '✔️' : '❌'} Contains at least one lowercase letter
                    </p>
                    <p className={passwordStrength.number ? 'valid' : 'invalid'}>
                      {passwordStrength.number ? '✔️' : '❌'} Contains at least one number
                    </p>
                    <p className={passwordStrength.special ? 'valid' : 'invalid'}>
                      {passwordStrength.special ? '✔️' : '❌'} Contains at least one special character
                    </p>
                  </div>
                </div>
              )}

              {currState === "Sign Up" && (
                <div className="login-popup-condition">
                  <input type="checkbox" required />
                  <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
              )}

              {currState === "Login" && (
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  required
                />
              )}
              <button type="submit">{currState === 'Sign Up' ? "Create Account" : "Login"}</button>
              {!forgotFlow && (
  <div className="google-login">
    <button type="button" onClick={handleGoogleSignIn} className="google-btn">
      <img src="data:image/jpeg;base64,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" alt="Google" height="20px" /> Continue with Google
    </button>
  </div>
)}

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
