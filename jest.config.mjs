export default {
  preset: 'ts-jest',  // Use ts-jest preset
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/coverage/**',
    '!**/dist/**',
    '!**/lighthouseConfig/**',
    "!**/tailwind.config.js",  // Exclude tailwind config
    "!**/vite.config.ts",      // Exclude vite config
    "!**/jest.config.mjs",      // Exclude jest config
    "!**/setupTests.ts",        // Exclude setupTests
    "!**/babel.config.mjs",        // Exclude babel config
    "!**/vite-env.d.ts"        // Exclude vite env
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Use ts-jest for TypeScript files
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
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
