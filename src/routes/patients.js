const express = require('express');
const router = express.Router();
const dbCon = require('../services/db').databaseConnection;

router.get('/', async function(req, res, next) {
    try {
        // res.json(await patients.getPatients());
        dbCon.execute("SELECT * FROM patients", function(err, result) {
            if (err) throw err;
            res.json(result);
            console.log(result)
        })
    } catch (err) {
        console.error(`Error while getting patients `, err.message)
        next(err);
    }
});

router.get('/:patientId', async function(req, res, next) {
    try {
        dbCon.execute(`SELECT * FROM patients WHERE iPatientId = ${req.params.patientId}`, function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    } catch (err) {
        console.error(`Error while getting patient with patientId ${req.params.patientId} `, err.message);
        next(err);
    }
});

// patient input for the following two functions is sql syntax!
router.post('/:patient', async function(req, res, next) {
    try {
        dbCon.execute(`INSERT INTO patients VALUES ${req.params.patient}`, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.error(`Error while adding new patient `, err.message);
        next(err);
    }
});

router.put('/:patientId/:patient', async function(req, res, next) {
    try {
        dbCon.execute(`UPDATE patients SET ${req.params.patient} WHERE iPatientId = ${req.params.patientId}`, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.error(`Error while updating patient `, err.message);
        next(err);
    }
});

router.delete('/:patientId', async function(req, res, next) {
    try {
        dbCon.execute(`DELETE FROM patients WHERE iPatientId = ${req.params.patientId}`, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.error(`Error while deleting patient with patientId ${req.params.patientId} `, err.message);
        next(err);
    }
});

module.exports = router;