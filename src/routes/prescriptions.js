const express = require('express');
const router = express.Router();
const prescriptions = require('../services/prescriptions');

router.get('/:patientId', async function(req, res, next) {
    try {
        res.json(await prescriptions.getPrescriptions(req.params.patientId));
    } catch (err) {
        console.error(`Error while getting measurements for patient with patientId ${req.params.patientId} `, err.message);
        next(err);
    }
});

// prescription input for following function is stringified object
router.post('/:prescription', async function(req, res, next) {
    try {
        res.json(await prescriptions.addPrescription(req.params.patientId));
    } catch (err) {
        console.error(`Error while adding prescription `, err.message);
        next(err);
    }
});

module.exports = router;