const readline = require('readline');
const fs = require('fs');

fs.readFile('flashcards.json', 'utf8', (err, data) => {
    if (err) {
        console.error('it broke');
        return;
    }

    let flashcards = JSON.parse(data);
    flashcards = flashcards.sort(function () {
        return 0.5 - Math.random();
    })

    askQuestion(0, flashcards)
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let score = 0;
let startTime = Date.now();

function askQuestion(index, flashcards) {
    if (index < flashcards.length) {
        rl.question(`What is the command '${flashcards[index].description}'?\n`, (answer) => {
            if (answer === flashcards[index].command) {
                console.log('Correct\n');
                score++;
            } else {
                console.log(`The answer is '${flashcards[index].command}'\n`);
            }
            askQuestion(index + 1, flashcards);
        })
    } else {
        let endtime = Date.now();
        let totalTime = endtime - startTime;
        let minutes = Math.floor(totalTime / 60000);
        let seconds = ((totalTime % 60000) / 1000).toFixed(0)

        if (score == flashcards.length) {
            console.log(`You got them all correct!\n`);
        } else {
            console.log(`You scored '${score}' out of '${flashcards.length}'\n`);
        }

        console.log(`Time Taken = ${minutes}:${seconds}`);
        rl.close();
    }
}

