require('file-loader?name=[name].[ext]!./medicationView.html'); 
const prescription = require('.././types/prescription').Prescription;
const getUuid = require('../services/utils').getUuid;

var drugs = ""
var allMedication = []
var highest_id = -1

var patient = localStorage.getItem("patientID");

document.getElementById("patID").textContent = "Patient: "+ patient;

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

function receiveDrugs() {
    var drug = httpGet("http://localhost:3000/drug")
    drugs = JSON.parse(drug)
    showDrugs(drugs)
}
receiveDrugs()

function getHighestId() {
    var highest = httpGet("http://localhost:3000/highest_id")
    highest_id = JSON.parse(highest)
    return parseInt(highest_id[0]["max(order_id)"])
}


function showDrugs(data) {
    var container = document.getElementById("datalistOptions");
    for (var i = 0; i < data.length; i++) {
        var opt = document.createElement("option");
        opt.value = data[i].name.toLowerCase();
        opt.setAttribute("title", ""+i);
        container.appendChild(opt);
        allMedication[data[i].name.toLowerCase()] = new prescription(getHighestId()+1, data[i].concept_id, patient, data[i].name)
    }
}

function getLatestPlateletCount() {
    var latestPlatelet = JSON.parse(httpGet("http://localhost:3000/measurements/measurement/" + patient + "/latest/729"));
    return latestPlatelet[0] ? latestPlatelet[0].value_numeric : -1;
}

function getSelectedMedication(){
    var container = document.getElementById("but");
    var button = document.createElement("button");
    button.className ="btn btn-secondary"
    button.type = "submit"
    button.textContent = "Prescribe medication"

    container.appendChild(button);
    button.onclick = function getMedication() {
        var val = document.getElementById("exampleDataList").value;
        const selectedDrug = drugs.find(drug => {
            return drug.name.toLowerCase() == val.toLowerCase(); });
        const latestPlateletCount = getLatestPlateletCount();
        const nsaidCard = JSON.parse(httpPost('http://localhost:3000/cds-services/nsaid/' + JSON.stringify({
            "hook": "medication-prescribe",
            "hookInstance": getUuid(),
            "context" : {
                "concept_id": selectedDrug.concept_id, 
                "latest_platelet_count": latestPlateletCount
            }
        }))).cards[0]; 
        if (nsaidCard) {
            document.getElementById("nsaidModalTitle").textContent = nsaidCard.summary;
            document.getElementById("nsaidModalText").textContent = nsaidCard.detail;
            document.getElementById("nsaidModalSource").innerHTML = `<a href="${nsaidCard.source.url}">${nsaidCard.source.label}</a>`;
            nsaidModal.style.display = "block";

            document.getElementById("buttonContinue").onclick = function() {
                nsaidModal.style.display = "none";
                httpPost('http://localhost:3000/prescriptions/' + allMedication[val].prescriptionToSql());
                alert("Successfully prescribed " + val + " for patient " + patient);
            }
        } else {
            httpPost('http://localhost:3000/prescriptions/' + allMedication[val].prescriptionToSql());
            alert("Successfully prescribed " + val + " for patient " + patient);
        }
    }
}

getSelectedMedication()

var nsaidModal = document.getElementById("nsaidModal");
var spanWarning = document.getElementById("closeModalNsaid");
var btnCancel = document.getElementById("buttonCancel");
spanWarning.onclick = function() { nsaidModal.style.display = "none"; }
window.onclick = function (event) {
    if (event.target == nsaidModal) { nsaidModal.style.display = "none"; }
}
btnCancel.onclick = function() { nsaidModal.style.display = "none"; }
