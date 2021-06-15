const NSAIDS = [71617, 956, 738, 956, 436, 912, 263];
const PLATELET_LIMITS = [150000, 450000];

function getCard(plateletCount) {
    return {
        summary: `Low platelet count, prescribe other drug`,
        detail: `This patient's most recent platelet count is low (${plateletCount}), consider ordering a platelet count or CBC test or prescribe a painkiller that is not an NSAID`,
        indicator: 'warning',
        source: {
            label: "AAFP. NSAID Prescribing Precautions",
            url: "https://www.aafp.org/afp/2009/1215/p1371.html"
        }
    }
}

function plateletCountNormal(plateletCount) {
    if (plateletCount >= PLATELET_LIMITS[0] && plateletCount <= PLATELET_LIMITS[1]) return true;
    else if (plateletCount < PLATELET_LIMITS[0]) return -1; //plateletcount low
    else return 1; //plateletcount high
}

function payload(data) {
    // expected format: JSON with fields concept_id from drug and latest platelet value (latest_platelet_count)
    const PARSED_DATA = JSON.parse(data);
    if (PARSED_DATA.latest_platelet_count != -1 && plateletCountNormal(PARSED_DATA.latest_platelet_count) == -1 && NSAIDS.includes(PARSED_DATA.concept_id)) {
        return { cards: [getCard(PARSED_DATA.latest_platelet_count), PARSED_DATA] };
    } else return { cards: [] };
}

module.exports = {
    definition: {
        id: 'nsaid',
        name: 'Platelet NSAID interaction check',
        hook: 'nsaid',
        description: 'Checks the latest platelet measurement for non-normal values and warns prescriber of this when prescribing an NSAID',
        prefetch: {
            patient: 'patients/{{patient_id}}',
            drug: 'prescriptions/{{drug_id}}',
            latest_platelet_count: 'measurements/{{patient_id}}/platelets'
        }
    },
    fixedPayload: {
        cards: [{
            summary: 'Checks for platelet NSAID interactions',
            indicator: 'warning'
        }]
    },
    payload
}