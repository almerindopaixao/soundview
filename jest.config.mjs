/** @type {import('@jest/types').Config.InitialOptions} */
const defaultConfig = {
    projects: [],
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    coverageReporters: ["text", "lcov"],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    maxWorkers: "50%",
    watchPathIgnorePatterns: ["node_modules"],
    transformIgnorePatterns: ["node_modules"],
};

/** @type {import('@jest/types').Config.InitialOptions} */
const backendProject = {
    ...defaultConfig,
    testEnvironment: "node",
    displayName: "backend",
    collectCoverageFrom: ["backend/", "!backend/index.js"],
    transformIgnorePatterns: [
        ...defaultConfig.transformIgnorePatterns,
        "frontend",
    ],
    testMatch: ["**/tests/**/backend/**/*.test.js"],
};

/** @type {import('@jest/types').Config.InitialOptions} */
const frontendProject = {
    ...defaultConfig,
    testEnvironment: "jsdom",
    displayName: "frontend",
    collectCoverageFrom: ["frontend/"],
    transformIgnorePatterns: [
        ...defaultConfig.transformIgnorePatterns,
        "backend",
    ],
    testMatch: ["**/tests/**/frontend/**/*.test.js"],
};

export default {
    projects: [backendProject, frontendProject],
};
