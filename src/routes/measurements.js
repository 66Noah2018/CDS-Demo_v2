const express = require('express');
const router = express.Router();
const measurements = require('../services/measurements');

router.get('/:patientId', async function(req, res, next) {
    try {
        res.json(await measurements.getMeasurements(req.params.patientId));
    } catch (err) {
        console.error(`Error while getting measurements for patient with patientId ${req.params.patientId} `, err.message);
        next(err);
    }
});

router.get('/:measurementId', async function(req, res, next) {
    try {
        res.json(await measurements.getMeasurement(req.params.measurementId));
    } catch (err) {
        console.error(`Error while getting measurement with measurementId ${req.params.measurementId} `, err.message);
        next(err);
    }
});

// measurement input for the following two functions is stringified object
router.post('/:measurement', async function(req, res, next) {
    try {
        res.json(await measurements.addMeasurement(req.params.measurement));
    } catch (err) {
        console.error(`Error while adding new measurement `, err.message);
        next(err);
    }
});

router.put('/:measurement', async function(req, res, next) {
    try {
        res.json(await measurements.updateMeasurement(req.params.measurement));
    } catch (err) {
        console.error(`Error while updating measurement `, err.message);
        next(err);
    }
});

router.delete('/:measurementId', async function(req, res, next) {
    try {
        res.json(await measurements.deleteMeasurement(req.params.measurementId));
    } catch (err) {
        console.error(`Error while deleting measurement with measurementId ${req.params.measurementId} `, err.message);
        next(err);
    }
});

module.exports = router;