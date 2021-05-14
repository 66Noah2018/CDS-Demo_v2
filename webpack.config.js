const path = require('path');
const webpack = require('webpack');

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
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      util: require.resolve('util'),
      http: require.resolve('stream-http'),
      vm: require.resolve('vm-browserify'),
      buffer: require.resolve('buffer'),
      https: require.resolve('https-browserify'),
      crypto: require.resolve('crypto-browserify'),
      zlib: require.resolve('browserify-zlib'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      os: require.resolve('os-browserify/browser'),
      timers: require.resolve('timers-browserify'),
      timers: require.resolve('timers-browserify'),
      constants: require.resolve('constants-browserify'),
      worker_threads: false,
      child_process: false
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    })
  ],
  module: {
    rules: [
      { test: /\.txt$/i, use: 'raw-loader',}
    ]
  }
};