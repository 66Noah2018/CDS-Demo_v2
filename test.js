const testPatientEndpoint = require('./test/patient').testPatientEndpoint;
const testPrescriptionEndpoint = require('./test/prescription').testPrescriptionEndpoint;
const testMeasurementEndpoint = require('./test/measurement').testMeasurementEndpoint;

async function testAll() {
    await testMeasurementEndpoint();
    await testPatientEndpoint();
    await testPrescriptionEndpoint();
}

testAll();