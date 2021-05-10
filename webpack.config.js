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
      net: false,
      util: false,
      stream: false,
      crypto: false,
      tls: false,
      timers: false,
      buffer: false,
      zlib: require.resolve('browserify-zlib'),
      assert: require.resolve('assert/'),
      http: require.resolve('stream-http'),
      constants: require.resolve('constants-browserify'),
      os: require.resolve('os-browserify/browser'),
      child_process: false,
      worker_threads: false,
      vm: require.resolve('vm-browserify'),
      https: require.resolve('https-browserify')
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