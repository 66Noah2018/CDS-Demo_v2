require('file-loader?name=[name].[ext]!./index.html');
import './style.css';
import './logo.png';

console.log("SDFJLSFJEKFJS");
const heading = document.getElementById("heading");
var data = "2";
console.log("SDFJLSFJEKFJS");
console.log("SDFJLSFJEKFJS");

function myFunction() {
    console.log("SDFJLSFJEKFJS");
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    // var myArr = xmlHttp.responseText;
    // console.log(myArr)
    return xmlHttp.responseText;
}

// console.log("SDFJLSFJEKFJS");

//test for get all the patient data
data = httpGet("http://localhost:3000/patients")
const d= JSON.parse(data)
console.log("testje: "+ data)
console.log(d[0].gender)
appendData(d)

function appendData(data) {
    var mainContainer = document.getElementById("patientData");
    console.log(mainContainer)
    //append each person to the page
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = 'Name: ' + data[i].person_id + ' ' + data[i].birthdate;
        mainContainer.appendChild(div);
    }
}


