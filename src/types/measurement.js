class Measurement {
    constructor(iPatientId, sMemoCode, sMaterial, sReqDate, sDescription, sDescriptionShort, sMVResult, bNotNormal, iLowLimit, iHighLimit, tComment, iMeasurementId, iLabCode) {
        this.iPatientId = iPatientId;
        this.sMemoCode = sMemoCode;
        this.sMaterial = sMaterial;
        this.sReqDate = sReqDate;
        this.sDescription = sDescription;
        this.sDescriptionShort = sDescriptionShort;
        this.sMVResult = sMVResult;
        this.bNotNormal = bNotNormal;
        this.iLowLimit = iLowLimit;
        this.iHighLimit = iHighLimit;
        this.tComment = tComment
        this.iMeasurementId = iMeasurementId;
        this.iLabCode = iLabCode;
    }

    toString() {
        return JSON.stringify({
            "iPatientId": this.iPatientId,
            "sMemoCode": this.sMemoCode,
            "sMaterial": this.sMaterial,
            "sReqDate": this.sReqDate,
            "sDescription": this.sDescription,
            "sDescriptionShort": this.sDescriptionShort,
            "sMVResult": this.sMVResult,
            "bNotNormal": this.bNotNormal,
            "iLowLimit": this.iLowLimit,
            "iHighLimit": this.iHighLimit,
            "tComment": this.tComment,
            "iMeasurementId": this.iMeasurementId,
            "iLabCode": this.iLabCode
        });
    }

    measurementToSql() {
        return `(${this.iPatientId},
            "${this.sMemoCode}",
            "${this.sMaterial}",
            "${this.sReqDate}",
            "${this.sDescription}",
            "${this.sDescriptionShort}",
            "${this.sMVResult}",
            ${this.bNotNormal},
            "${this.iLowLimit}",
            "${this.iHighLimit}",
            "${this.tComment}",
            "${this.iMeasurementId}",
            "${this.iLabCode}")`;
    }

    getPatientId() { return this.iPatientId; }
    getMemoCode() { return this.sMemoCode; }
    getMaterial() { return this.sMaterial; }
    getReqDate() { return this.sReqDate; }
    getDescription() { return this.sDescription; }
    getDescriptionShort() { return this.sDescriptionShort; }
    getMVResult() { return this.sMVResult; }
    getNotNormal() { return this.bNotNormal; }
    getLowLimit() { return this.iLowLimit; }
    getHighLimit() { return this.iHighLimit; }
    getComment() { return this.tComment; }
    getMeasurementId() { return this.iMeasurementId; }
    getLabCode() { return this.iLabCode; }

    setMemoCode(memoCode) { this.sMemoCode = memoCode; }
    setMaterial(material) { this.sMaterial = material; }
    setReqDate(reqDate) { this.sReqDate = reqDate; }
    setDescription(description) { this.sDescription = description; }
    setDescriptionShort(descriptionShort) { this.sDescriptionShort = descriptionShort; }
    setMVResult(MVResult) { this.sMVResult = MVResult; }
    setNotNormal(notNormal) { this.bNotNormal = notNormal; }
    setLowLimit(lowLimit) { this.iLowLimit = lowLimit; }
    setHighLimit(highLimit) { this.iHighLimit = highLimit; }
    setTComment(comment) { this.tComment = comment; }
    setLabCode(labCode) { this.iLabCode = labCode; }
}

function parseMeasurement(string) {
    return new Measurement(string.iPatientId, string.sMemoCode, string.sMaterial, string.sReqDate, string.sDescription, string.sDescriptionShort, string.sMVResult, 
        ParseInt(string.bNotNormal), string.iLowLimit, string.iHighLimit, string.tComment, string.iMeasurementId, string.iLabCode);
}

module.exports = {
    Measurement: Measurement,
    parseMeasurement
};