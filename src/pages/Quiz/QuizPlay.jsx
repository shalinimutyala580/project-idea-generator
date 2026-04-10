import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { quizData } from "../../data/quizData";
import Loader from "../../components/Loader";
import Certificate from "../../components/Certificate";

const QuizPlay = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const skill = searchParams.get("skill") || "Programming";
  const questions = quizData[level] || quizData["Beginner"];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    if (!questions) navigate("/quiz");
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [level, questions, navigate]);

  const saveQuizResult = (finalScore) => {
    const passed = finalScore / questions.length >= 0.6;
    const record = {
      skill,
      level,
      score: finalScore,
      total: questions.length,
      passed,
      date: new Date().toISOString(),
    };
    const quizRecords = JSON.parse(localStorage.getItem("devaichemy_quiz_records")) || [];
    localStorage.setItem("devaichemy_quiz_records", JSON.stringify([record, ...quizRecords]));
  };

  const handleAnswer = (optionIdx) => {
    const nextScore = optionIdx === questions[currentIdx].a ? score + 1 : score;
    if (currentIdx + 1 < questions.length) {
      setScore(nextScore);
      setCurrentIdx(currentIdx + 1);
    } else {
      setScore(nextScore);
      saveQuizResult(nextScore);
      setFinished(true);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <Navbar />
        <div style={{ marginTop: '20vh', display: 'flex', justifyContent: 'center' }}>
          <Loader text={`Loading ${level} challenges for ${skill}...`} />
        </div>
      </div>
    );
  }

  const passed = score / questions.length >= 0.6;

  if (showCertificate) {
    return <Certificate score={score} total={questions.length} skill={skill} level={level} onClose={() => setShowCertificate(false)} />;
  }

  return (
    <div className="app-container">
      <div className="bg-mesh"></div>
      <Navbar />

      <main style={{ padding: '2rem', maxWidth: '840px', margin: '0 auto', textAlign: 'center' }} className="animate-fade-in">
        {!finished ? (
          <div className="glass-panel" style={{ padding: '36px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--primary-purple)', fontSize: '0.9rem', fontWeight: '700' }}>
                Question {currentIdx + 1} / {questions.length}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>{skill} • {level}</span>
            </div>
            <h2 style={{ fontSize: '2rem', margin: '24px 0 32px' }}>{questions[currentIdx].q}</h2>

            <div style={{ display: 'grid', gap: '16px' }}>
              {questions[currentIdx].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="quiz-option"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass-panel pulse-glow" style={{ padding: '40px', borderTop: passed ? '4px solid #10b981' : '4px solid #ef4444' }}>
            <h2>{passed ? 'Quest Complete' : 'Quest Review'}</h2>
            <p style={{ fontSize: '1.2rem', margin: '24px 0' }}>
              You scored <strong style={{ color: passed ? '#10b981' : '#ef4444' }}>{score}/{questions.length}</strong>
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
              {passed ? 'Great work! You passed this round and unlocked your next milestone.' : 'Review the material and try again to unlock the next level.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/quiz')}
                className="btn-outline"
                style={{ padding: '12px 24px' }}
              >
                Back to Quests
              </button>
              {passed && (
                <button
                  onClick={() => setShowCertificate(true)}
                  className="btn-premium"
                  style={{ padding: '12px 24px' }}
                >
                  View Certificate
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizPlay;
