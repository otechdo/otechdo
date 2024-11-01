module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // Utilisez jsdom pour simuler le DOM dans un environnement de navigateur
    roots: ["<rootDir>/src"],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    testMatch: ["**/*.test.ts"]
};
