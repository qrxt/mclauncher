const config = {
  verbose: true,
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      babelConfig: true,
      isolatedModules: true,
    },
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
};

export default config;
