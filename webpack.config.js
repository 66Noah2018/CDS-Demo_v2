const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index:  './src/index.js',
    patientOverview: './src/front_end/patientOverview.js',
    patientVitals: './src/front_end/patientVitals.js',
    serotoninCheck: './src/front_end/serotoninCheck.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js',
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
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      { test: /\.txt$/i, use: 'raw-loader',},
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
        title: 'index2',
        filename: 'index2.html',
        template: './src/front_end/index.html',
    }),
    new htmlWebpackPlugin({
        title: 'patientVisit',
        filename: 'patientVisit.html',
        template: './src/front_end/patientVisit.html',
    }),
    new htmlWebpackPlugin({
      title: 'patientView',
      filename: 'patientView.html',
      template: './src/front_end/patientView.html',
  }),
],
  
    
};