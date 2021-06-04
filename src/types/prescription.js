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
}

function parsePrescription(string) {
    return new Prescription(ParseInt(string.order_id), ParseInt(string.concept_id), ParseInt(string.patient_id), string.name);
}

module.exports = {
    Prescription: Prescription,
    parsePrescription
};