const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
        }),
        // new CopyWebpackPlugin({
        //   patterns: [
        //     { from: 'src/manifest.json', to: '[name][ext]' },
        //   ],
        // }),
    ],
};