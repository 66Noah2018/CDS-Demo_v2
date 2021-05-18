const express = require('express');
const router = express.Router();
const dbCon = require('../services/db').databaseConnection;

router.get('/:patientId', async function(req, res, next) {
    try {
        dbCon.execute(`SELECT * FROM patient_prescriptions WHERE iPatientId = ${req.params.patientId}`, function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    } catch (err) {
        console.error(`Error while getting measurements for patient with patientId ${req.params.patientId} `, err.message);
        next(err);
    }
});

// prescription input for following function is sql syntax
router.post('/:prescription', async function(req, res, next) {
    try {
        dbCon.execute(`INSERT INTO patient_prescriptions VALUES ${req.params.prescription}`, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.error(`Error while adding prescription `, err.message);
        next(err);
    }
});

module.exports = router;