const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/index.ts'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{ test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/, }],
    },
};
