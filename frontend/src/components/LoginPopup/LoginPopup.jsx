import React, { useState, useEffect, useRef } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import apiRequest from "../../lib/apiRequest";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const LoginPopup = ({ setShowLogin, setIsLoggedIn, setUser, setSuccessMessage }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [forgotFlow, setForgotFlow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const popupRef = useRef();
  const navigate = useNavigate();

  // Close popup on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => popupRef.current && !popupRef.current.contains(e.target) && setShowLogin(false);
    const handleEscape = (e) => e.key === 'Escape' && setShowLogin(false);

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setShowLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { email, password };
    if (currState === "Sign Up") {
      payload.name = e.target.name.value;
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }
    }

    const endpoint = currState === "Sign Up" ? "/api/auth/register" : "/api/auth/login";

    try {
      const res = await apiRequest.post(endpoint, payload, { withCredentials: true });
      if (res.data.success) {
        setIsLoggedIn(true);
        setUser(res.data.user);
        setShowLogin(false);

        // Trigger SuccessPopup in App
        setSuccessMessage(res.data.message);
        
      } else {
        toast.error(res.data.message || `${currState} failed`);
      }
    } catch (err) {
      console.error("Error response:", err.response?.data || err);
      toast.error(err.response?.data?.message || `${currState} failed`);
    } finally {
      setLoading(false);
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
          {!forgotFlow && currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          {!forgotFlow && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {currState === "Sign Up" ? (
                <>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                    </span>
                  </div>

                  <div className="password-input-container">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <span className="password-toggle-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                    </span>
                  </div>
                </>
              ) : (
                <div className="password-input-container">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="password-toggle-btn" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                    {showLoginPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                  </span>
                </div>
              )}

              <button type="submit">{loading ? "Processing..." : currState === 'Sign Up' ? "Create Account" : "Login"}</button>

              {currState === "Login" && (
                <p className="forgot-password-link" onClick={() => setForgotFlow(true)}>Forgot Password?</p>
              )}
            </>
          )}

          {!forgotFlow && (
            currState === "Login" ? (
              <p style={{ color: '#ddd' }}>Create a new account? <span onClick={() => { setCurrState("Sign Up"); setPassword(""); setConfirmPassword(""); }}>Click Here</span></p>
            ) : (
              <p style={{ color: '#ddd' }}>Already have an account? <span onClick={() => { setCurrState("Login"); setPassword(""); setConfirmPassword(""); }}>Login Here</span></p>
            )
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
