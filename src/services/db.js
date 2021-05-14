// const databaseConnection = require('../../server');
let runtimeProperties = "";
const fs = require('fs');
const mysql = require('mysql2');

async function createRuntimeProperties() { //doesnt work
    const properties = await utils.getUserInputProperties()
  
    fs.writeFile('../../runtime-properties.json', properties, function (err) {
      if (err) throw err;
      console.info("Runtime properties created");
    });
}
  
function setRuntimeProperties() {
    try {
      runtimeProperties = require('../../runtime-properties.json');
    }
    catch (err) {
      if (err.code == "MODULE_NOT_FOUND") {
        createRuntimeProperties();
        setRuntimeProperties();      
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
    var txt = fs.readFileSync(__dirname + '/initDatabase.txt', "utf-8");
    var queries = txt.split(';');
    return queries;
}

function executeUpdateScript() {
    const queries = readSQLFile();
    queries.forEach(query => {
        databaseConnection.execute(query, (err, results, fields) => {
            if (err = 'ER_DUP_KEYNAME') return; // needed because there is no INSERT INDEX IF NOT EXISTS in mysql
            else throw err;
        })
    })
}

async function query(sql, params) {
    const results = databaseConnection.execute(sql, params);
    return results;
}

module.exports = { query, executeUpdateScript }