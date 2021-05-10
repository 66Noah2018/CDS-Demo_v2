const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const mysql = require('mysql');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const rootPassword = "Miles@2018"
const fs = require('fs');

function getRootPassword() { // TODO: rewrite to password input
  if (rootPassword == "") {
      const result = prompt("Enter database root password", ""); //not possible on server-side. find other option (native os password popup?)
      if (result != null) {
          rootPassword = result;
      }  
  }
  
  return rootPassword;
}

function getInitialConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: getRootPassword(),
    port: 3306,
    database: 'openmrs'
  });
}

var databaseConnection = getInitialConnection();

function readSQLFile() {
  var txt = fs.readFileSync('./src/initDatabase.txt', "utf-8");

  var queries = txt.split(';');
  return queries;
}

function executeUpdateScript() {
  databaseConnection.query("CREATE DATABASE IF NOT EXISTS openmrs", (err, results, fields) => {
    if (err) throw err;
  });

  databaseConnection.config.database = 'openmrs';
  
  const queries = readSQLFile();
  queries.forEach(query => {
    databaseConnection.query(query, (err, results, fields) => {
        if (err = 'ER_DUP_KEYNAME') return; // needed because there is no INSERT INDEX IF NOT EXISTS in mysql
        else throw err;
    })
  })
}

executeUpdateScript();

async function queryDatabase(sqlString, values = []) {
  databaseConnection.query(sqlString, values, function(error, results) {
    if (error) throw error;
    else {
      return results
    }
  })
}

console.log(queryDatabase('SELECT * FROM episodes'))

exports.queryDatabase=queryDatabase

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
