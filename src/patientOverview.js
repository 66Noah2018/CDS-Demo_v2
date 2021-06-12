require('file-loader?name=[name].[ext]!./medicationView.html'); 
var myProp = "test";
export default myProp;
var drugs = ""

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

receiveDrugs()

function receiveDrugs() {
    var drug = httpGet("http://localhost:3000/drug")
    drugs = JSON.parse(drug)
    console.log("testdrugs "+ drugs);
    showDrugs(drugs)
}

function showDrugs(data) {
    var container = document.getElementById("datalistOptions");
    for (var i = 0; i < data.length; i++) {
        var opt = document.createElement("option");
        opt.value = data[i].name.toLowerCase();
        console.log(opt)
        container.appendChild(opt);
        // var med = document.getElementById("option");
        // med.setAttribute('style', 'white-space: pre;');
        // med.textContent += data[i].name.toLowerCase() + "\r\n"
    }
}