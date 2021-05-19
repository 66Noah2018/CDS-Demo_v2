class Patient {
    constructor(iPatientId, sPatSex, dPatBirthDate, iPatPosition, sPatCodeActive, sPatTitel, sPatCategory, sPatNameUsage, sPatMaritalStatus, dPatDeceased, bPatDeceased, dDateRegistered, 
        dDateUnregistered, sReasonForLeaving, bDeleted) {
        this.iPatientId = iPatientId;
        this.sPatSex = sPatSex;
        this.dPatBirthDate = dPatBirthDate;
        this.iPatPosition = iPatPosition;
        this.sPatCodeActive = sPatCodeActive;
        this.sPatTitel = sPatTitel;
        this.sPatCategory = sPatCategory;
        this.sPatNameUsage = sPatNameUsage;
        this.sPatMaritalStatus = sPatMaritalStatus;
        this.dPatDeceased = dPatDeceased;
        this.bPatDeceased = bPatDeceased;
        this.dDateRegistered = dDateRegistered;
        this.dDateUnregistered = dDateUnregistered;
        this.sReasonForLeaving = sReasonForLeaving;
        this.bDeleted = bDeleted;
    }

    toString() {
        return JSON.stringify({
            "iPatientId": this.iPatientId,
            "sPatSex": this.sPatSex,
            "dPatBirthDate": this.dPatBirthDate,
            "iPatPosition": this.iPatPosition,
            "sPatCodeActive": this.sPatCodeActive,
            "sPatTitel": this.sPatTitel,
            "sPatCategory": this.sPatCategory,
            "sPatNameUsage": this.sPatNameUsage,
            "sPatMaritalStatus": this.sPatMaritalStatus,
            "dPatDeceased": this.dPatDeceased,
            "bPatDeceased": this.bPatDeceased,
            "dDateRegistered": this.dDateRegistered,
            "dDateUnregistered": this.dDateUnregistered,
            "sReasonForLeaving": this.sReasonForLeaving,
            "bDeleted": this.bDeleted
        });
    }

    patientToSql(type) {
        if (type == "add") {
            return `(${this.iPatientId},
                "${this.sPatSex}",
                "${this.dPatBirthDate}",
                ${this.iPatPosition},
                ${this.sPatCodeActive},
                ${this.sPatTitel},
                ${this.sPatCategory},
                ${this.sPatNameUsage},
                ${this.sPatMaritalStatus},
                ${this.dPatDeceased},
                ${this.bPatDeceased},
                ${this.dDateRegistered},
                ${this.dDateUnregistered},
                ${this.sReasonForLeaving},
                ${this.bDeleted})`;
        } else if (type == "update") {
            return `iPatientId = ${this.iPatientId},
                sPatSex = "${this.sPatSex}",
                dPatBirthDate = "${this.dPatBirthDate}",
                iPatPosition = ${this.iPatPosition},
                sPatCodeActive = ${this.sPatCodeActive},
                sPatTitel = ${this.sPatTitel},
                sPatCategory = ${this.sPatCategory},
                sPatNameUsage = ${this.sPatNameUsage},
                sPatMaritalStatus = ${this.sPatMaritalStatus},
                dPatDeceased = ${this.dPatDeceased},
                bPatDeceased = ${this.bPatDeceased},
                dDateRegistered = ${this.dDateRegistered},
                dDateUnregistered = ${this.dDateUnregistered},
                sReasonForLeaving = ${this.sReasonForLeaving},
                bDeleted = ${this.bDeleted}`;
        } else throw TypeError("Type for patientToSql was not add or update");
    }

    getPatientId() { return this.iPatientId; }
    getBirthDate() { return this.dPatBirthDate; }
    getPosition() { return this.iPatPosition; }
    getCodeActive() { return this.sPatCodeActive; }
    getTitel() { return this.sPatTitel; }
    getCategory() { return this.sPatCategory; }
    getNameUsage() { return this.sPatNameUsage; }
    getMaritalStatus() { return this.sPatMaritalStatus; }
    getDateDeceased() { return this.dPatDeceased; }
    getDeceased() { return this.bPatDeceased; }
    getDateRegistered() { return this.dDateRegistered; }
    getDateUnregistered() { return this.dDateUnregistered; }
    getReasonForLeaving() { return this.sReasonForLeaving; }
    getDeleted() { return this.bDeleted; }

    setBirthDate(birthDate) { this.dPatBirthDate = birthDate; }
    setPosition(position) { this.iPatPosition = position; }
    setCodeActive(codeActive) { this.sPatCodeActive = codeActive; }
    setTitel(titel) { this.sPatTitel = titel; }
    setCategory(category) { this.sPatCategory = category; }
    setNameUsage(nameUsage) { this.sPatNameUsage = nameUsage; }
    setMaritalStatus(maritalStatus) { this.sPatMaritalStatus = maritalStatus; }
    setDateDeceased(dateDeceased) { this.dPatDeceased = dateDeceased; }
    setDeceased(deceased) { this.bPatDeceased = deceased; }
    setDateRegistered(dateRegistered) { this.dDateRegistered = dateRegistered; }
    setDateUnregistered(dateUnregistered) { this.dDateUnregistered = dateUnregistered; }
    setReasonForLeaving(reasonForLeaving) { this.sReasonForLeaving = reasonForLeaving; }
    setDeleted(deleted) { this.bDeleted = deleted; }
}

function parsePatient(string) {
    return new Patient(string.iPatientId, string.sPatSex, string.dPatBirthDate, parseInt(string.iPatPosition), 
        string.sPatCodeActive, string.sPatTitel, string.sPatCategory, string.sPatNameUsage, string.sPatMaritalStatus, 
        string.dPatDeceased, string.bPatDeceased, string.dDateRegistered, string.dDateUnregistered, 
        string.sReasonForLeaving, string.bDeleted);
}

module.exports = {
    Patient: Patient,
    parsePatient
};