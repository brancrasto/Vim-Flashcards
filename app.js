const readline = require('readline');
const fs = require('fs');

fs.readFile('flashcards.json', 'utf8', (err, data) => {
    if (err) {
        console.error('it broke');
        return;
    }

    const flashcards = JSON.parse(data);

    askQuestion(0, flashcards)
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let score = 0;

function askQuestion(index, flashcards) {
    if (index < flashcards.length) {

        rl.question(`What is the command '${flashcards[index].description}'?\n`, (answer) => {
            if (answer === flashcards[index].command) {
                console.log('Correct\n');
                score += 1;
            } else {
                console.log(`The answer is '${flashcards[index].command}'\n`);
                rl.close;
            }
            askQuestion(index + 1, flashcards);
        })
    } else {
        if (score == flashcards.length) {
            console.log(`You got them all correct!\n`);
        } else {
            console.log(`You scored '${score}' out of '${flashcards.length}'\n`);
        }

        rl.close;
    }
}
