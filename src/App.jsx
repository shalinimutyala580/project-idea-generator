import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { GamificationProvider } from "./features/gemification/XPSystem";
import GhostCoder from "./components/GhostAssistant/GhostCoder";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/animations.css";
import "./index.css";
import "./styles/theme.css";

// Pages
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import Home from "./pages/home";
import Projects from "./pages/Projects/Projects";
import SavedIdeas from "./pages/SavedIdeas";
import QuizHome from "./pages/Quiz/QuizHome";
import QuizPlay from "./pages/Quiz/QuizPlay";
import Resume from "./pages/Resume/Resume";
import Courses from "./pages/Courses/Courses";
import LearningModule from "./pages/LearningModule";
import Profile from "./pages/Profile";
import CodeSandbox from "./pages/Sandbox/CodeSandbox";
import Interview from "./pages/Interview/Interview";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  const { user, loading } = useAuth();
  
  if (loading) return null; // Let the provider handle the loading UI if we want, or just wait.

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!user ? <SignUp /> : <Navigate to="/home" />} />
        <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/home" />} />

        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/saved-ideas" element={<ProtectedRoute><SavedIdeas /></ProtectedRoute>} />
        <Route path="/sandbox" element={<ProtectedRoute><CodeSandbox /></ProtectedRoute>} />
        
        <Route path="/quiz" element={<ProtectedRoute><QuizHome /></ProtectedRoute>} />
        <Route path="/quiz/:level" element={<ProtectedRoute><QuizPlay /></ProtectedRoute>} />
        <Route path="/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
        <Route path="/learning" element={<ProtectedRoute><LearningModule /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/interview" element={<ProtectedRoute><Interview /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <GamificationProvider>
        <AppRoutes />
        <GhostCoder />
      </GamificationProvider>
    </AuthProvider>
  );
}

export default App;
