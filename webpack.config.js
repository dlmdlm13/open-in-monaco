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
        chunks: ['index'], // Spécifiez explicitement quels bundles inclure
      }),
      new HtmlWebpackPlugin({
        template: './src/new-window.html',
        filename: 'new-window.html', // Nom de fichier de sortie
        scriptLoading: 'module',
        chunks: ['newWindow'], // Utilisez le nom de l'entrée correspondante
      }),
      new MonacoEditorWebpackPlugin({
        languages: ['javascript', 'typescript', 'json'],
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/manifest.json', to: 'manifest.json' },
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