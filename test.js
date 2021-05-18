const testPatientEndpoint = require('./test/patient').testPatientEndpoint;
const testPrescriptionEndpoint = require('./test/prescription').testPrescriptionEndpoint;
const testEpisodeEndpoint = require('./test/episode').testEpisodeEndpoint;
const testMeasurementEndpoint = require('./test/measurement').testMeasurementEndpoint;

async function testAll() {
    await testEpisodeEndpoint();
    await testMeasurementEndpoint();
    await testPatientEndpoint();
    await testPrescriptionEndpoint();
}

testAll();