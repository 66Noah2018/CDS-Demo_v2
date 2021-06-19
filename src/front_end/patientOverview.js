require('file-loader?name=[name].[ext]!./medicationView.html'); 
const prescription = require('.././types/prescription').Prescription;
import '.././style.css';

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

function getSelectedMedication(){
    var container = document.getElementById("but");
    var button = document.createElement("button");
    button.className ="btn btn-secondary"
    button.type = "submit"
    button.textContent = "Prescribe medication"

    container.appendChild(button);
    button.onclick = function getMedication() {
        var val = document.getElementById("exampleDataList")
        httpPost('http://localhost:3000/prescriptions/' + allMedication[val.value].prescriptionToSql())
        alert("Successfully prescribed " + val.value + " for patient " + patient);
    }
}

getSelectedMedication()
