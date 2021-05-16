const express = require('express');
const router = express.Router();
const dbCon = require('../services/db').databaseConnection;

router.get('/:patientId', async function(req, res, next) {
    try {
        dbCon.execute(`SELECT * FROM measurement_values WHERE iPatientId = ${req.params.patientId}`, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.error(`Error while getting measurements for patient with patientId ${req.params.patientId} `, err.message);
        next(err);
    }
});

router.get('/:patientId/:measurementId', async function(req, res, next) {
    try {
        dbCon.execute(`SELECT * FROM measurement_values WHERE iPatientId = ${req.params.patientId} AND iMeasurementId = ${req.params.measurementId}`, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.err(`Error while getting measurements with measurementId ${req.params.measurementId} for patient with patientId ${req.params.patientId}`, err.message);
        next(err);
    }
})

// measurement input for the following function is sql syntax
router.post('/:patientId/:measurement', async function(req, res, next) {
    try {
        dbCon.execute(`INSERT INTO measurement_values VALUES ${req.params.measurement} WHERE iPatientId = ${req.params.patientId}`, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.error(`Error while adding new measurement `, err.message);
        next(err);
    }
});

module.exports = router;