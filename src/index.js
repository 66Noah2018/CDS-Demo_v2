require('file-loader?name=[name].[ext]!./index.html');
import './style.css';
var myProp = "test";
export default myProp;

const heading = document.getElementById("heading");
var data = "2";
var patientId = "";

patientId = localStorage.getItem("patientID");
console.log("hlallo?" + patientId)

function myFunction() {
    console.log("!");
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// console.log("SDFJLSFJEKFJS");

//test for get all the patient data
document.getElementById('test').onClick = getAllData()

function getAllData() {
    data = httpGet("http://localhost:3000/patients")
    const d= JSON.parse(data)
    console.log("testje: "+ data)
    console.log(d[0].gender)
    appendData(d)
}

    
function appendData(data) {
    var mainContainer = document.getElementById("patientData");
    console.log(mainContainer)
    //append each person to the page
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.className = "list-group-item list-group-item-action"
        div.innerHTML = '<b>Patient ID: </b>' + data[i].person_id + ',<b> Family name: </b>' + data[i].family_name;
        div.id = "" + data[i].person_id
        div.onclick = function getVitals() {
            console.log("tesklik")
            console.log("check "+ this.id)
            var pat = parseInt(this.id)
            patientId = pat
            console.log("check "+ pat)
            console.log("check hallo")
            localStorage.setItem("patientID", pat);
            receiveVitals(pat)
            showPat();
        }
        mainContainer.appendChild(div);
    }
    console.log("finished")
}

function receiveVitals(pat) {
    var vitals = httpGet("http://localhost:3000/patients/" + pat)
    const d= JSON.parse(vitals)
    console.log("te "+ vitals)
    patientId = d.person_id;
    
}
console.log("komt ie uberhaupt hier dan")

function showPat() {
    console.log("ttt: " + patientId)
    location.href = 'patientV.html';
    console.log("testttt")
    var paragraph = document.getElementById("patID");
    paragraph.textContent += patientId;
}

patientId = localStorage.getItem("patientID");




