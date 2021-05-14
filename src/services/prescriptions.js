const db = require('./db');
const parsePrescription = require('../types/prescription').parsePrescription;

async function getPrescriptions(patientId) {
    const rows = await db.query("SELECT * FROM patient_prescriptions WHERE iPatientId = ?", patientId);
    let prescriptions = [];
    for (row in rows) {
        prescriptions = prescriptions.concat(parsePrescription(row));
    }
    return prescriptions;
}

async function addPrescription(prescription) {
    await db.query("INSERT INTO patient_prescriptions VALUES ?", prescription.prescriptionToSql());
}

module.exports = {getPrescriptions, addPrescription}