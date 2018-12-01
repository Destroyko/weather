const path = require('path');

module.exports = {
    entry: {
        app_js: './src/app.js'
    },
    mode: 'development', //production
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    }
};