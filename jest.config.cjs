// /** @type {import('jest').Config} */
// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
// setupFilesAfterEnv: ["<rootDir>/tests/config/jest.setup.ts"],
// transform: {
//   "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
// },
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//     "\\.(gif|ttf|eot|svg|png|jpe?g|webp)$": "<rootDir>/tests/config/fileMock.js",
//   },
//   testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"]
// };

/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/config/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png|jpe?g|webp)$": "<rootDir>/tests/config/fileMock.js",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],
};
