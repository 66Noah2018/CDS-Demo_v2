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
}

function parseMeasurement(string) {
    return new Measurement(ParseInt(string.obs_id), ParseInt(string.person_id), ParseInt(string.concept_id), obs_datetime, ParseInt(string.value_numeric), string.name);
}

module.exports = {
    Measurement: Measurement,
    parseMeasurement
};