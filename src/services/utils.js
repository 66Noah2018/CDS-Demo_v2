const readline = require('readline');
const inquirer = require('inquirer');

function dateToString(date) {
    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }));
}

async function getUserInputProperties() {
    let userAnswer = await askQuestion("Database user (default = root): ");
    let passwordAnswer = await askQuestion("Database password (default = \"\"): ");
    let portAnswer = await askQuestion("On which localhost port does MySQL run? (default = 3306) ");

    return `{
        "dbUser": ${userAnswer?userAnswer:"root"},
        "dbPassword": ${passwordAnswer?passwordAnswer: ""},
        "dbPort": ${portAnswer?portAnswer:3306}
      }`;
}

function parseDate(string) {
    if (!string) return null;
    else return Date(string);
}

module.exports = { dateToString, getUserInputProperties, parseDate }