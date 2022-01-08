const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: {
    'standalone/index': './modules/core/src/test/standalone/index.js',
    'browser-extension/popup/popup': './modules/browser-extension/src/main/popup/popup.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "modules/browser-extension/entry", to: "browser-extension" },
        { context: "node_modules/@decentralized-identity/ion-tools/dist", from:"ion.min.js", to: "browser-extension/popup/node_modules/@decentralized-identity/ion-tools/dist" }
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
  //mode: "development",
  watch: true
};