const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/'
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: './dist'
  }
};