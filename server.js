const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const db = require('./src/services/db');

const patientRouter = require('./src/routes/patients');
const episodeRouter = require('./src/routes/episodes');
const measurementRouter = require('./src/routes/measurements');
const prescriptionRouter = require('./src/routes/prescriptions');

db.executeUpdateScript();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));
app.use('/episodes', episodeRouter);
app.use('/measurements', measurementRouter);
app.use('/patients', patientRouter);
app.use('/prescriptions', prescriptionRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});

  return;
})

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Demo app listening on port 3000!\n');
});

console.log(db)