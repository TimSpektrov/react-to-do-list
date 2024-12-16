module.exports = {
    preset: 'ts-jest',
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.{jpg|jpeg|png|svg}$": "<rootDir>/mocks/fileMock.js",
        '\\.(css|less|scss)$': 'jest-css-modules',
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // если вы используете TypeScript
    },
}