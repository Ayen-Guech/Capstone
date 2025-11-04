const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.jest.json");

module.exports = {
  preset: "ts-jest/presets/default-esm", // ✅ ESM mode for import.meta
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },
  moduleNameMapper: {
    // ✅ Mocks for CSS, SCSS, SASS
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",

    // ✅ Optional: handle path aliases if you use tsconfig "paths"
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: "<rootDir>/",
    }),
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  verbose: true,
};
