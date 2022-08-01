module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        url: 'http://localhost:3000',
        customExportConditions: ['node', 'node-addons']
    },
    moduleNameMapper: {
        '@assets(.*)': '<rootDir>/src/assets$1',
        '@components(.*)': '<rootDir>/src/components$1',
        '@views(.*)': '<rootDir>/src/views$1'
    },
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': '@vue/vue3-jest',
    },
    testMatch: [
        '<rootDir>/test/*.spec.js', 
        '<rootDir>/test/*.test.js'
    ],
    collectCoverage: true
}