const request = require('request');
const sleep = require('./utils').sleep;

async function testPatientEndpoint() {

    request.get('http://localhost:3000/patients', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get all patients: OK')
        } else {
            console.error('ERROR. Get all patients failed with statuscode ' + response.statusCode);
        }
    })
    
    await sleep(500);

    request.get('http://localhost:3000/patients/2', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get patient 2: OK');
        } else {
            console.error("ERROR. Get patient 2 failed with statuscode " + response.statusCode);
        }
    });
    
    await sleep(500);
}

module.exports = {testPatientEndpoint};