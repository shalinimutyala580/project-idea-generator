// Simulate complex project analysis
export const analyzeProject = async (url) => {
  return new Promise((resolve, reject) => {
    // Basic validation
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return reject(new Error("Invalid Repository URL. It must begin with https://"));
    }

    // Simulate network delay for deep scanning
    setTimeout(() => {
      resolve({
        scannedUrl: url,
        maintainability: ['A', 'B+', 'B', 'C'][Math.floor(Math.random() * 4)],
        performanceScore: Math.floor(Math.random() * 30) + 70, // 70 to 100
        securityVulnerabilities: Math.floor(Math.random() * 4), // 0 to 3
        cyclomaticComplexity: (Math.random() * 5 + 2).toFixed(1),
        recommendations: [
          "Refactor monolithic components.",
          "Optimize massive bundle size.",
          "Update outdated npm dependencies.",
          "Improve ARIA accessibility tags."
        ].sort(() => 0.5 - Math.random()).slice(0, 2)
      });
    }, 2500);
  });
};
