const express = require('express');
const router = express.Router();
const patients = require('../services/patients');

router.get('/', async function(req, res, next) {
    try {
        res.json(await patients.getPatients());
    } catch (err) {
        console.error(`Error while getting patients `, err.message)
        next(err);
    }
});

router.get('/:patientId', async function(req, res, next) {
    try {
        res.json(await patients.getPatient(req.params.patientId));
    } catch (err) {
        console.error(`Error while getting patient with patientId ${req.params.patientId} `, err.message);
        next(err);
    }
});

// patient input for the following two functions is stringified object
router.post('/:patient', async function(req, res, next) {
    try {
        res.json(await patients.addPatient(req.params.patient));
    } catch (err) {
        console.error(`Error while adding new patient `, err.message);
        next(err);
    }
});

router.put('/:patient', async function(req, res, next) {
    try {
        res.json(await patients.updatePatient(req.params.patient));
    } catch (err) {
        console.error(`Error while updating patient `, err.message);
        next(err);
    }
});

router.delete('/:patientId', async function(req, res, next) {
    try {
        res.json(await patients.deletePatient(req.params.patientId));
    } catch (err) {
        console.error(`Error while deleting patient with patientId ${req.params.patientId} `, err.message);
        next(err);
    }
});

module.exports = router;