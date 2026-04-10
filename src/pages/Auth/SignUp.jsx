import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import "./Auth.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
          <p className="auth-subtitle">Empowering developers to transform ideas into impactful solutions with clarity, confidence, and creativity.</p>
          
          <div className="auth-features">
            <div className="auth-feature-item">
              <div className="auth-feature-icon">🧠</div>
              <div className="auth-feature-text">
                <h4>Intelligent Ecosystem</h4>
                <p>AI assistants to generate code, documentation, and debug errors.</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">🔥</div>
              <div className="auth-feature-text">
                <h4>Dev-Duel Arena</h4>
                <p>Rapid coding challenges to sharpen your skills instantly.</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">🔮</div>
              <div className="auth-feature-text">
                <h4>Interview Oracle</h4>
                <p>Explore technical questions and expert-level feedback mechanisms.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>Start Building</h2>
            <p>Create an account to unlock all AI tools</p>
          </div>

          <form onSubmit={handleSignUp}>
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
                placeholder="Password (min 6 chars)" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            
            <button type="submit" disabled={loading} className="auth-submit-btn">
              {loading ? <Loader text="" /> : "Forge Account ⚡"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already an alchemist? <br/>
              <Link to="/signin" className="auth-link">Sign in to your dashboard.</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
