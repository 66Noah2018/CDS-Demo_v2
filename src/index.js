require('file-loader?name=[name].[ext]!./index.html');
import './style.css';
import './logo.png';

const heading = document.getElementById("heading");

if (heading != null) 
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

