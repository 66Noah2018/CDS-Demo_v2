const express = require('express');
const router = express.Router();
const episodes = require('../services/episodes');

router.get('/:patientId', async function(req, res, next) {
    try {
        res.json(await episodes.getEpisodes(req.params.patientId));
    } catch (err) { 
        console.error(`Error while getting episodes `, err.messsage);
        next(err);
    }
});

router.get('/:episodeId', async function(req, res, next) {
    try {
        res.json(await episodes.getEpisode(req.params.episodeId));
    } catch (err) {
        console.error(`Error while getting episode with episodeId ${req.params.episodeId} `, err.messsage);
        next(err);
    }
});

// episode input for the following two functions is stringified object
router.post('/:episode', async function(req, res, next) {
    try {
        res.json(await episodes.addEpisode(req.params.episode));
    } catch (err) {
        console.error(`Error while adding episode `, err.message);
        next(err);
    }
});

router.put('/:episode', async function(req, res, next) {
    try {
        res.json(await episodes.updateEpisode(req.params.episode));
    } catch (err) {
        console.error(`Error while updating episode `, err.message);
        next(err);
    }
});

router.delete('./:episodeId', async function (req, res, next) {
    try {
        res.json(await episodes.deleteEpisode(req.params.episodeId));
    } catch (err) {
        console.error(`Error while deleting episode with episodeId ${req.params.episodeId} `, err.message);
        next(err);
    }
});

module.exports = router;