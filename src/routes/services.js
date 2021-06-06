const express = require('express');
const router = express.Router();
const path = require("path");

router.get('/', async function(req, res, next) {
    try {
        var services = ['greeter', 'nsaid', 'serotoninSyndrome'].map(function(item) {
            return require(path.join(__dirname, '..', 'fixtures/', item)).definition;
        })

        res.json(services);
        
    } catch (err) {
        console.error(`Error while getting cds services `, err.message);
        next(err);
    }
});

router.get('/:name', async function(req, res, next) {
    try{
        var fixture = require(path.join(__dirname, '..', 'fixtures/', req.params.name));
        res.json(fixture.fixedPayload)
    } catch (err) {
        console.error(`Error while getting service ` + req.params.name + ' ', err.message);
        next(err);
    }
});

router.post('/:name/:data', async function(req, res, next) {
    try {
        var fixture = require(path.join(__dirname, '..', 'fixtures/', req.params.name));
        res.json(fixture.payload(req.params.data));
    } catch (err) {
        console.error(`Error while calling service ${req.params.name} ${err.message}`);
        next(err);
    }
})

module.exports = router;