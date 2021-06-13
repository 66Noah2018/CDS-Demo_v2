require('file-loader?name=[name].[ext]!./medicationView.html'); 
const prescription = require('../src/types/prescription').Prescription;

var drugs = ""
var allMedication = []
var highest_id

var patient = localStorage.getItem("patientID");

document.getElementById("patID").textContent = "Patient: "+ patient;

console.log("id "+patient)

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

receiveDrugs()

function receiveDrugs() {
    var drug = httpGet("http://localhost:3000/drug")
    drugs = JSON.parse(drug)
    console.log("testdrugs "+ drug);
    showDrugs(drugs)
}

// getId()

function getId() {
    var highest = httpGet("http://localhost:3000/highest_id")
    highest_id = JSON.parse(highest)
    console.log("hoogste id " + highest_id[0]["max(order_id)"])
    return parseInt(highest_id[0]["max(order_id)"])
}


function showDrugs(data) {
    var container = document.getElementById("datalistOptions");
    for (var i = 0; i < data.length; i++) {
        var opt = document.createElement("option");
        opt.value = data[i].name.toLowerCase();
        opt.setAttribute("title", ""+i);
        console.log(opt)
        container.appendChild(opt);
        console.log("wat is dit "+ data[i].orderId)
        allMedication[data[i].name.toLowerCase()] = new prescription(getId()+1, data[i].concept_id, patient, data[i].name)

}
}

getSelectedMedication()

function getSelectedMedication(){
    var container = document.getElementById("but");
    var button = document.createElement("button");
    button.className ="btn btn-secondary"
    button.type = "submit"
    button.textContent = "Prescribe medication"

    container.appendChild(button);
    button.onclick = function getMedication() {
        var val = document.getElementById("exampleDataList")
        console.log("value "+ val.value)
        console.log("ud " + val.title)
        console.log("ik hoop het " + allMedication[val.value])

        httpPost('http://localhost:3000/prescriptions/' + allMedication[val.value].prescriptionToSql())
        alert("Successfully prescribed " + val.value);

    }

}


