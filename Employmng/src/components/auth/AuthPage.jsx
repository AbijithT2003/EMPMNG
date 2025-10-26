import { useState } from "react";
import "./AuthPage.css";

const AuthPage = ({ onLogin }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isReset, setIsReset] = useState(false);

  if (isReset) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Reset Password</h2>
          <p>Enter your email to receive reset instructions</p>
          <input type="email" placeholder="Email address" />
          <button>Send Reset Link</button>
          <button className="link-btn" onClick={() => setIsReset(false)}>
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isSignIn ? "Welcome Back" : "Create Account"}</h2>
        <p>
          {isSignIn
            ? "Sign in to continue"
            : "Fill in your details to get started"}
        </p>
        {!isSignIn && <input type="text" placeholder="Full Name" />}
        <input type="email" placeholder="Email address" />
        <input type="password" placeholder="Password" />
        <button onClick={onLogin}>{isSignIn ? "Sign In" : "Sign Up"}</button>
        <p>
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <button className="link-btn" onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
