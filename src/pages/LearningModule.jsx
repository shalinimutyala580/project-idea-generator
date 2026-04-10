import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";

const learningPaths = {
  HTML: {
    description: "Build polished, accessible web experiences with structured HTML foundations.",
    related: ["CSS", "Web Accessibility", "UI Design"],
    levels: [
      {
        level: "Beginner",
        topics: [
          { id: "html-b-1", title: "HTML Structure", description: "Understand semantic tags and page architecture.", time: "15 min", example: "<header>...</header>", resource: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
          { id: "html-b-2", title: "Forms & Inputs", description: "Create accessible forms and input groups.", time: "20 min", example: "<form><input type=\"email\"/></form>", resource: "https://web.dev/forms/" },
          { id: "html-b-3", title: "Media Elements", description: "Embed images, video and audio cleanly.", time: "18 min", example: "<video src=\"demo.mp4\"></video>", resource: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element" },
        ],
        quiz: [
          { q: "Which tag defines the navigation section?", options: ["<nav>", "<section>", "<article>", "<main>"], a: 0 },
          { q: "What attribute is required for <img>?", options: ["src", "href", "alt", "title"], a: 0 },
          { q: "How should you group related form controls?", options: ["<article>", "<fieldset>", "<div>", "<aside>"], a: 1 },
          { q: "Which tag is best for page footer content?", options: ["<footer>", "<header>", "<span>", "<section>"], a: 0 },
          { q: "Which is a semantic text-level tag?", options: ["<section>", "<b>", "<div>", "<layout>"], a: 0 },
        ],
      },
      {
        level: "Intermediate",
        topics: [
          { id: "html-i-1", title: "Responsive Layout", description: "Use fluid containers and accessible structure.", time: "25 min", example: "<section class=\"grid\">...</section>", resource: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout" },
          { id: "html-i-2", title: "SEO & Metadata", description: "Add metadata, social previews, and structured data.", time: "20 min", example: "<meta name=\"description\" content=\"...\"/>", resource: "https://developers.google.com/search/docs" },
          { id: "html-i-3", title: "Accessible Navigation", description: "Build menus that work for keyboard and screen readers.", time: "22 min", example: "<nav aria-label=\"Main\">...</nav>", resource: "https://www.w3.org/WAI/tutorials/navigation/" },
        ],
        quiz: [
          { q: "What does ARIA help with?", options: ["Styling", "Accessibility", "Performance", "SEO"], a: 1 },
          { q: "Which tag is used for standalone content?", options: ["<article>", "<span>", "<b>", "<small>"], a: 0 },
          { q: "Best practice for SEO title?", options: ["<h1>", "<title>", "<header>", "<meta>"], a: 1 },
          { q: "The <main> tag should be used for?", options: ["Navigation", "Primary page content", "Sidebars", "Footers"], a: 1 },
          { q: "What attribute improves image accessibility?", options: ["data-alt", "aria-label", "alt", "role"], a: 2 },
        ],
      },
      {
        level: "Advanced",
        topics: [
          { id: "html-a-1", title: "Structured Markup", description: "Design reusable patterns with semantic sections.", time: "30 min", example: "<article><section>...</section></article>", resource: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics" },
          { id: "html-a-2", title: "Performance Hints", description: "Optimize preload, lazy loading and markup ordering.", time: "25 min", example: "<link rel=\"preload\" href=\"app.js\"/>", resource: "https://web.dev/fast/" },
          { id: "html-a-3", title: "Progressive Web App", description: "Prepare pages for offline-ready experiences.", time: "28 min", example: "<link rel=\"manifest\" href=\"/manifest.json\">", resource: "https://web.dev/progressive-web-apps/" },
        ],
        quiz: [
          { q: "Which tag is best for a self-contained composition?", options: ["<div>", "<article>", "<span>", "<aside>"], a: 1 },
          { q: "What does lazy loading help with?", options: ["Accessibility", "SEO", "Performance", "Security"], a: 2 },
          { q: "What is the purpose of <link rel=\"manifest\"?>", options: ["Load fonts", "Enable PWA", "Add CSS", "Share metadata"], a: 1 },
          { q: "Which HTML element is best for page landmarks?", options: ["<nav>", "<span>", "<footer>", "<header>"], a: 0 },
          { q: "A valid meta description helps with?", options: ["Loading speed", "Search snippets", "CSS style", "Browser support"], a: 1 },
        ],
      },
    ],
  },
  JavaScript: {
    description: "Master modern JavaScript and build intelligent front-end experiences.",
    related: ["React", "Node.js", "TypeScript"],
    levels: [
      {
        level: "Beginner",
        topics: [
          { id: "js-b-1", title: "JS Syntax", description: "Understand variables, functions, and basic control flow.", time: "20 min", example: "const x = 10; function greet() {}", resource: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
          { id: "js-b-2", title: "DOM Basics", description: "Select and update page elements with JavaScript.", time: "25 min", example: "document.querySelector(\"#app\").textContent = 'Hi'", resource: "https://developer.mozilla.org/en-US/docs/Web/API/Document" },
          { id: "js-b-3", title: "Events", description: "React to clicks, form inputs and animation triggers.", time: "18 min", example: "button.addEventListener('click', () => {})", resource: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" },
        ],
        quiz: [
          { q: "How do you declare a constant?", options: ["let", "const", "var", "static"], a: 1 },
          { q: "Which object represents the browser window?", options: ["document", "window", "navigator", "location"], a: 1 },
          { q: "What does JSON.stringify do?", options: ["Parse JSON", "Convert object to string", "Send request", "Update DOM"], a: 1 },
          { q: "Which method adds an item to the end of an array?", options: ["push", "pop", "slice", "shift"], a: 0 },
          { q: "What keyword creates a promise?", options: ["async", "await", "new Promise", "yield"], a: 2 },
        ],
      },
      {
        level: "Intermediate",
        topics: [
          { id: "js-i-1", title: "Async Patterns", description: "Work with promises, async/await and API calls.", time: "30 min", example: "const data = await fetch(url).then(r => r.json())", resource: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous" },
          { id: "js-i-2", title: "ES6 Modules", description: "Organize code with imports and exports.", time: "22 min", example: "import { fetchData } from './utils.js'", resource: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" },
          { id: "js-i-3", title: "State & Logic", description: "Manage application state with objects and arrays.", time: "24 min", example: "const profile = { name: 'Alex', skills: [] }", resource: "https://javascript.info/object" },
        ],
        quiz: [
          { q: "What does async/await simplify?", options: ["Styling", "Asynchronous code", "DOM events", "Routing"], a: 1 },
          { q: "Which statement imports a module?", options: ["require('./app')", "import app from './app'", "include './app'", "open './app'"], a: 1 },
          { q: "What value does typeof [] return?", options: ["array", "object", "list", "collection"], a: 1 },
          { q: "How do you catch errors in async code?", options: ["try/catch", "if/else", "switch", "for loop"], a: 0 },
          { q: "Which is a correct arrow function?", options: ["const x => {}", "const x = () => {}", "function => x {}", "let x = function => {}"], a: 1 },
        ],
      },
      {
        level: "Advanced",
        topics: [
          { id: "js-a-1", title: "Performance Tuning", description: "Optimize loops, rendering and payload size.", time: "30 min", example: "const fast = arr.filter(Boolean)", resource: "https://web.dev/learn/" },
          { id: "js-a-2", title: "Design Patterns", description: "Apply events, modules, and factory patterns in real apps.", time: "28 min", example: "export function createLogger() {}", resource: "https://addyosmani.com/resources/essentialjsdesignpatterns/book/" },
          { id: "js-a-3", title: "Testing", description: "Build small validations and logic tests for components.", time: "25 min", example: "expect(sum(2,3)).toBe(5)", resource: "https://jestjs.io/docs/getting-started" },
        ],
        quiz: [
          { q: "What is event delegation?", options: ["Delegating events to server", "Handling events on a parent element", "Creating event loops", "Using setTimeout"], a: 1 },
          { q: "What does immutability help prevent?", options: ["Syntax errors", "Side effects", "CSS leaks", "Browser crashes"], a: 1 },
          { q: "Which symbol is used for spread?", options: ["&&", "...", "::", "++"], a: 1 },
          { q: "What does Promise.all do?", options: ["Runs promises one by one", "Waits for all promises", "Deletes values", "Creates a promise chain"], a: 1 },
          { q: "Which method adds a new property without mutating?", options: ["obj.key = val", "Object.assign({}, obj, {key: val})", "delete obj.key", "obj.push()"], a: 1 },
        ],
      },
    ],
  },
  Python: {
    description: "Learn Python fundamentals and data-driven thinking for intelligent automation.",
    related: ["Data Science", "Flask", "APIs"],
    levels: [
      {
        level: "Beginner",
        topics: [
          { id: "py-b-1", title: "Syntax & Variables", description: "Set up variables and understand Python syntax.", time: "18 min", example: "name = 'DevAIchemy'", resource: "https://docs.python.org/3/tutorial/introduction.html" },
          { id: "py-b-2", title: "Control Flow", description: "Use if statements, loops, and boolean logic.", time: "22 min", example: "for i in range(5): print(i)", resource: "https://realpython.com/python-conditional-statements/" },
          { id: "py-b-3", title: "Functions", description: "Encapsulate logic with reusable functions.", time: "20 min", example: "def greet(name): return f'Hello {name}'", resource: "https://docs.python.org/3/tutorial/controlflow.html" },
        ],
        quiz: [
          { q: "How do you define a function in Python?", options: ["function greet()", "def greet():", "func greet()", "let greet ="], a: 1 },
          { q: "What does len('AI') return?", options: ["1", "2", "3", "0"], a: 1 },
          { q: "Which keyword makes a loop continue?", options: ["skip", "pass", "break", "continue"], a: 3 },
          { q: "What symbol starts a comment?", options: ["//", "<!--", "#", "/*"], a: 2 },
          { q: "How do you import the math module?", options: ["import math", "include math", "require('math')", "using math"], a: 0 },
        ],
      },
      {
        level: "Intermediate",
        topics: [
          { id: "py-i-1", title: "Data Collections", description: "Work with lists, tuples, sets and dictionaries.", time: "25 min", example: "items = ['AI', 'ML']", resource: "https://docs.python.org/3/tutorial/datastructures.html" },
          { id: "py-i-2", title: "File I/O", description: "Read and write files for data workflows.", time: "22 min", example: "with open('data.txt') as f: text = f.read()", resource: "https://realpython.com/read-write-files-python/" },
          { id: "py-i-3", title: "Modules & Packages", description: "Share reusable code across projects.", time: "24 min", example: "from math import sqrt", resource: "https://packaging.python.org/" },
        ],
        quiz: [
          { q: "Which collection preserves insertion order?", options: ["set", "tuple", "dict", "list"], a: 2 },
          { q: "Which keyword opens a file safely?", options: ["with", "open", "safe", "try"], a: 0 },
          { q: "How do you append to a list?", options: ["list.add(x)", "list.append(x)", "list.push(x)", "list.insert(x)"], a: 1 },
          { q: "What is a dictionary key-value pair?", options: ["[key, value]", "key: value", "(key, value)", "key = value"], a: 1 },
          { q: "How do you import a single function?", options: ["import func from module", "from module import func", "include module.func", "require('module').func"], a: 1 },
        ],
      },
      {
        level: "Advanced",
        topics: [
          { id: "py-a-1", title: "Classes & Objects", description: "Build reusable object-oriented structures.", time: "28 min", example: "class Tool: pass", resource: "https://docs.python.org/3/tutorial/classes.html" },
          { id: "py-a-2", title: "Web APIs", description: "Connect Python apps to REST data and APIs.", time: "30 min", example: "response = requests.get(url)", resource: "https://realpython.com/python-api/" },
          { id: "py-a-3", title: "Data Automation", description: "Automate tasks with scripts and scheduling.", time: "26 min", example: "import schedule", resource: "https://realpython.com/python-schedule/" },
        ],
        quiz: [
          { q: "What is __init__ used for?", options: ["Destroy object", "Initialize object", "Call function", "Start loop"], a: 1 },
          { q: "Which library is common for HTTP requests?", options: ["pandas", "numpy", "requests", "flask"], a: 2 },
          { q: "What does OOP stand for?", options: ["Open On Python", "Object Oriented Programming", "Operational Output Process", "Ordered Output Procedure"], a: 1 },
          { q: "Which function converts JSON to Python?", options: ["json.load", "json.dumps", "json.parse", "json.write"], a: 0 },
          { q: "How do you define a class method?", options: ["def method(self)", "class method(self)", "method def(self)", "def self.method()"], a: 0 },
        ],
      },
    ],
  },
  React: {
    description: "Build interactive, component-driven user interfaces with modern React.",
    related: ["JavaScript", "Next.js", "Redux"],
    levels: [
      {
        level: "Beginner",
        topics: [
          { id: "react-b-1", title: "JSX & Components", description: "Learn how to write markup in JS.", time: "20 min", example: "const App = () => <div>Hello</div>", resource: "https://react.dev/learn" },
          { id: "react-b-2", title: "Props & State", description: "Pass data down and manage local state.", time: "25 min", example: "const [count, setCount] = useState(0)", resource: "https://react.dev/learn/state-a-components-memory" },
        ],
        quiz: [
          { q: "What hook manages local state?", options: ["useEffect", "useState", "useContext", "useRef"], a: 1 },
          { q: "What syntax extension does React use?", options: ["TSX", "JSX", "HTMLX", "XML"], a: 1 },
          { q: "How do you pass data to child components?", options: ["state", "props", "events", "hooks"], a: 1 },
          { q: "Which of the following is true?", options: ["Props are mutable", "State is read-only", "Props are read-only", "State is passed down"], a: 2 },
          { q: "How do you render a list in React?", options: ["Array.map()", "for loop", "while loop", "forEach()"], a: 0 },
        ],
      },
      {
        level: "Intermediate",
        topics: [
          { id: "react-i-1", title: "useEffect Hook", description: "Perform side effects like data fetching.", time: "30 min", example: "useEffect(() => { fetch() }, [])", resource: "https://react.dev/reference/react/useEffect" },
          { id: "react-i-2", title: "Context API", description: "Share state globally without prop drilling.", time: "25 min", example: "const ThemeContext = createContext('light')", resource: "https://react.dev/learn/passing-data-deeply-with-context" },
        ],
        quiz: [
          { q: "What replaces componentDidMount in hooks?", options: ["useState", "useContext", "useEffect with empty array", "useReducer"], a: 2 },
          { q: "What does useMemo do?", options: ["Caches a function", "Caches a computed value", "Caches a component", "Caches props"], a: 1 },
          { q: "How do you avoid prop drilling?", options: ["Redux", "Context API", "Zustand", "All of the above"], a: 3 },
          { q: "What hook is best for complex state logic?", options: ["useState", "useReducer", "useContext", "useEffect"], a: 1 },
          { q: "Where should side-effects be placed?", options: ["Render phase", "useEffect callback", "useState init", "return statement"], a: 1 },
        ],
      },
      {
        level: "Advanced",
        topics: [
          { id: "react-a-1", title: "Custom Hooks", description: "Extract reusable logic into custom hooks.", time: "30 min", example: "function useFetch(url) { }", resource: "https://react.dev/learn/reusing-logic-with-custom-hooks" },
          { id: "react-a-2", title: "Performance Optimization", description: "Use React.memo and useCallback.", time: "35 min", example: "const memoizedCallback = useCallback(() => {}, [])", resource: "https://react.dev/reference/react/useCallback" },
        ],
        quiz: [
          { q: "What does React.memo do?", options: ["Memoizes values", "Memoizes a function", "Prevents unnecessary re-renders of components", "Caches API calls"], a: 2 },
          { q: "What hook memoizes a callback function?", options: ["useMemo", "useCallback", "useRef", "useEffect"], a: 1 },
          { q: "What is the purpose of useRef?", options: ["Trigger re-renders", "Store mutable value without re-rendering", "Fetch data", "Manage global state"], a: 1 },
          { q: "Which tool is best for Server Side Rendering?", options: ["Next.js", "Create React App", "Vite", "Webpack"], a: 0 },
          { q: "What does Suspense do in React?", options: ["Stops errors", "Pauses rendering while data loads", "Deletes components", "Hides UI"], a: 1 },
        ],
      },
    ],
  },
};

const LearningModule = () => {
  const [selectedSkill, setSelectedSkill] = useState("JavaScript");
  const [progress, setProgress] = useState({});
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("devaichemy_learning_progress")) || {};
    setProgress(saved);
  }, []);

  const skillData = learningPaths[selectedSkill];
  const skillProgress = progress[selectedSkill] || { completedTopics: [], passedLevels: [], points: 0, badges: [] };

  const totalTopics = useMemo(
    () => skillData.levels.reduce((sum, level) => sum + level.topics.length, 0),
    [skillData]
  );

  const completedTopics = skillProgress.completedTopics?.length || 0;
  const overallProgress = Math.round((completedTopics / totalTopics) * 100) || 0;

  const saveProgress = (update) => {
    const next = { ...progress, [selectedSkill]: { ...skillProgress, ...update, totalTopics, points: (update.points ?? skillProgress.points) } };
    setProgress(next);
    localStorage.setItem("devaichemy_learning_progress", JSON.stringify(next));
  };

  const toggleTopic = (topicId) => {
    const isComplete = skillProgress.completedTopics.includes(topicId);
    const completedTopics = isComplete
      ? skillProgress.completedTopics.filter((id) => id !== topicId)
      : [...skillProgress.completedTopics, topicId];
    const points = Math.max(0, (skillProgress.points || 0) + (isComplete ? -10 : 10));
    const badges = [...new Set(skillProgress.badges || [])];
    if (points >= 100 && !badges.includes("Expert Learner")) badges.push("Expert Learner");
    if (points >= 60 && !badges.includes("Intermediate Achiever")) badges.push("Intermediate Achiever");
    if (points < 60 && !badges.includes("Beginner Explorer")) badges.push("Beginner Explorer");

    saveProgress({ completedTopics, points, badges });
  };

  const levelStatus = (levelIdx) => {
    if (levelIdx === 0) return true;
    const previousLevel = skillData.levels[levelIdx - 1];
    return skillProgress.passedLevels?.includes(previousLevel.level);
  };

  const startQuiz = (level) => {
    setQuizQuestionIndex(0);
    setQuizScore(0);
    setActiveQuiz(level);
    setQuizResult(null);
  };

  const finishQuiz = (level, score, total) => {
    const passed = score / total >= 0.6;
    const newPassedLevels = passed
      ? [...new Set([...(skillProgress.passedLevels || []), level.level])]
      : skillProgress.passedLevels || [];
    const points = (skillProgress.points || 0) + (passed ? 30 : 10);
    const badges = [...new Set([...(skillProgress.badges || []), passed ? "Level Champion" : "Curious Learner"])];
    saveProgress({ passedLevels: newPassedLevels, points, badges });
    const quizRecords = JSON.parse(localStorage.getItem("devaichemy_learning_quiz_history")) || [];
    localStorage.setItem(
      "devaichemy_learning_quiz_history",
      JSON.stringify([...quizRecords, { skill: selectedSkill, level: level.level, score, total, passed, date: new Date().toISOString() }])
    );
    setQuizResult({ level: level.level, score, total, passed });
    setActiveQuiz(null);
  };

  const answerQuiz = (choice) => {
    const level = skillData.levels.find((item) => item.level === activeQuiz);
    if (!level) return;
    if (choice === level.quiz[quizQuestionIndex].a) setQuizScore((prev) => prev + 1);
    const nextIndex = quizQuestionIndex + 1;
    if (nextIndex >= level.quiz.length) {
      finishQuiz(level, quizScore + (choice === level.quiz[quizQuestionIndex].a ? 1 : 0), level.quiz.length);
      return;
    }
    setQuizQuestionIndex(nextIndex);
  };

  const skillMeta = {
    HTML: { rating: "4.8", reviews: "2.1k", color: "#e34f26", icon: "🌐" },
    JavaScript: { rating: "4.9", reviews: "5.4k", color: "#f7df1e", icon: "⚡" },
    Python: { rating: "4.9", reviews: "8.2k", color: "#3776ab", icon: "🐍" },
    React: { rating: "5.0", reviews: "4.8k", color: "#61dafb", icon: "⚛️" },
  };

  return (
    <div className="app-container">
      <div className="bg-mesh"></div>
      <Navbar />
      <main style={{ padding: "2rem 3rem", maxWidth: "1300px", margin: "0 auto" }} className="animate-fade-in">
        <header style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "2.8rem" }}>AI Chemist Learning Lab</h1>
            <p style={{ color: "var(--text-muted)", marginTop: "0.8rem" }}>Build personalized learning journeys, earn points, unlock badges and complete mini-quizzes.</p>
          </div>
          <div className="skill-pill">Selected Skill: {selectedSkill}</div>
        </header>

        <section style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "1.3fr 0.7fr" }}>
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
                {Object.keys(learningPaths).map((skill) => {
                  const meta = skillMeta[skill] || { rating: "4.5", reviews: "1k", color: "var(--primary-cyan)", icon: "📚" };
                  const isSelected = selectedSkill === skill;
                  return (
                    <div
                      key={skill}
                      className="glass-panel glass-premium"
                      style={{ 
                        padding: "1.5rem", 
                        cursor: "pointer", 
                        border: isSelected ? `2px solid ${meta.color}` : "1px solid var(--glass-border)",
                        transform: isSelected ? "translateY(-5px)" : "none",
                        boxShadow: isSelected ? `0 10px 25px rgba(0,0,0,0.4), 0 0 15px ${meta.color}40` : ""
                      }}
                      onClick={() => setSelectedSkill(skill)}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "2rem", filter: isSelected ? "drop-shadow(0 0 10px rgba(255,255,255,0.4))" : "" }}>{meta.icon}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", background: "rgba(253, 224, 71, 0.1)", color: "#fde047", padding: "0.3rem 0.7rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "bold" }}>
                          ⭐ {meta.rating} <span style={{ color: "var(--text-muted)", fontWeight: "normal" }}>({meta.reviews})</span>
                        </div>
                      </div>
                      <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem", fontSize: "1.3rem", color: isSelected ? meta.color : "white" }}>{skill}</h3>
                      <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                        {learningPaths[skill].description.length > 60 ? learningPaths[skill].description.substring(0, 60) + "..." : learningPaths[skill].description}
                      </p>
                      {isSelected && (
                         <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1rem" }}>
                           {learningPaths[skill].related.map(tag => <span key={tag} className="badge-pill badge-light" style={{fontSize: "0.7rem", padding:"0.3rem 0.6rem"}}>{tag}</span>)}
                         </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {skillData.levels.map((level, index) => {
              const unlocked = levelStatus(index);
              const passed = skillProgress.passedLevels?.includes(level.level);

              return (
                <div key={level.level} className="glass-panel" style={{ marginBottom: "1.25rem", padding: "1.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <h2 style={{ margin: 0 }}>{level.level}</h2>
                      <p style={{ color: "var(--text-muted)", margin: "0.5rem 0 0 0" }}>Topics: {level.topics.length}</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                      <span className={`status-pill ${passed ? "status-passed" : unlocked ? "status-unlocked" : "status-locked"}`}>
                        {passed ? "Passed" : unlocked ? "Unlocked" : "Locked"}
                      </span>
                      {unlocked && !passed && (
                        <button className="btn-premium" onClick={() => startQuiz(level)} style={{ padding: "10px 18px" }}>
                          Take Level Quiz
                        </button>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: "1.25rem", display: "grid", gap: "1rem" }}>
                    {level.topics.map((topic) => {
                      const isComplete = skillProgress.completedTopics.includes(topic.id);
                      return (
                        <div key={topic.id} className="topic-row">
                          <div>
                            <h3 style={{ margin: "0 0 0.5rem 0" }}>{topic.title}</h3>
                            <p style={{ margin: "0 0 0.5rem 0", color: "var(--text-muted)" }}>{topic.description}</p>
                            <small style={{ color: "var(--text-muted)" }}>Estimated: {topic.time}</small>
                          </div>
                          <button
                            onClick={() => toggleTopic(topic.id)}
                            className={isComplete ? "btn-complete" : "btn-outline"}
                          >
                            {isComplete ? "Completed" : "Mark Completed"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <aside style={{ display: "grid", gap: "1.5rem" }}>
            <div className="glass-panel" style={{ padding: "2rem" }}>
              <h3>Progress Tracker</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "0.75rem" }}>Completed topics, earned points, and next steps for {selectedSkill}.</p>
              <div style={{ marginTop: "1.25rem" }}>
                <div className="progress-shell">
                  <div className="progress-bar" style={{ width: `${overallProgress}%`, background: "linear-gradient(90deg, var(--primary-cyan), var(--accent-violet))" }}></div>
                </div>
                <p style={{ color: "var(--text-muted)", marginTop: "0.85rem" }}>{completedTopics}/{totalTopics} topics completed</p>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
                <span className="badge-pill">Points: {skillProgress.points || 0}</span>
                <span className="badge-pill">Badges: {skillProgress.badges?.length || 0}</span>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: "2rem" }}>
              <h3>Recommended for You</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "0.75rem" }}>Next best topic based on your current progress.</p>
              <div style={{ marginTop: "1rem" }}>
                {skillData.levels.flatMap((lvl) => lvl.topics).filter((topic) => !skillProgress.completedTopics.includes(topic.id)).slice(0, 3).map((topic) => (
                  <div key={topic.id} style={{ marginBottom: "1rem" }}>
                    <strong>{topic.title}</strong>
                    <p style={{ margin: "0.35rem 0 0 0", color: "var(--text-muted)" }}>{topic.description}</p>
                  </div>
                ))}
              </div>
              <div className="break-card">
                <strong>Coffee Break Tip</strong>
                <p style={{ margin: "0.75rem 0 0 0", color: "var(--text-muted)" }}>Take a 5-minute pause, revisit a concept, and then continue with fresh focus.</p>
              </div>
            </div>
          </aside>
        </section>

        {activeQuiz && (
          <div className="glass-panel quiz-card">
            <h2>{selectedSkill} — {activeQuiz} Quiz</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Answer {skillData.levels.find((item) => item.level === activeQuiz).quiz.length} questions to unlock the next path.</p>
            <div style={{ marginBottom: "1.25rem" }}>
              <strong>Question {quizQuestionIndex + 1}</strong>
              <p style={{ marginTop: "0.75rem" }}>{skillData.levels.find((item) => item.level === activeQuiz).quiz[quizQuestionIndex].q}</p>
            </div>
            <div style={{ display: "grid", gap: "1rem" }}>
              {skillData.levels.find((item) => item.level === activeQuiz).quiz[quizQuestionIndex].options.map((option, idx) => (
                <button key={option} className="quiz-option" onClick={() => answerQuiz(idx)}>{option}</button>
              ))}
            </div>
          </div>
        )}

        {quizResult && (
          <div className="glass-panel quiz-result-card">
            <h2>{quizResult.passed ? "Level Passed" : "Keep Going"}</h2>
            <p style={{ marginTop: "0.75rem", color: "var(--text-muted)" }}>You scored {quizResult.score}/{quizResult.total}. {quizResult.passed ? "The next level is now unlocked." : "Review the path and try again."}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LearningModule;
