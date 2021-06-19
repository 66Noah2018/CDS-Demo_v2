const uuid = require('uuid');

function getDateNow() {
    return new Date().toISOString().replace('T', ' ').replace(/\.\d\d\dZ/i, '');
}

function getUuid() {
    return `'${uuid.v4()}'`;
}

function executeQueries(queries, databaseConnection) {
    queries.forEach(query => {
        databaseConnection.execute(query.trim(), (err, results, fields) => {
            if (err) {
                console.log(query.trim());
                throw err;
            }
        })
    })
}

module.exports = { getDateNow, getUuid, executeQueries }