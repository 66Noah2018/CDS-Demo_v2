class Patient {
    constructor(personId, gender, birthdate, dead, prefix, givenName, middleName, familyNamePrefix, familyName, familyNameSuffix) {
        this.personId = personId;
        this.gender = gender;
        this.birthdate = birthdate;
        this.dead = dead;
        this.prefix = prefix;
        this.givenName = givenName;
        this.middleName = middleName;
        this.familyNamePrefix = familyNamePrefix;
        this.familyName = familyName;
        this.familyNameSuffix = familyNameSuffix;
    }

    getPersonId() { return this.personId; }
    getGender() { return this.gender; }
    getBirthdate() { return this.birthdate; }
    getDead() { return this.dead; }
    getPrefix() { return this.prefix; }
    getGivenName() { return this.givenName; }
    getMiddleName() { return this.middleName; }
    getFamilyNamePrefix() { return this.familyNamePrefix; }
    getFamilyName() { return this.familyName; }
    getFamilyNameSuffix() { return this.familyNameSuffix; }

    toString() {
        return JSON.stringify({"person_id": this.personId, "gender": this.gender, "birthdate": this.birthdate, "dead": this.dead, 
            "prefix": this.prefix, "given_name": this.givenName, "middle_name": this.middleName, 
            "family_name_prefix": this.familyNamePrefix, "family_name": this.familyName, "family_name_suffix": this.familyNameSuffix});
    }
}

function parsePatient(str) {
    const string = JSON.parse(str);
    return new Patient(parseInt(string.person_id), string.gender, string.birthdate, parseInt(string.dead), string.prefix, string.given_name, string.middle_name, string.family_name_prefix, string.family_name, string.family_name_suffix);
}

module.exports = {
    Patient: Patient,
    parsePatient
};