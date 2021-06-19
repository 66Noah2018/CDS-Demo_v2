require('file-loader?name=[name].[ext]!./front_end/index.html');
import './style.css';

const getUuid = require('./services/utils').getUuid;

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function httpPost(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var serotoninModal = document.getElementById("serotoninModal");
var spanCritical = document.getElementById("closeModalSerotonin");
spanCritical.onclick = function() { serotoninModal.style.display = "none"; }
window.onclick = function(event) { 
    if (event.target == serotoninModal) { serotoninModal.style.display = "none"; }
}
var btnGoToPatient = document.getElementById("buttonGoToPatient");

function checkSerotoninSyndrome() {
    if (window.location.pathname == "/") {
        const patients = JSON.parse(httpGet('http://localhost:3000/patients'));
        var cards = [];
        var cardPatients = [];
        patients.forEach(patient => {
            var prescriptions = JSON.parse(httpGet('http://localhost:3000/prescriptions/' + patient.person_id));
            var card = JSON.parse(httpPost('http://localhost:3000/cds-services/serotoninSyndrome/' + JSON.stringify({
                "hook": "system-start",
                "hookInstance": getUuid(),
                "context": {
                    "prescriptions": prescriptions
                }
            }))).cards;
            cards.push(card);
            if (card.length > 0) {
                cardPatients.push(patient.person_id);
            }
        });
        const serotoninCard = cards.find(card => card[0])[0];
        if (serotoninCard) {
            const patientId = cardPatients[0];
            document.getElementById("serotoninModalTitle").textContent = serotoninCard.summary;
            document.getElementById("serotoninModalText").textContent = serotoninCard.detail;
            document.getElementById("serotoninModalSource").innerHTML = `<a href="${serotoninCard.source.url}">${serotoninCard.source.label}</a>`;
            serotoninModal.style.display = "block";
            btnGoToPatient.onclick = function() {
                localStorage.setItem("patientID", patientId);
                window.location.href = "patientV.html";
            }
        }
    }
}

checkSerotoninSyndrome();


