const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require("path");

router.get('/', async function(req, res, next) {
    try {
        fs.readdirSync(path.join(__dirname, '..', 'fixtures/'), 'utf-8', function(err, items) {
            var files = items.map(function(item) {
                return item.definition;
            });
        })
        res.json(files);
    } catch (err) {
        console.error(`Error while getting cds services `, err.message);
        next(err);
    }
});

router.get('/:name', async function(req, res, next) {
    try{
        var fixture = require('../fixtures/' + req.params.name);
        res.json(fixture.payload)
    } catch (err) {
        console.error(`Error while getting service ` + req.params.name + ' ', err.message);
        next(err);
    }
})

module.exports = router;