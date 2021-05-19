const request = require('request');
const episode = require('../src/types/episode').Episode;
const sleep = require('./utils').sleep;

async function testEpisodeEndpoint() {
    const testEpisode = new episode(17, 10011, "atrial fibrillation", 1, "2018-03-13 14:15:16", "2019-03-13 14:15:16", "K78.00", null);
    const testEpisode2 = new episode(17, 10011, "atrial fibrillation", 1, "2019-03-13 14:15:16", "2019-03-13 14:15:16", "K78.00", null);

    request.get('http://localhost:3000/episodes/patient/17', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get all episodes for patient 17: OK');
        } else {
            console.error('ERROR. Get all episodes for patient 17 failed with statuscode ' + response.statusCode);
        }
    })

    await sleep(500);

    request.get('http://localhost:3000/episodes/10010', function(err, response, body) {
        if (err) throw err;
        if (response.statusCode == 200) {
            console.log('Get episode 10010: OK');
        } else {
            console.error('ERROR. Get episode 10011 failed with statuscode ' + response.statusCode);
        }
    })
    
    await sleep(500);

    request.post('http://localhost:3000/episodes/' + testEpisode.episodeToSql('add'),
        {headers:{"Content-Type": "text/plain"}},
        function(err, response, body) {
            if (err) throw err;
            if (response.statusCode == 200) {
                console.log('Add episode: OK');
            } else {
                console.error('ERROR. Add episode failed with statuscode ' + response.statusCode);
            }
    })
    
    await sleep(500);

    request.put('http://localhost:3000/episodes/' + testEpisode.getEpisodeId() + '/' + testEpisode2.episodeToSql('update'),
        {headers:{"Content-Type": "text/plain"}},
        function(err, response, body) {
            if (err) throw err;
            if (response.statusCode == 200) {
                console.log('Update episode 10011: OK');
            } else {
                console.error('ERROR. Update Episode 10011 failed with statuscode ' + response.statusCode);
            }
    })
    
    await sleep(500);

    request.delete('http://localhost:3000/episodes/' + testEpisode.getEpisodeId(),
        {headers:{"Content-Type": "text/plain"}},
        function(err, response, body) {
            if (err) throw err;
            if (response.statusCode == 200) {
                console.log('Delete episode 10011: OK');
            } else {
                console.error('ERROR. Delete episode 10011 failed with statuscode ' + response.statusCode);
            }
    })
    
    await sleep(500);
}

module.exports = {testEpisodeEndpoint};