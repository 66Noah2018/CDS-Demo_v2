const request = require('request');
const prescription = require('../src/types/prescription').Prescription;
const sleep = require('./utils').sleep;

async function testPrescriptionEndpoint() {
    const testPrescription = new prescription(999, 358, 14, null);

    request.get('http://localhost:3000/prescriptions/14', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get all prescriptions for patient 14: OK');
        } else {
            console.error('ERROR. Get all prescriptions for patient 14 failed with statuscode ' + response.statusCode);
        }
    })
    
    await sleep(500);

    request.post('http://localhost:3000/prescriptions/' + testPrescription.prescriptionToSql(),
        {headers:{"Content-Type": "text/plain"}},
        function(err, response, body) {
            if (err) throw err;
            if (response.statusCode == 200) {
                console.log('Add prescription for patient 14: OK');
            } else {
                console.error('ERROR. Add prescription for patient 14 failed with statuscode ' + response.statusCode);
            }
    })
    
    await sleep(500);

    request.delete('http://localhost:3000/prescriptions/999'),
        {headers:{"Content-Type": "text/plain"}},
        function(err, response, body) {
            if (err) throw err;
            if (response.statusCode == 200) {
                console.log('Delete prescription 999: OK');
            } else {
                console.error('ERROR. Delete prescription 999 failed with statuscode ' + response.statusCode);
            }
        }
}

module.exports = { testPrescriptionEndpoint };
