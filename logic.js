const Word = require("./Word");
const inquirer = require("inquirer");
const colors = require("colors");

let wordPick;  //Had to make this global so we could use it in our congrats

const wordList = ["arowana", "barracuda","cobia","dogfish","escolar",
                "flounder", "grouper","halibut","icefish","jewfish",
                "killifish","lionfish","marlin","noodlefish","oscar",
                "perch","quillback","ray","shiner","trout","uaru","viperfish",
                "wahoo","yellowtail","zebrafish"]

//make a golbal variable to keep track of the number of words correctly 
//make a high score that persists game after game of number of words guessed
let letterGuessed = [];
function initialize(){
    letterGuessed = [];//this should reset our letter guessed array with a new game
    let numGuess = 8;
    //sets hint for the start of game
    console.log(colors.bgMagenta("\nHint: I am a fish!"));
    wordPick = wordList[Math.floor(Math.random()* wordList.length)];
    //console.log(wordPick);
    
    let word = new Word(wordPick); 
    gameRound(word, numGuess);
}

function gameRound(word, numGuess){
  
    //this will show word and update word all at the same time because of the recursion
    word.showWord();
    console.log();
    inquirer.prompt([
        {
            type: "input",
            message: "Guess a letter",
            name: "letter"
        }
    
    ]).then(({letter}) => {
        //this is the logic to check if a user has already guessed a letter
        if (letterGuessed.indexOf(letter) === -1){
            letterGuessed.push(letter);
        } else {
            console.log("you have already guessed: " + letter);
            numGuess++;  //is this hacky lol
        }
        console.log(colors.red("Past Choices\n"+letterGuessed));

        let guess = word.checker(letter);
        if (guess){  
            // validate input with regex 
            console.log(colors.yellow("Guesses left: " + numGuess))

            //show the upadated word with letter and msg
            console.log(colors.green("\n"+letter + " is correct!"));
            console.log();//creates a line of space  
           
            //prompt confirm do you want to play again 
            //check to see if the word is full
            if (word.isVis()){
                console.log(colors.blue(wordPick +" Congrats you Win!!!!!"));
                playAgain();

            } else {
                gameRound(word, numGuess);

            }
       
        }else {
            numGuess--;
            //send msg that they have guessed wrong
            console.log("sorry that is not correct");
            console.log();
            console.log(colors.yellow("Guesses left: " + numGuess));

            if (numGuess === 0){
                console.log("you lost");
                playAgain();
            } else {
                gameRound(word, numGuess);
            }
            
        }

    })

}

function playAgain(){
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want to play again?",
            name: "playAgain",
            default: true,
        }
    
    ]).then(({playAgain}) => {
        if (playAgain) {
            initialize();
        } else {
            process.exit(0);
        }
    
    });
}

initialize();