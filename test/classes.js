const Measurement = require('../src/types/measurement').Measurement;
const parseMeasurement = require('../src/types/measurement').parseMeasurement;
const Patient = require('../src/types/patient').Patient;
const parsePatient = require('../src/types/patient').parsePatient;
const Prescription = require('../src/types/prescription').Prescription;
const parsePrescription = require('../src/types/prescription').parsePrescription;

function testClasses() {
    const testMeasurement = new Measurement(1, 1, 1, '2021-06-05 12:46:00', 10, 'test');
    const testPatient = new Patient(1, 'F', '2021-06-05 12:46:00', 0, '', 'test', '', '', 'patient', '');
    const testPrescription = new Prescription(1, 1, 1, 'test');
    
    const testMeasurementString = testMeasurement.toString();
    const testMeasurementParsed = parseMeasurement(testMeasurementString);
    if (JSON.stringify(testMeasurement) == JSON.stringify(testMeasurementParsed)) {
        console.log('Parse and toString Measurement: OK');
    } else {
        console.error('ERROR. Parse and toString Measurement failed: ', JSON.stringify(testMeasurementParsed));
    }

    const testPatientString = testPatient.toString();
    const testPatientParsed = parsePatient(testPatientString);
    if (JSON.stringify(testPatient) == JSON.stringify(testPatientParsed)) {
        console.log('Parse and toString Patient: OK');
    } else {
        console.error('ERROR. Parse and toString Patient failed: ', JSON.stringify(testPatientParsed));
    }

    const testPrescriptionString = testPrescription.toString();
    const testPrescriptionParsed = parsePrescription(testPrescriptionString);
    if (JSON.stringify(testPrescription) == JSON.stringify(testPrescriptionParsed)) {
        console.log('Parse and toString Prescription: OK');
    } else {
        console.error('ERROR. Parse and toString Prescription failed: ', JSON.stringify(testPrescriptionParsed));
    }
}

module.exports = { testClasses }