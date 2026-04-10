export const generateIdea = (skillsStr) => {
  if (!skillsStr) return [];
  const skill = skillsStr.toLowerCase().split(",")[0].trim() || "Web";
  const capitalSkill = skill.charAt(0).toUpperCase() + skill.slice(1);

  return [
    {
      id: `${skill}-proj-1`,
      category: "Project",
      difficulty: "Advanced",
      title: `AI-Powered ${capitalSkill} Code Reviewer`,
      shortDescription: `A local development tool that reviews your ${capitalSkill} code for security vulnerabilities.`,
      likes: Math.floor(Math.random() * 500) + 120,
      avgRating: 4.8,
      ratingCount: 89,
      architecture: `${capitalSkill} Frontend + FastAPI Backend + Local LLM`,
      roadmap: `1. Setup UI with Monaco Editor.\n2. Build API for code reception.\n3. Integrate local syntax analysis.\n4. Show diffs and security scores.`,
      timeToComplete: "3 weeks",
      useCases: ["Portfolio piece", "Open source utility"]
    },
    {
      id: `${skill}-start-1`,
      category: "Startup",
      difficulty: "Intermediate",
      title: `Decentralized ${capitalSkill} Talent Marketplace`,
      shortDescription: `A peer-to-peer job board for hiring elite ${capitalSkill} devs using crypto escrow.`,
      likes: Math.floor(Math.random() * 1000) + 400,
      avgRating: 4.9,
      ratingCount: 310,
      architecture: `${capitalSkill} + Next.js + Solidity Smart Contracts`,
      roadmap: `1. Authenticate wallets.\n2. Gig bidding system.\n3. Escrow implementation.\n4. Notification push hooks.`,
      timeToComplete: "2 months",
      useCases: ["B2B SaaS", "Freelance hub"]
    },
    {
      id: `${skill}-free-1`,
      category: "Freelancing",
      difficulty: "Beginner",
      title: `${capitalSkill} Migration Consultant`,
      shortDescription: `Service to migrate legacy code to modern ${capitalSkill} frameworks.`,
      likes: Math.floor(Math.random() * 200) + 50,
      avgRating: 4.5,
      ratingCount: 22,
      architecture: `AST Parsers + Regex + ${capitalSkill} CLI`,
      roadmap: `1. Identify target legacy APIs.\n2. Build refactoring scripts.\n3. Package as a service.\n4. Market to SMBs.`,
      timeToComplete: "1 week",
      useCases: ["Consulting", "Enterprise contracting"]
    },
    {
      id: `${skill}-cont-1`,
      category: "Content Creation",
      difficulty: "Beginner",
      title: `${capitalSkill} Performance Mastery Course`,
      shortDescription: `A comprehensive YouTube/Udemy series on optimizing ${capitalSkill} apps.`,
      likes: Math.floor(Math.random() * 800) + 200,
      avgRating: 4.7,
      ratingCount: 156,
      architecture: `Video recording + Markdown course syllabus`,
      roadmap: `1. Outline 10 module syllabus.\n2. Record screencasts focusing on rendering tricks.\n3. Edit and publish to Udemy.\n4. Drive traffic via Twitter.`,
      timeToComplete: "1 month",
      useCases: ["Passive income", "Personal branding"]
    }
  ];
};
