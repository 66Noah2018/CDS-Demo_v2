let runtimeProperties = "";
const fs = require('fs');
const mysql = require('mysql2');
const { exit } = require('process');
  
function setRuntimeProperties() {
    try {
      runtimeProperties = require('../../runtime-properties.json');
    }
    catch (err) {
      if (err.code == "MODULE_NOT_FOUND") {
        console.error('No runtime-properties file found. Please make sure to run npm run setup before attempting to use the server!'); 
        exit(1);   
      }
      else throw err;
    }
}
  
function getDbPassword() { 
    if (runtimeProperties == "") setRuntimeProperties();
    return runtimeProperties.dbPassword;
}
  
function getDbUser() {
    if (runtimeProperties == "") setRuntimeProperties();
    return runtimeProperties.dbUser;
}
  
function getDbPort() {
    if (runtimeProperties == "") setRuntimeProperties();
    return runtimeProperties.dbPort;
}
  
function getInitialConnection() {
    return mysql.createConnection({
      host: 'localhost',
      user: getDbUser(),
      password: getDbPassword(),
      port: getDbPort(),
      database: 'openmrs'
    });
}

let databaseConnection = getInitialConnection();
  
function readSQLFile() {
    var txt = fs.readFileSync(__dirname + '/initNewDb.txt', "utf-8");
    var queries = txt.split(';');
    return queries;
}

function executeUpdateScript() {
    const queries = readSQLFile();
    queries.forEach(query => {
        databaseConnection.execute(query.trim(), (err, results, fields) => {
            if (err = 'ER_DUP_KEYNAME') return; // needed because there is no INSERT INDEX IF NOT EXISTS in mysql
            else throw err;
        })
    });
}

module.exports = { executeUpdateScript, databaseConnection }