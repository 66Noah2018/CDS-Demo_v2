function payload(patient) {
    var summary_payload = `Welcome ${JSON.parse(patient).givenName}`;
    return {
        cards: [{
            summary: summary_payload,
            indicator: 'info'
        }]
    };
}

module.exports = {
    definition: {
        id: 'greeter',
        name: 'Patient Greeter',
        hook: 'greeter',
        description: 'example hook that greets patient',
        prefetch: {
            patient: 'patients/{{patient_id}}'
        }
    },
    fixedPayload: {
        cards: [{
            summary: 'Greets patient',
            indicator: 'info'
        }]
    },
    payload
}