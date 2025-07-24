import React, { useEffect, useRef, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import toast, { Toaster } from 'react-hot-toast';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [forgotFlow, setForgotFlow] = useState(false);
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const otpRefs = useRef([]);

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
    // Simulate OTP validation
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

  return (
    <div className='LoginPopup'>
      <Toaster />
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{forgotFlow ? "Reset Password" : currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>

        <div className="login-popup-inputs">
          {!forgotFlow && currState !== "Login" && (
            <input type="text" placeholder="Your Name" required />
          )}

          {!forgotFlow && (
            <>
              <input type="email" placeholder="Your Email" required />
              <input type="password" placeholder="Your Password" required />
              <button type="submit">{currState === 'Sign Up' ? "Create Account" : "Login"}</button>
              {!forgotFlow && currState === "Login" && (
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
