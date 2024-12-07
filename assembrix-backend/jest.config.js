module.exports = {
    preset: 'ts-jest',            // Use ts-jest preset for TypeScript
    testEnvironment: 'node',      // Use Node.js environment for testing
    transform: {
        '^.+\\.ts$': 'ts-jest',    // Transpile TypeScript files with ts-jest
    },
    moduleFileExtensions: ['ts', 'js'], // Support both TypeScript and JavaScript files
};
