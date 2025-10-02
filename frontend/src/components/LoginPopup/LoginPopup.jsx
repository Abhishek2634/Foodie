// LoginPopup.jsx
import React, { useState, useEffect, useRef } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import apiRequest from "../../lib/apiRequest";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const LoginPopup = ({ setShowLogin, setIsLoggedIn }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [forgotFlow, setForgotFlow] = useState(false);
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [showPasswordChecker, setShowPasswordChecker] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

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

  // Password strength check
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

  // Check if passwords match
  useEffect(() => {
    setPasswordMatch(password === signUpConfirmPassword && signUpConfirmPassword !== '');
  }, [password, signUpConfirmPassword]);

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
      const response = await apiRequest.post(endpoint, { name, email, password });
      const data = response.data;

      if (data.success) {
        toast.success(data.message);

        // Store user info and auth token locally
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        } else {
          localStorage.setItem("authToken", "authenticated"); // fallback
        }

        // Update authentication state in parent component
        if (setIsLoggedIn) {
          setIsLoggedIn(true);
        }

        setShowLogin(false);

        // Navigate to home page
        navigate("/");
        window.location.reload();
      } else {
        toast.error(data.message || `${currState} failed. Please try again.`);
      }
    } catch (err) {
      const message = err.response?.data?.message || `${currState} failed. Please try again.`;
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
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => {
                      setPasswordFocused(true);
                      setShowPasswordChecker(true);
                    }}
                    onBlur={() => {
                      setPasswordFocused(false);
                      if (!confirmFocused) setShowPasswordChecker(false);
                    }}
                    required
                  />
                  <span
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon size={20} color='white'/> : <EyeIcon size={20} color='white'/>}
                  </span>
                </div>
              )}

              {currState === "Sign Up" && (
                <div className="password-input-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    onFocus={() => {
                      setConfirmFocused(true);
                      setShowPasswordChecker(true);
                    }}
                    onBlur={() => {
                      setConfirmFocused(false);
                      if (!passwordFocused) setShowPasswordChecker(false);
                    }}
                    required
                  />
                  <span
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOffIcon size={20} color='white'/> : <EyeIcon size={20} color='white' />}
                  </span>
                </div>
              )}

              {currState === "Sign Up" && showPasswordChecker && (
                <div className="password-checker-box">
                  {passwordFocused && (
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
                  )}
                  {confirmFocused && signUpConfirmPassword && (
                    <div className="password-match-checker">
                      <p className={passwordMatch ? 'valid' : 'invalid'}>
                        {passwordMatch ? '✅ Passwords match' : '❌ Passwords do not match'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {currState === "Sign Up" && (
                <div className="login-popup-condition">
                  <input type="checkbox" required />
                  <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
              )}

              {currState === "Login" && (
                <div className="password-input-container">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    name="password"
                    placeholder="Your Password"
                    required
                  />
                  <span
                    className="password-toggle-btn"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                  >
                    {showLoginPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                  </span>
                </div>
              )}

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
          currState === "Login" ? (
            <p style={{ color: '#ddd' }}>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
          ) : (
            <p style={{ color: '#ddd' }}>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
          )
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
