const SSRI_SNRI = [170000, 170001, 170002, 170003, 170004, 170005, 170006, 170007, 170008];
const DONT_COMBINE_WITH = [358];
const parsePrescription = require('../types/prescription').parsePrescription;

function getCard(ssriSnriPrescriptions, dontCombineWithPrescriptions) { //edit
    return {
        summary: `Risk for serotonin syndrome!`,
        detail: `This patient is using the following SSRIs and/or SNRIs in combination with ${dontCombineWithPrescriptions[0]}: ${ssriSnriPrescriptions.join(', ')}. This combination could lead to serotonin syndrom and possibly death!`,
        indicator: 'critical',
        source: {
            label: "Medscape. Dangerous and Deadly Drug Combinations",
            url: "https://www.medscape.com/features/slideshow/dangerous-drug-combinations#page=4"
        }
    }
}

function payload(data) {
    //expected format: JSON with array of prescriptions (toString)
    const PARSED_DATA = JSON.parse(data);
    let ssriSnriPrescriptions = [];
    let dontCombineWithPrescriptions = [];
    for (i in PARSED_DATA.prescriptions) {
        let prescription = parsePrescription(JSON.stringify(PARSED_DATA.prescriptions[i]));
        if (SSRI_SNRI.includes(prescription.getConceptId())) ssriSnriPrescriptions.push(prescription.getName());
        else if (DONT_COMBINE_WITH.includes(prescription.getConceptId())) dontCombineWithPrescriptions.push(prescription.getName());
    };

    if (ssriSnriPrescriptions.length > 0 && dontCombineWithPrescriptions.length > 0) {
        return { cards: [getCard(ssriSnriPrescriptions, dontCombineWithPrescriptions)] };
    } else {
        return { cards: [] };
    }
}

module.exports = {
    definition: {
        id: 'serotonin',
        name: 'Serotonin syndrome risk checker',
        hook: 'serotonin',
        description: 'Iterates through a patients prescriptions to detect drug combinations that could lead to serotonin syndrome',
        prefetch: {
            patient: 'patients/{{patient_id}}',
            drug: 'prescriptions/{{drug_id}}'
        }
    },
    fixedPayload: {
        cards: [{
            summary: 'Checks for drug combinations that could lead to serotonin syndrome',
            indicator: 'critical'
        }]
    },
    payload
}