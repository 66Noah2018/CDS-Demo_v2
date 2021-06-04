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
    return xmlHttp.responseText;
}

// console.log("SDFJLSFJEKFJS");

//test for get all the patient data
data = httpGet("localhost:3000/")
console.log(data)
appendData(data)
heading.textContent = "";




//data opvragen met method! 

function appendData(data) {
    var mainContainer = document.getElementById("mydata");
    //append each person to the page
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
        mainContainer.appendChild(div);
    }
}


