const dateToString = require('../services/utils');

class Episode {
    constructor(iPatientId, iEpisodeId, sEpisodeTitle, 
        bInProblemEpisode, dEpisodeStartDate, dEpisodeEndDate, 
        sEpisodeICPC, bGeneral) {
        this.iPatientId = iPatientId;
        this.iEpisodeId = iEpisodeId;
        this.sEpisodeTitle = sEpisodeTitle;
        this.bInProblemEpisode = bInProblemEpisode;
        this.dEpisodeStartDate = dEpisodeStartDate;
        this.dEpisodeEndDate = dEpisodeEndDate;
        this.sEpisodeICPC = sEpisodeICPC;
        this.bGeneral = bGeneral;
    }

    toString() {
        return JSON.stringify({
            "iPatientId": this.iPatientId,
            "iEpisodeId": this.iEpisodeId,
            "sEpisodeTitle": this.sEpisodeTitle,
            "bInProblemEpisode": this.bInProblemEpisode,
            "dEpisodeStartDate": dateToString(this.dEpisodeStartDate),
            "dEpisodeEndDate": dateToString(this.dEpisodeEndDate),
            "sEpisodeICPC": this.sEpisodeICPC,
            "bGeneral": this.bGeneral
        });
    }

    episodeToSql(type) {
        if (type == "add") {
            return `iPatientId = ${this.iPatientId},
                iEpisodeId = ${this.iEpisodeId},
                sEpisodeTitle = ${this.sEpisodeTitle},
                bInProblemEpisode = ${this.bInProblemEpisode},
                dEpisodeStartdate = ${dateToString(this.dEpisodeStartDate)},
                dEpisodeEndDate = ${dateToString(this.dEpisodeEndDate)},
                sEpisodeICPC = ${this.sEpisodeICPC},
                bGeneral = ${this.bGeneral}`;
        } else if (type == "update") {
            return [`iEpisodeId = ${this.iEpisodeId},
                sEpisodeTitle = ${this.sEpisodeTitle},
                bInProblemEpisode = ${this.bInProblemEpisode},
                dEpisodeStartDate = ${dateToString(this.dEpisodeStartDate)},
                dEpisodeEndDate = ${dateToString(this.dEpisodeEndDate)},
                sEpisodeICPC = ${this.sEpisodeICPC},
                bGeneral = ${this.bGeneral}`, this.iPatientId];
        } else throw TypeError("Specified type for episodeToSql was not add or update");
    }

    getPatientId() { return this.iPatientId; }
    getEpisodeId() { return this.iEpisodeId; }
    getEpisodeTitle() { return this.sEpisodeTitle; }
    getBInProblemEpisode() { return this.bInProblemEpisode; }
    getEpisodeStartDate() { return this.dEpisodeStartDate; }
    getEpisodeEndDate() { return this.dEpisodeEndDate; }
    getEpisodeICPC() { return this.sEpisodeICPC; }
    getEpisodeGeneral() { return this.bGeneral; }

    setEpisodeTitle(episodeTitle) { this.sEpisodeTitle = episodeTitle; }
    setBInProblemEpisode(bInProblemEpisode) { this.bInProblemEpisode = bInProblemEpisode; }
    setEpisodeStartDate(startDate) { this.dEpisodeStartDate = startDate; }
    setEpisodeEndDate(endDate) { this.dEpisodeEndDate = endDate; }
    setEpisodeICPC(icpc) { this.sEpisodeICPC = icpc; }
    setEpisodeGeneral(general) { this.bGeneral = general; }
}

module.exports = Episode;