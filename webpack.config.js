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
        newWindow: './src/new-window.js',
        sw: './src/sw.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        scriptLoading: 'module',
        chunks: ['index'],
      }),
      new HtmlWebpackPlugin({
        template: './src/new-window.html',
        filename: 'new-window.html',
        scriptLoading: 'module',
        chunks: ['newWindow'],
      }),
      new MonacoEditorWebpackPlugin({
        languages: ['javascript', 'typescript', 'sql', 'xml'],
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/manifest.json', to: 'manifest.json' },
          { from: 'icons/128.png', to: 'icons/16.png' },
          { from: 'icons/128.png', to: 'icons/32.png' },
          { from: 'icons/128.png', to: 'icons/48.png' },
          { from: 'icons/128.png', to: 'icons/128.png' },
        ]
      }),
    ],
    resolve: {
      extensions: ['.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
};