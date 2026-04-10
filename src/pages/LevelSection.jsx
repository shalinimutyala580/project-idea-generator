import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const LevelSelection = () => {
  const navigate = useNavigate();
  const { quizData, setQuizData } = useQuiz();

  const levels = ["Beginner", "Intermediate", "Advanced"];

  const handleSelect = (lvl) => {
    setQuizData((prev) => ({ ...prev, level: lvl }));
    navigate("/quiz");
  };

  return (
    <div className="home-container">
      <div className="overlay" />
      <div style={{ zIndex: 1, textAlign: 'center' }}>
        <h1>Select Difficulty for {quizData.skill}</h1>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          {levels.map((l) => (
            <div key={l} className="glass-card" onClick={() => handleSelect(l)} style={{ cursor: "pointer" }}>
              <h3>{l}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelection;