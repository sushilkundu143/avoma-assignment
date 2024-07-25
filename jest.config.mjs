export default {
  preset: 'ts-jest',  // Use ts-jest preset
  testEnvironment: 'jsdom',
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
};
