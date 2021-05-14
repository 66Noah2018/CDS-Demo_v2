const prompt = require('prompt');
const fs = require('fs');
let properties;
let questions = {
    properties: {
        databaseUser: {
            description: "Enter the database user (default = root): ",
            type: 'string',
            default: 'root'
        },
        databasePassword: {
            description: "Enter the database password (default = ''): ",
            type: 'string',
            hidden: true,
            default: ''
        },
        databasePort: {
            description: "Enter the localhost port on which MySQL runs (default = 3306): ",
            type: 'integer',
            default: 3306
        }
    }
};

prompt.start();
prompt.get(questions, function (err, result) {
    if (err) { throw err }
    properties = `{
        "dbUser": "${result.databaseUser}",
        "dbPassword": "${result.databasePassword}",
        "dbPort": ${result.databasePort}
    }`
    fs.writeFile(__dirname + '/runtime-properties.json', properties, function (err) {
        if (err) throw err;
        console.info("Runtime properties created");
    });
});