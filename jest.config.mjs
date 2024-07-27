export default {
  preset: 'ts-jest',  // Use ts-jest preset
  testEnvironment: 'jsdom',
  "collectCoverage": true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Use ts-jest for TypeScript files
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  coverageDirectory: "coverage",
  coverageReporters: [
      "html",
      "text",
      "text-summary",
      "cobertura"
    ],
    coverageThreshold: {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
};
