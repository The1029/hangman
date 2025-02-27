import { confirm, input } from '@inquirer/prompts';
import { getRandomWord, validGuesses } from "./words.js";
import { man } from "./man.js";

const play = async () => {
    const maxGuesses = man.length;
    let guessed = [];
    let validGuess = true;
    let complete = true;

    const word = getRandomWord().toUpperCase();
    const wordArray = word.split("");

    for(let i = 0; i < maxGuesses-1;) {
        if (validGuess) {
            console.clear();
            console.log("A man shall hang, his crime anon.");
            console.log(`Only ye can save him, before ${maxGuesses-1} guesses are gone.\n`);
            console.log(man[i]);
            console.log(`Letters Guessed: ${guessed}\n`);

            let wordState = "";

            complete = true;
            wordArray.forEach((char, i) => {
                const alreadyGuessed = guessed.find(function (element) {
                    return element === char.toUpperCase();
                });
                if (alreadyGuessed) {
                    wordState = wordState + char + " ";
                } else {
                    complete = false;
                    wordState = wordState + "_ ";
                }
            });

            if (complete) break;

            console.log(`${wordState}\n`);

            validGuess = false;
        }

        let guess = await input({ message: 'Guess: ' });

        if (typeof guess === 'string' && guess.length !== 1) {
            console.log("Ye may only guess one a time. Savy?");
            continue;
        }

        const isValid = validGuesses.find(function (element) {
            return element === guess.toUpperCase();
        });
        if (!isValid) {
            console.log("Ye ain't guessed no letter.");
            continue;
        }

        const alreadyGuessed = guessed.find(function (element) {
            return element === guess.toUpperCase();
        });
        if (alreadyGuessed) {
            console.log("Ye struts in circles. That's been guessed.");
            continue;
        }

        validGuess = true;
        guessed.push(guess.toUpperCase());

        if (word.includes(guess.toUpperCase())) {
            console.log("Ye found one! May save him yet!");
            continue;
        }

        i++;
    }

    if (complete) {
        console.log("Gods above, ye did it! He walks!\n")
    } else {
        console.log(man[maxGuesses-1]);
        console.log("He swings. Ye failed...\n");
    }

    console.log(`Word: ${word}\n`);
    
    const again = await confirm({ message: 'Play again?', default: false});

    if (again) play();
}

play();
