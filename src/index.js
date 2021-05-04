require('file-loader?name=[name].[ext]!./index.html');

const heading = document.getElementById("heading");

if (heading != null) {
    heading.textContent = "hi";
}
