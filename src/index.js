require('file-loader?name=[name].[ext]!./front_end/index.html');
import './style.css';

const heading = document.getElementById("heading");
var data = "";
var patientId = "";

patientId = localStorage.getItem("patientID");

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

document.getElementById('test').onClick = getAllData()

function getAllData() {
    data = httpGet("http://localhost:3000/patients")
    const d= JSON.parse(data)
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
            var pat = parseInt(this.id)
            patientId = pat
            localStorage.setItem("patientID", pat);
            receiveVitals(pat)
            showPat();
        }
        mainContainer.appendChild(div);
    }
}

function receiveVitals(pat) {
    var vitals = httpGet("http://localhost:3000/patients/" + pat)
    const d= JSON.parse(vitals)
    patientId = d.person_id;
    
}

function showPat() {
    location.href = 'patientV.html';
    var paragraph = document.getElementById("patID");
    paragraph.textContent += patientId;
}

patientId = localStorage.getItem("patientID");




