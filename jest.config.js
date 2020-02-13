module.exports = {
    // [...]
    // Replace `ts-jest` with the preset you want to use
    // from the above list
    preset: 'ts-jest',
    clearMocks: true,
    setupFilesAfterEnv: ["jest-extended"],
    maxConcurrency: 1,
    maxWorkers: 1,
    testMatch: [
        "**/*.test.ts",
        "**/*.steps.ts",
        "**/*.spec.ts",

    ],
};