const getDateNow = require('../services/utils').getDateNow;
const uuid = require('uuid');

class Prescription {
    constructor(orderId, conceptId, patientId, name) {
        this.orderId = orderId;
        this.conceptId = conceptId;
        this.patientId = patientId;
        this.name = name;
    }

    prescriptionToSql() {
        return `(${this.orderId}, 2, ${this.conceptId}, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, '${getDateNow()}', 0, NULL, NULL, NULL, 
            ${this.patientId}, NULL, '${uuid.v4()}', 'ROUTINE', 'ORD-${this.orderId}', NULL, 'NEW', NULL, 1, NULL, NULL, NULL, NULL, NULL)`;
    }

    toString() {
        return JSON.stringify({"order_id": this.orderId, "concept_id": this.conceptId, "patient_id": this.patientId, "name": this.name});
    }
}

function parsePrescription(str) {
    const string = JSON.parse(str);
    return new Prescription(parseInt(string.order_id), parseInt(string.concept_id), parseInt(string.patient_id), string.name);
}

module.exports = {
    Prescription: Prescription,
    parsePrescription
};