const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
    mode: 'development',
    // devtool: false,
    devtool: 'source-map',
    entry: {

        index: './src/index.js',
        background: './src/background.js',
        
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
        }),
        new MonacoEditorWebpackPlugin({
          languages: ['javascript', 'typescript', 'json'],
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: 'src/manifest.json', to: 'manifest.json' }
            ]
          }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
};