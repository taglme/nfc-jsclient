const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './index.ts'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist/example'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{ test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            cache: false,
        }),
    ],
};
