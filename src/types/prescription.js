const dateToString = require('../services/utils').dateToString;
const parseDate = require('../services/utils').parseDate;

class Prescription {
    constructor(iPatientId, dPrescriptionDate, iNo, sUnits, 
        sLabel, sATKODE, dPrescriptionEndDate, sDosingCode, 
        bOpiumLaw, bChronic, bPrescribed, tDosingInstructions, 
        sATCCode, sHPCode, sPRCode, sGPCode) {
        this.iPatientId = iPatientId;
        this.dPrescriptionDate = dPrescriptionDate;
        this.iNo = iNo;
        this.sUnits = sUnits;
        this.sLabel = sLabel;
        this.sATKODE = sATKODE;
        this.dPrescriptionEndDate = dPrescriptionEndDate;
        this.sDosingCode = sDosingCode;
        this.bOpiumLaw = bOpiumLaw;
        this.bChronic = bChronic;
        this.bPrescribed = bPrescribed;
        this.tDosingInstructions = tDosingInstructions;
        this.sATCCode = sATCCode;
        this.sHPCode = sHPCode;
        this.sPRCode = sPRCode;
        this.sGPCode = sGPCode;
    }

    toString() {
        return JSON.stringify({
            "iPatientId": this.iPatientId,
            "dPrescriptionDate": this.dPrescriptionDate,
            "iNo": this.iNo,
            "sUnits": this.sUnits,
            "sLabel": this.sLabel,
            "sATKODE": this.sATKODE,
            "dPrescriptionEndDate": this.dPrescriptionEndDate,
            "sDosingCode": this.sDosingCode,
            "bOpiumLaw": this.bOpiumLaw,
            "bChronic": this.bChronic,
            "bPrescribed": this.bPrescribed,
            "tDosingInstructions": this.tDosingInstructions,
            "sATCCode": this.sATCCode,
            "sHPCode": this.sHPCode,
            "sPRCode": this.sPRCode,
            "sGPCode": this.sGPCode
        });
    }

    prescriptionToSql() {
        return `iPatientId = ${this.iPatientId},
            dPrescriptionDate = ${dateToString(this.dPrescriptionDate)},
            iNo = ${this.iNo},
            sUnits = ${this.sUnits},
            sLabel = ${this.sLabel},
            sATKODE = ${this.sATKODE},
            dPrescriptionEndDate = ${dateToString(this.dPrescriptionEndDate)},
            sDosingCode = ${this.sDosingCode},
            bOpiumLaw = ${this.bOpiumLaw},
            bChronic = ${this.bChronic},
            bPrescribed = ${this.bPrescribed},
            tDosingInstruction = ${this.tDosingInstructions},
            sATCCode = ${this.sATCCode},
            sHPCode = ${this.sHPCode},
            sPRCode = ${this.sPRCode},
            sGPCode = ${this.sGPCode}`;
    }

    getPatientId() { return this.iPatientId; }
    getPrescriptionDate() { return this.dPrescriptionDate; }
    getNo() { return this.iNo; }
    getUnits() { return this.sUnits; }
    getLabel() { return this.sLabel; }
    getATKODE() { return this.sATKODE; }
    getPrescriptionEndDate() { return this.dPrescriptionEndDate; }
    getDosingCode() { return this.sDosingCode; }
    getOpiumLaw() { return this.bOpiumLaw; }
    getChronic() { return this.bChronic; }
    getPrescribed() { return this.bPrescribed; }
    getDosingInstructions() { return this.tDosingInstructions; }
    getATCCode() { return this.sATCCode; }
    getHPCode() { return this.sHPCode; }
    getPRCode() { return this.sPRCode; }
    getGPCode() { return this.sGPCode; }

    setPresciptionDate(prescriptionDate) { this.dPrescriptionDate = prescriptionDate; }
    setNo(no) { this.iNo = no; }
    setUnits(units) { this.sUnits = units; }
    setLabel(label) { this.sLabel = label; }
    setATKODE(ATKODE) { this.sATKODE = ATKODE; }
    setPrescriptionEndDate(prescriptionEndDate) { this.dPrescriptionEndDate = prescriptionEndDate; }
    setDosingCode(dosingCode) { this.sDosingCode = dosingCode; }
    setOpiumLaw(opiumLaw) { this.bOpiumLaw = opiumLaw; }
    setChronic(chronic) {this.bChronic = chronic; }
    setPrescribed(prescribed) { this.bPrescribed = prescribed; }
    setDosingInstructions(dosingInstructions) { this.tDosingInstructions = dosingInstructions; }
    setATCCode(ATCCode) { this.sATCCode = ATCCode; }
    setHPCode(HPCode) { this.sHPCode = HPCode; }
    setPRCode(PRCode) { this.sPRCode = PRCode; }
    setGPCode(GPCode) { this.sGPCode = GPCode; }
}

function parsePrescription(string) {
    return new Prescription(string.iPatientId, parseDate(string.dPrescriptionDate), string.iNo, string.sUnits, string.sLabel, string.sATKODE, parseDate(string.dPrescriptionEndDate), 
        string.sDosingCode, string.bOpiumLaw, ParseInt(string.bChronic), ParseInt(string.bPrescribed), string.tDosingInstructions, string.sATCCode, string.sHPCode, string.sPRCode, 
        string.sGPCode);
}

module.exports = {
    Prescription: Prescription,
    parsePrescription
};