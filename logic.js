const Word = require("./Word");
const inquirer = require("inquirer");// npm package to ask questions in the console
const colors = require("colors");//npm package to change colors of words in the console
const isLetter = require("is-letter");//npm package to validate an input on a form
const figlet = require('figlet');//npm package to convert text to drawing
const fs = require('fs');

let wordPick;  //Had to make this global so we could use it in our congrats
let wins = 0;
let highScore = 0;
let arg = [];


const wordList = ["arowana", "barracuda","cobia","dogfish","escolar",
                "flounder", "grouper","halibut","icefish","jewfish",
                "killifish","lionfish","marlin","noodlefish","oscar",
                "perch","quillback","ray","shiner","trout","uaru","viperfish",
                "wahoo","yellowtail","zebrafish"]


function readFile(){
    fs.readFile("highScore.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error)
        } else {  
            // console.log(data);
            arg = data.split(',');
            
            highScore = arg[1];
         
        }
    });     

}




//make a golbal variable to keep track of the number of words correctly 
//make a high score that persists game after game of number of words guessed
let letterGuessed = [];
function initialize(){
   
    readFile();
    figlet("HangFish !!", function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(colors.rainbow(data));
        console.log(colors.bold.magenta(arg[0]+" holds the High Score of: "+ arg[1]));
        letterGuessed = [];//this should reset our letter guessed array with a new game
        let numGuess = 8;
        //sets hint for the start of game
        
        console.log("Words in a row: " + wins);  
        console.log("High Score: " + highScore);
        console.log(colors.bgMagenta("\nHint: I am a fish!"));
        wordPick = wordList[Math.floor(Math.random()* wordList.length)];
        //console.log(wordPick);
        
        let word = new Word(wordPick); 
        gameRound(word, numGuess);
    });
}

function gameRound(word, numGuess){
    
    //this will show word and update word all at the same time because of the recursion
    word.showWord();
    console.log();
    inquirer.prompt([
        {
            type: "input",
            message: "Guess a letter",
            name: "letter",
            validate: function(letter){ //this validates the user input that it is only one 
                if(isLetter(letter)){  //character and is a letter
                    return true;
                }  else {
                    return false;
                }
            }    
        }
    
    ]).then(({letter}) => {
        let guess = word.checker(letter);
        //this is the logic to check if a user has already guessed a letter
       
        if (letterGuessed.indexOf(letter) === -1 && guess){
            console.log("you have already guessed: " + letter);
            numGuess = numGuess;  //is this hacky lol
        } else if (letterGuessed.indexOf(letter) === -1){
            letterGuessed.push(letter);
        } else {  
            console.log("you have already guessed: " + letter);
            numGuess++;
        }
        console.log(colors.red("Past Choices\n"+letterGuessed));

        
        if (guess){  
            console.log(colors.yellow("Guesses left: " + numGuess));
            //show the upadated word with letter and msg
            console.log(colors.green("\n"+letter + " is correct!"));
            console.log();//creates a line of space  
            //check to see if the word is full
            wordFull(word,numGuess);
           
            
        } else {
            numGuess--;
            //send msg that they have guessed wrong
            console.log(colors.yellow("Guesses left: " + numGuess));
            console.log();
            console.log("sorry " +'"'+letter+'"'+ " is not correct");
            console.log();
            
           

            if (numGuess === 0){
                console.log("you lost");
                wins = 0;
                playAgain();
            } else {
                gameRound(word, numGuess);
            }
            
        }

    })

}

function wordFull(word, numGuess){
    if ((word.isVis() === true) && (wins >= highScore)){
        wins++;
        highScore = wins;
        console.log(colors.blue(wordPick.toUpperCase() +" Congrats you Win!!!!!"));
        
        
        console.log("You have the new HighScore of: " + highScore + " words in a row!!");

        inquirer.prompt([
        {
            type: "input",
            message: "Enter your name",
            name: "name"
        }
            

        ]).then(({ name }) => {
            fs.writeFile("highScore.txt", name +","+ highScore, function (err) {
                if (err) throw err;
            });
            inquirer.prompt([
                {
                    type: "confirm",
                    message: "Do you want to keep playing and increase your lead?",
                    name: "playAgain",
                    default: true,//this will return yes by default if user hits enter
                }
            
            ]).then(({playAgain}) => {
                if (playAgain) {
                    initialize();
                } else {
                    process.exit(0);
                }
            
            });
            
           // setTimeout(function(){ initialize(); }, 1000); 
        });
        
    } else if(word.isVis()){
        console.log(colors.blue(wordPick.toUpperCase() +" Congrats you Win!!!!!"));
        wins++;
        initialize();
    } else {
        gameRound(word, numGuess);
    }
}

function playAgain(){
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want to play again?",
            name: "playAgain",
            default: true,//this will return yes by default if user hits enter
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