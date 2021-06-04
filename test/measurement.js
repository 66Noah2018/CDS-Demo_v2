const request = require('request');
const measurement = require('../src/types/measurement').Measurement;
const sleep = require('./utils').sleep;

async function testMeasurementEndpoint() {
    // const testMeasurement = new measurement(17, "GLUC", "BC", "2017-03-21 18:19:30", "glucose", null, 13, 1, 5.6, 6.0, 17, null);

    request.get('http://localhost:3000/measurements/13', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get all measurements for patient 13: OK');
        } else {
            console.error('ERROR. Get all measurements for patient 13 failed with statuscode ' + response.statusCode);
        }
    })

    await sleep(500);

    // request.post('http://localhost:3000/measurements/' + testMeasurement.measurementToSql(),
    //     {headers:{"Content-Type": "text/plain"}},
    //     function(err, response, body) {
    //         if (err) throw err;
    //         if (response.statusCode == 200 ) {
    //             console.log('Add measurement for patient 17: OK');
    //         } else {
    //             console.error('ERROR. Add measurement for patient 17 failed with statuscode ' + response.statusCode);
    //         }
    // })

    // await sleep(500);

    request.get('http://localhost:3000/measurements/measurement/1', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get measurement 1: OK');
        } else {
            console.error('ERROR. Get measurement 1 failed with statuscode ' + response.statusCode);
        }
    })

    await sleep(500);
}

module.exports = { testMeasurementEndpoint };