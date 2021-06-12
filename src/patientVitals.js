require('file-loader?name=[name].[ext]!./patientV.html'); 
import myProp from './patientOverview';
console.log(myProp)

var patientId;
var d =""
var prescription = ""
// console.log(`User: ${user.getName()}`);
// import myProp from './index.js';
// import { verifyPassword} from './index.js'
console.log("waaaaaaaaaa ik word gek")
console.log("test : 2");
// var patient = require('./index.js');

console.log("id check ")
var paragraph = document.getElementById("patID");
console.log("id check " )

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

receiveVitals("14")

function receiveVitals(pat) {
    var vitals = httpGet("http://localhost:3000/patients/" + pat)
    d = JSON.parse(vitals)
    console.log("te "+ vitals);
    console.log(d)
    patientId = d[0].person_id;
    console.log("te "+ patientId)
    
}
console.log(d[0].gender)
console.log(document.getElementById("idk"))

paragraph.textContent = "Patient: "+ patientId
var gen = document.getElementById("genInfo");
gen.setAttribute('style', 'white-space: pre;');
gen.textContent = "Full name: " + d[0].given_name + " " + d[0].family_name + "\r\n"
gen.textContent += "Gender: " + d[0].gender + "\r\n"
gen.textContent += "Birthdate: " + d[0].birthdate

receivePrescriptions("14")

function receivePrescriptions(pat) {
    var pres = httpGet("http://localhost:3000/prescriptions/" + pat)
    prescription = JSON.parse(pres)
    console.log("med "+ pres);
    showMed(prescription)
}

function showMed(data) {
    for (var i = 0; i < data.length; i++) {
        var med = document.getElementById("medInfo");
        med.setAttribute('style', 'white-space: pre;');
        med.textContent += "Name: " + prescription[i].name.toLowerCase() + "\r\n"
    }
}