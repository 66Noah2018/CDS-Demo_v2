require('file-loader?name=[name].[ext]!./patientV.html'); 

var patientId ="";
var d =""
var prescription = ""
var episodes = ""
var measurements = ""

patientId = localStorage.getItem("patientID");

var paragraph = document.getElementById("patID");

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function receiveVitals(pat) {
    var vitals = httpGet("http://localhost:3000/patients/" + pat)
    d = JSON.parse(vitals)
    patientId = d[0].person_id;    
}
receiveVitals(patientId)

paragraph.textContent = "Patient: "+ patientId
var gen = document.getElementById("genInfo");
gen.setAttribute('style', 'white-space: pre;');
var prefix = ""
if(d[0].prefix == null) {
    prefix = " "
} 
else {
    prefix = d[0].prefix + " "
}
gen.textContent = "Full name: " + d[0].given_name + " " + prefix + d[0].family_name + "\r\n"
gen.textContent += "Gender: " + d[0].gender + "\r\n"
gen.textContent += "Birthdate: " + d[0].birthdate.substring(0, 10)

function receivePrescriptions(pat) {
    var pres = httpGet("http://localhost:3000/prescriptions/" + pat)
    prescription = JSON.parse(pres)
    showMed(prescription)
}

receivePrescriptions(patientId)

function showMed(data) {
    for (var i = 0; i < data.length; i++) {
        var med = document.getElementById("medInfo");
        med.setAttribute('style', 'white-space: pre;');
        med.textContent += "Name: " + data[i].name.toLowerCase() + "\r\n"
    }
    if (data.length == 0) {
        var empty = document.getElementById("noMedfound");
        empty.textContent = "No prescriptions found"
    }
}
 
function showMeasurements(data) {
    for (var i = 0; i < data.length; i++) {
        var measurement = document.getElementById("measureInfo");
        measurement.setAttribute('style', 'white-space: pre;');
        measurement.textContent += "Name: " + data[i].name.toLowerCase() + " Value:  " + data[i].value_numeric + "\r\n"
    }
    if (data.length == 0) {
        var empty = document.getElementById("nofound");
        empty.textContent = "No measurements found"
    }
}

function receiveMeasurements(pat) {
    var measure = httpGet("http://localhost:3000/measurements/" + pat)
    measurements = JSON.parse(measure)
    localStorage.setItem('measurements', JSON.stringify(measurements))
    showMeasurements(measurements)
}
receiveMeasurements(patientId)



