const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const db = require('./src/services/db');
const populateDb = require('./src/services/populateDb').populateDb;
const dbv2 = require('./src/services/dbv2.js').updateDatabase;

const patientRouter = require('./src/routes/patients');
const measurementRouter = require('./src/routes/measurements');
const prescriptionRouter = require('./src/routes/prescriptions');
const servicesRouter = require('./src/routes/services');
const request = require('request');
const dbCon = require('./src/services/db').databaseConnection;

db.databaseConnection.execute("SELECT database_version FROM database_version", (err, results, fields) => {
  if (results == undefined || results[0].database_version < 1) {
    db.executeUpdateScript();
    populateDb();
    dbv2();
  } else if (results[0].database_version < 2) {
    dbv2();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));
app.use('/measurements', measurementRouter);
app.use('/patients', patientRouter);
app.use('/prescriptions', prescriptionRouter);
app.use('/cds-services', servicesRouter);

app.get('/drug', async function(req, res, next) {
  try {
      dbCon.execute("SELECT concept_id, name FROM drug;", function(err, result) {
          if (err) throw err;
          res.json(result);
      });
  } catch (err) {
      console.error(`Error while getting information on all available drugs `, err.message);
      next(err);
  }
});

app.get('/highest_id', async function(req, res, next) {
  try {
      dbCon.execute("SELECT max(order_id) FROM orders;", function(err, result) {
          if (err) throw err;
          res.json(result);
      });
  } catch (err) {
      console.error(`Error while getting highest order_id `, err.message);
      next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});

  return;
});

// Tell express to use the webpack-dev-middleware and use the webpack.config.js configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Demo app listening on port 3000!\n');
});

//test greeter + test example
request.post('http://localhost:3000/cds-services/greeter/' + JSON.stringify({"givenName": 'test'}),
  {headers: {"Content-Type": "text/plain"}},
  function(err, response, body) {
    if (err) throw err;
    if (response.statusCode == 200) {
      console.log(body);
    } else {
      console.error('ERROR. Call cds-service greeter failed with statuscode ' + response.statusCode);
    }
});

request.post('http://localhost:3000/cds-services/nsaid/' + JSON.stringify({"concept_id": 71617, "latest_platelet_count": 90000}),
  {headers: {"Content-Type": "text/plain"}},
  function(err, response, body) {
    if (err) throw err;
    if (response.statusCode == 200) {
      console.log(body);
    } else {
      console.error('ERROR. Call cds-service nsaid failed with statuscode ', response.statusCode);
    }
  });

request.get('http://localhost:3000/prescriptions/14', function(err, response, body) {
  if (err) throw err;
  if (response.statusCode == 200) {
    request.post('http://localhost:3000/cds-services/serotoninSyndrome/' + JSON.stringify({"prescriptions": JSON.parse(body)}), 
      {headers: {"Content-Type": "text/plain"}},
      function (err2, response2, body2) {
        if (err2) throw err2;
        if (response2.statusCode == 200) {
          console.log(body2);
        } else {
          console.error('ERROR. Call cds-service serotoninSyndrome failed with statuscode ' + response2.statusCode);
        }
      })
  } else {
    console.error('ERROR. Cannot get prescriptions for patient 14');
  }
})
