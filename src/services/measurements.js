const db = require('./db');
const parseMeasurement = require('../types/measurement').parseMeasurement;

async function getMeasurements(patientId) {
    const rows = await db.query("SELECT * FROM measurement_values WHERE iPatientId = ?", patientId);
    let measurements = [];
    for (row in rows) {
        measurements = measurements.concat(parseMeasurement(row));
    }
    return measurements;
}

async function getMeasurement(measurementId) {
    const row = await db.query("SELECT * FROM measurement_values WHERE iMeasurementId = ?", measurementId);
    return parseMeasurement(row);
}

async function addMeasurement(measurement) {
    await db.query("INSERT INTO measurement_values VALUES ?", parseMeasurement(measurement).measurementToSql("add"));
}

async function updateMeasurement(measurement) {
    await db.query("UPDATE measurement_values SET ? WHERE iMeasurementId = ?", parseMeasurement(measurement).measurementToSql("update"));
}

async function deleteMeasurement(measurementId) {
    await db.query("DELETE FROM measurement_values WHERE iMeasurementId = ?", measurementId);
}

module.exports = {getMeasurements, getMeasurement, addMeasurement, updateMeasurement, deleteMeasurement}