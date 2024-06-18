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
        new_window: './src/new-window.js',
        
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
              { from: 'src/manifest.json', to: 'manifest.json' },
              { from: 'src/new-window.html', to: 'new-window.html' },
              { from: 'src/new-window.js', to: 'new-window.js' }
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