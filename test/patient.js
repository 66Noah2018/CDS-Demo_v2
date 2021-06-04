const request = require('request');
const patient = require('../src/types/patient').Patient;
const sleep = require('./utils').sleep;

async function testPatientEndpoint() {
    // const testPatient = new patient(2, "F", "1987-12-21 08:21:55", null, null, null, null, null, null, null, null, null, null, null, null);
    // const testPatient2 = new patient(2, "F", "1989-12-21 08:21:55", null, null, null, null, null, null, null, null, null, null, null, null);

    request.get('http://localhost:3000/patients', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get all patients: OK')
        } else {
            console.error('ERROR. Get all patients failed with statuscode ' + response.statusCode);
        }
    })
    
    await sleep(500);

    // request.post('http://localhost:3000/patients/' + testPatient.patientToSql('add'),
    // {headers:{"Content-Type": "text/plain"}},
    // function(err, response, body) {
    //     if (err) throw err;
    //     if (response.statusCode == 200) {
    //         console.log('Add new patient: OK');
    //     } else {
    //         console.error('ERROR. Add new patient failed with statuscode ' + response.statusCode);
    //     }
    // })
    
    // await sleep(500);

    // request.put('http://localhost:3000/patients/' + testPatient2.getPatientId() + '/' + testPatient2.patientToSql("update"), 
    // {headers:{"Content-Type": "text/plain"}}, 
    // function(err, response, body) {
    //     if (err) throw err;
    //     if (response.statusCode == 200) {
    //         console.log('Update patient 2: OK');
    //     } else {
    //         console.error('ERROR. Update patient 2 failed with statuscode ' + response.statusCode);
    //     }
    // })
    
    // await sleep(500);

    request.get('http://localhost:3000/patients/2', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get patient 2: OK');
        } else {
            console.error("ERROR. Get patient 2 failed with statuscode " + response.statusCode);
        }
    });
    
    // await sleep(500);

    // request.delete('http://localhost:3000/patients/2', function(err, response, body) {
    //     if (err) throw err;
    //     if (response.statusCode == 200) {
    //         console.log('Delete patient 2: OK');
    //     } else {
    //         console.error("ERROR. Delete patient 2 failed with statuscode " + response.statusCode)
    //     }
    // })
    
    await sleep(500);
}

module.exports = {testPatientEndpoint};