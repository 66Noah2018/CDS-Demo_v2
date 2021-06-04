const express = require('express');
const router = express.Router();
const dbCon = require('../services/db').databaseConnection;

router.get('/:patientId', async function(req, res, next) {
    try {
        dbCon.execute("SELECT order_id, orders.concept_id, patient_id, name FROM orders INNER JOIN concept_name WHERE orders.concept_id = concept_name.concept_id AND patient_id = " + req.params.patientId + ";", function(err, result) {
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
        dbCon.execute("INSERT INTO `orders` VALUES " + req.params.prescription + ";", function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.error(`Error while adding prescription `, err.message);
        next(err);
    }
});

router.delete('/:prescriptionId', async function(req, res, next) {
    try {
        dbCon.execute("DELETE FROM `orders` WHERE order_id = " + req.params.prescriptionId + ";", function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.error(`Error while deleting prescription ${req.params.prescriptionId} `, err.message);
        next(err);
    }
})

module.exports = router;