const request = require('request');
const sleep = require('./utils').sleep;

async function testDrugsEndpoint() {
    request.get('http://localhost:3000/drug', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get all drugs: OK');
        } else {
            console.error('ERROR. Get all drugs failed with statuscode ' + response.statusCode);
        }
    });

    await sleep(500);
    
    request.get('http://localhost:3000/highest_id', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get highest order_id: OK');
        } else {
            console.error('ERROR. Get highest order_id failed with statuscode ' + response.statusCode);
        }
    });

    await sleep(500);
}

module.exports = { testDrugsEndpoint }