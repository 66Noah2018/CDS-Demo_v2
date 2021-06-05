class Measurement {
    constructor(obsId, personId, conceptId, obsDatetime, valueNumeric, name) {
        this.obsId = obsId;
        this.personId = personId;
        this.conceptId = conceptId;
        this.obsDatetime = obsDatetime;
        this.valueNumeric = valueNumeric;
        this.name = name;
    }

    getObsId() { return this.obsId; }
    getPersonId() { return this.personId; }
    getConceptId() { return this.conceptId; }
    getObsDatetime() { return this.obsDatetime; }
    getValueNumeric() { return this.valueNumeric; }
    getName() { return this.name; }    

    toString() {
        return JSON.stringify({"obs_id": this.obsId, "person_id": this.personId, "concept_id": this.conceptId, 
            "obs_datetime": this.obsDatetime, "value_numeric": this.valueNumeric, "name": this.name});
    }
}

function parseMeasurement(str) {
    const string = JSON.parse(str);
    return new Measurement(parseInt(string.obs_id), parseInt(string.person_id), parseInt(string.concept_id), string.obs_datetime, parseInt(string.value_numeric), string.name);
}

module.exports = {
    Measurement: Measurement,
    parseMeasurement
};