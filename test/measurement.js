const request = require('request');
const sleep = require('./utils').sleep;

async function testMeasurementEndpoint() {

    request.get('http://localhost:3000/measurements/13', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get all measurements for patient 13: OK');
        } else {
            console.error('ERROR. Get all measurements for patient 13 failed with statuscode ' + response.statusCode);
        }
    })

    await sleep(500);

    request.get('http://localhost:3000/measurements/measurement/1', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get measurement 1: OK');
        } else {
            console.error('ERROR. Get measurement 1 failed with statuscode ' + response.statusCode);
        }
    })

    await sleep(500);

    request.get('http://localhost:3000/measurements/measurement/13/latest/729', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get latest platelets measurement for patient 13: OK');
        } else {
            console.error('ERROR. Get latest platelet measurement for patient 13 failed with statuscode ' + response.statusCode);
        }
    })

    await sleep(500);
}

module.exports = { testMeasurementEndpoint };