const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
module.exports = {
  entry: {
    'standalone/index': './modules/core/src/test/standalone/index.js',
    'browser-extension/popup/popup': './modules/browser-extension/src/main/popup/popup.js',
    'browser-extension/background': './modules/browser-extension/src/main/background.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new CopyPlugin({
      patterns: [
        { from: "modules/browser-extension/entry", to: "browser-extension" }
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      process: require.resolve('process/browser'),
      buffer: require.resolve("buffer")
    }
  },
  //mode: "development",
  watch: true
};