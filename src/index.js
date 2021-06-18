require('file-loader?name=[name].[ext]!./front_end/index.html');
import './style.css';

const heading = document.getElementById("heading");
var data = "";
var patientId = "";

patientId = localStorage.getItem("patientID");





