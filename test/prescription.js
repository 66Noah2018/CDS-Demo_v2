const request = require('request');
const prescription = require('../src/types/prescription').Prescription;
const sleep = require('./utils').sleep;

async function testPrescriptionEndpoint() {
    const testPrescription = new prescription(17, "2016-08-21 14:18:59", 100, "ST", "ACENOCOUMAROL PCH 1MG T POT", null, "2017-08-21 14:18:59", null, null, 0, null, "B01AA07", null, null, null);

    request.get('http://localhost:3000/prescriptions/17', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get all prescriptions for patient 17: OK');
        } else {
            console.error('ERROR. Get all prescriptions for patient 17 failed with statuscode ' + response.statusCode);
        }
    })
    
    await sleep(500);

    request.post('http://localhost:3000/prescriptions/' + testPrescription.prescriptionToSql(),
        {headers:{"Content-Type": "text/plain"}},
        function(err, response, body) {
            if (err) throw err;
            if (response.statusCode == 200) {
                console.log('Add prescription for patient 17: OK');
            } else {
                console.error('ERROR. Add prescription for patient 17 failed with statuscode ' + response.statusCode);
            }
    })
    
    await sleep(500);
}

module.exports = { testPrescriptionEndpoint };
