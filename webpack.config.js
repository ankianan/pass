const path = require("path");
module.exports = {
  entry: {
    'dist/standalone/index': './modules/core/src/test/standalone/index.js',
    'modules/browser-extension/popup/popup': './modules/browser-extension/src/main/popup/popup.js'
  },
  output: {
    path: path.resolve(__dirname),
  },
  //mode: "development",
  watch: true
};