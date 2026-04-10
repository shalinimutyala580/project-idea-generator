import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import "./Auth.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      {/* Background Video element representing the immersive theme */}
      <video className="auth-video-bg" autoPlay muted loop playsInline>
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="auth-overlay"></div>
      
      <div className="auth-glass-panel">
        
        {/* Left Side: Premium Presentation */}
        <div className="auth-presentation">
          <h1 className="auth-title">DevAIchemy</h1>
          <p className="auth-subtitle">Transform ideas into impactful solutions with clarity, confidence, and creativity.</p>
          
          <div className="auth-features">
            <div className="auth-feature-item">
              <div className="auth-feature-icon">🚀</div>
              <div className="auth-feature-text">
                <h4>AI Project Alchemist</h4>
                <p>Generate highly structured project roadmaps instantly.</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">💎</div>
              <div className="auth-feature-text">
                <h4>Gamified Mastery</h4>
                <p>Earn XP, level up, and unlock Soul-Bound Certificates.</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">🩺</div>
              <div className="auth-feature-text">
                <h4>Project Health Analyzer</h4>
                <p>Real-time insights to optimize code quality & performance.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Sign In Form */}
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>Access the Nexus</h2>
            <p>Enter your credentials to continue your journey</p>
          </div>

          <form onSubmit={handleSignIn}>
            {error && <div className="auth-error-msg">⚠️ {error}</div>}

            <div className="auth-input-group">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            
            <div className="auth-input-group">
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            
            <button type="submit" disabled={loading} className="auth-submit-btn">
              {loading ? <Loader text="" /> : "Sign In ✨"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account yet? <br/>
              <Link to="/" className="auth-link">Start your AI journey for free.</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
