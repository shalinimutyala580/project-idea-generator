import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext"; // You'll create this next

const SkillInput = () => {
  const navigate = useNavigate();
  const { setQuizData } = useQuiz();

  const handleContinue = (e) => {
    e.preventDefault();
    const skill = e.target.skill.value;
    if(!skill) return alert("Enter a skill!");
    setQuizData(prev => ({ ...prev, skill }));
    navigate("/select-level");
  };

  return (
    <div className="home-container">
      <div className="overlay" />
      <div className="glass-card" style={{zIndex: 1, maxWidth: '500px'}}>
        <h2>Enter Your Skill</h2>
        <form onSubmit={handleContinue}>
          <input name="skill" className="input-field" placeholder="e.g. Python, React..." />
          <button type="submit" className="btn-primary">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default SkillInput;