export const getInterviewQuestions = (skill) => {
  const s = skill.toLowerCase();
  
  if (s.includes("react")) {
    return [
      {
        q: "Explain the Virtual DOM and how React uses it.",
        a: "The Virtual DOM is a lightweight JavaScript representation of the actual DOM. React uses it to improve performance by calculating the most efficient way to update the real DOM (a process called reconciliation or diffing) before making any actual browser API calls."
      },
      {
        q: "What is the difference between useEffect and useLayoutEffect?",
        a: "useEffect runs asynchronously after the render is committed to the screen, making it good for side effects that don't block visual updates. useLayoutEffect runs synchronously immediately after React has performed all DOM mutations, useful for reading layout from the DOM and synchronously re-rendering."
      },
      {
        q: "What are React Server Components?",
        a: "RSC allows components to render exclusively on the server, resulting in zero bundle size for those components. This allows direct access to backend resources and reduces the amount of JavaScript sent to the client."
      },
      {
        q: "How does React 18 Concurrent Mode work?",
        a: "Concurrent Mode allows React to interrupt a long-running render to handle a high-priority event (like user input). It uses features like useTransition and useDeferredValue to keep the UI responsive during heavy state updates."
      },
      {
        q: "Explain Prop Drilling and how to avoid it.",
        a: "Prop drilling is passing data through multiple nested components that don't need it, just to reach a deeply nested component. You avoid it using React Context API, state management libraries (Redux, Zustand), or component composition."
      }
    ];
  }

  // Generic fallback for any skill
  const Name = skill.charAt(0).toUpperCase() + skill.slice(1);
  return [
    {
      q: `What are the core principles and advantages of ${Name}?`,
      a: `${Name} provides a robust ecosystem for development. The main advantages include strong community support, performance optimizations typical for this stack, and architectural patterns that encourage scalable design.`
    },
    {
      q: `How do you handle state management and data flow in ${Name}?`,
      a: `State is typically managed using context or centralized stores, depending on application size. Data flows predictably, usually following a unidirectional pattern to ensure debugging efficiency.`
    },
    {
      q: `Can you explain the lifecycle or execution context within ${Name}?`,
      a: `In ${Name}, execution occurs in phases (e.g., initialization, updating, destruction). Managing resources correctly during these phases is critical to prevent memory leaks and ensure optimal garbage collection.`
    },
    {
      q: `What are some common anti-patterns in ${Name}?`,
      a: `Common anti-patterns include mutating state directly, huge monolithic structures rather than decoupled modules, and failing to handle asynchronous race conditions appropriately.`
    },
    {
      q: `How would you optimize performance in a large ${Name} application?`,
      a: `Performance optimization involves code splitting, lazy loading, caching data/computations, and minimizing expensive operational overhead during repetitive execution cycles.`
    }
  ];
};
