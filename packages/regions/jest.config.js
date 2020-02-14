module.exports = {
    testMatch:[
        '**/*.steps.js',
        '**/*.spec.js',
        '**/*.test.js'
    ],
    "transform": {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
}