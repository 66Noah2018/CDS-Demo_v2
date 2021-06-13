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

receiveVitals(patientId)

function receiveVitals(pat) {
    var vitals = httpGet("http://localhost:3000/patients/" + pat)
    d = JSON.parse(vitals)
    patientId = d[0].person_id;    
}

paragraph.textContent = "Patient: "+ patientId
var gen = document.getElementById("genInfo");
gen.setAttribute('style', 'white-space: pre;');
gen.textContent = "Full name: " + d[0].given_name + " " + d[0].family_name + "\r\n"
gen.textContent += "Gender: " + d[0].gender + "\r\n"
gen.textContent += "Birthdate: " + d[0].birthdate.substring(0, 10)

receivePrescriptions(patientId)

function receivePrescriptions(pat) {
    var pres = httpGet("http://localhost:3000/prescriptions/" + pat)
    prescription = JSON.parse(pres)
    showMed(prescription)
}

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

//doet het niet! wordt ook niet getest ergens...
function receiveEpisodes(pat) {
    var epi = httpGet("http://localhost:3000/episodes/patient" + pat)
    episodes = JSON.parse(epi)
    showEpisode(episodes)
}

function showEpisode(data) {
    for (var i = 0; i < data.length; i++) {
        var episode = document.getElementById("epiInfo");
        episode.setAttribute('style', 'white-space: pre;');
        episode.textContent += "Name: " + data[i].episodeId.toLowerCase() + "\r\n"
    }
}

receiveMeasurements(patientId)

function receiveMeasurements(pat) {
    var measure = httpGet("http://localhost:3000/measurements/" + pat)
    measurements = JSON.parse(measure)
    showMeasurements(measurements)
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

