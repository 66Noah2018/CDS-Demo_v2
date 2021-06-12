import './style.css';
import './logo.png';

console.log("tesjesstesttjes");
console.log("waaaaaaaaaa ik word gek2")
console.log("test : 4");
var patient = require('./index.js');


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


