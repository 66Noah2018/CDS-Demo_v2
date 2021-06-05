const testPatientEndpoint = require('./test/patient').testPatientEndpoint;
const testPrescriptionEndpoint = require('./test/prescription').testPrescriptionEndpoint;
const testMeasurementEndpoint = require('./test/measurement').testMeasurementEndpoint;
const testDrugsEndpoint = require('./test/drugs').testDrugsEndpoint;
const testClasses = require('./test/classes').testClasses;

async function testAll() {
    testClasses();
    await testDrugsEndpoint();
    await testMeasurementEndpoint();
    await testPatientEndpoint();
    await testPrescriptionEndpoint();
}

testAll();