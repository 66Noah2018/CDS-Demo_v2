const db = require('./db');
const parseEpisode = require('../types/episode');

async function getEpisodes(patientId) {
    const rows = await db.query("SELECT * FROM episodes WHERE iPatientId = ?", [patientId]);
    let episodes = [];
    for (row in rows) {
        episodes = episodes.concat(parseEpisode(row));
    }
    return episodes;
}

async function getEpisode(episodeId) {
    const row = await db.query("SELECT * FROM episodes WHERE iEpisodeId = ?", [episodeId]);
    return parseEpisode(row);
}

async function addEpisode(episode) {
    await db.query("INSERT INTO episodes VALUES ?", parseEpisode(episode).episodeToSql("add"));
}

async function updateEpisode(episode) {
    await db.query("UPDATE episodes SET ? WHERE iEpisodeId = ?", parseEpisode(episode).episodeToSql("update"));
}

async function deleteEpisode(episodeId) {
    await db.query("DELETE FROM episodes WHERE iEpisodeId = ?", episodeId);
}

module.exports = {getEpisodes, getEpisode, addEpisode, updateEpisode, deleteEpisode}