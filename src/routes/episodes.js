const express = require('express');
const router = express.Router();
const dbCon = require('../services/db').databaseConnection;

router.get('/patient/:patientId', async function(req, res, next) {
    try {
        dbCon.execute(`SELECT * FROM episodes WHERE iPatientId = ${req.params.patientId}`, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) { 
        console.error(`Error while getting episodes `, err.messsage);
        next(err);
    }
});

router.get('/:episodeId', async function(req, res, next) {
    try {
        dbCon.execute(`SELECT * FROM episodes WHERE iEpisodeId = ${req.params.episodeId}`, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.error(`Error while getting episode with episodeId ${req.params.episodeId} `, err.messsage);
        next(err);
    }
});

// episode input for the following two functions is sql syntax
router.post('/:episode', async function(req, res, next) {
    try {
        dbCon.execute(`INSERT INTO episodes VALUES ${req.params.episode}`, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.error(`Error while adding episode `, err.message);
        next(err);
    }
});

router.put('/:episodeId/:episode', async function(req, res, next) {
    try {
        dbCon.execute(`UPDATE episodes SET ${req.params.episode} WHERE iEpisodeId = ${req.params.episodeId}`, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.error(`Error while updating episode `, err.message);
        next(err);
    }
});

router.delete('/:episodeId', async function (req, res, next) {
    try {
        dbCon.execute(`DELETE FROM episodes WHERE iEpisodeId = ${req.params.episodeId}`, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.error(`Error while deleting episode with episodeId ${req.params.episodeId} `, err.message);
        next(err);
    }
});

module.exports = router;