const db = require('./db');
const parsePatient = require('../types/patient');

async function getPatients() {
    const rows = await db.query("SELECT * FROM patients");
    let patients = [];
    for (row in rows) {
        patients = patients.concat(parsePatient(row));
    }
    return patients;
}

async function getPatient(patientId) {
    const row = await db.query("SELECT * FROM patients WHERE iPatientId = ?", patientId);
    return parsePatient(row);
}

async function addPatient(patient) {
    await db.query("INSERT INTO patients VALUES ?", parsePatient(patient).patientToSql("add"));
}

async function updatePatient(patient) {
    await db.query("UPDATE patients SET ? WHERE iPatientId = ?", parsePatient(patient).patientToSql("update"));
}

async function deletePatient(patientId) {
    await db.query("DELETE FROM patients WHERE iPatientId = ?", patientId);
}

module.exports = {getPatients, getPatient, addPatient, updatePatient, deletePatient}