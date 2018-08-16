const Word = require("./Word");//npm package that lets us read our Word.js file into this page
const inquirer = require("inquirer");// npm package to ask questions in the console
const colors = require("colors");//npm package to change colors of words in the console
const isLetter = require("is-letter");//npm package to validate an input on a form
const figlet = require('figlet');//npm package to convert text to drawing
const fs = require('fs');
//here are my global variables that talk to various functions through-out the code
let wordPick;  //Had to make this global so we could use it in our congrats
let wins = 0;
let highScore = 0;
let arg = [];
let letterGuessed = [];

//this is an array of words to randomly pick from
const wordList = ["arowana", "barracuda","cobia","dogfish","escolar",
                "flounder", "grouper","halibut","icefish","jewfish",
                "killifish","lionfish","marlin","noodlefish","oscar",
                "perch","quillback","ray","shiner","trout","uaru","viperfish",
                "wahoo","yellowtail","zebrafish"]

//this will read the file of highScore.txt so we can use that info to persist the high score holder 
// game after game even after terminal exits process
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
//This function initialize the game, we call it at the end of our code
function initialize(){
   //here we call the readFile function to check for the high score values
    readFile();
    //This figlet creates that cool title we got
    figlet("HangFish !!", function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        //this colors our cool figlet data with color npm 
        console.log(colors.rainbow(data));
        //this colors our console-log data of our High Score arguments
        console.log(colors.bold.magenta(arg[0]+" holds the High Score of: "+ arg[1]));
        letterGuessed = [];//this should reset our letter guessed array with a new game
        let numGuess = 8;//this resets our number of guesses back to 8
        console.log("Words in a row: " + wins);  //this displays the correct amount of words in a row
        console.log("High Score: " + highScore); // this displays our highScore
        console.log(colors.bgMagenta("\nHint: I am a fish!")); //sets hint for the start of game
        wordPick = wordList[Math.floor(Math.random()* wordList.length)];//this randomly picks a word from our wordlist
        //this makes the variable word into a new object via passing wordPick into our Word constructor.. see Word.js
        let word = new Word(wordPick); 
        gameRound(word, numGuess);// This runs a game round and we pass it the word variable and numGuess variable so these can persist from one function to the next
    });
}
//this is a function that will run the gameround
function gameRound(word, numGuess){
    //this will show word, and update word, all at the same time because of the recursion
    word.showWord();
    console.log();//this simply creates a line of space in our terminal
    //here is a prompt to grab our userGuess
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
        }]).then(({letter}) => {
            //this passes the letter of the user input into the checker function (see Word.js) and stores it in a variable
        let guess = word.checker(letter);
            //this is the logic to check if a user has already guessed a letter and if guess is true
            //this whole if, else if, else, logic only exists to handle user error and idiot proof this game
        if (letterGuessed.indexOf(letter) === -1 && guess){
            console.log("you have already guessed: " + letter);
            numGuess = numGuess;  //is this hacky? lol
            //this checks only if the letter guessed is not in the letterGuessed array
        } else if (letterGuessed.indexOf(letter) === -1){
            letterGuessed.push(letter);//if true it will push the letter guessed into the array
        } else {  
            console.log("you have already guessed: " + letter);//else the letter must exist
            numGuess++;// here we have to increase the numguess to offset the decrement
        }
        console.log(colors.red("Past Choices\n"+letterGuessed));
        //if the guess is true this will run
        if (guess){  
            //shows the number of guesses left
            console.log(colors.yellow("Guesses left: " + numGuess));
            //shows the letter you have guessed is correct
            console.log(colors.green("\n"+letter + " is correct!"));
            console.log();//creates a line of space  
            //calling the wordFull function to see if the word is full, passing in the word and numGuess arg so they can persist
            wordFull(word,numGuess);
        //else the guess was wrong and we run the corresponding lines  
        } else {
            numGuess--;//this decrements the guesses
            //shows number of guesses left
            console.log(colors.yellow("Guesses left: " + numGuess));
            console.log();//simply a line of space
            //shows the letter they guessed was incorrect
            console.log("sorry " +'"'+letter+'"'+ " is not correct");
            console.log();//another line of space
            //if the number of guesses reaches zero this will run
            if (numGuess === 0){
                console.log("YOU LOST  " + arg[0]+ " still reigns supreme!!");//this shows that you have lost and who is still the High Score holder
                wins = 0; //resets your win streak to zero
                playAgain();//calls the play again function
            } else {
                gameRound(word, numGuess);
            }   
        }
    })
}
//this is a function that checks if all letters in the hidden word have been displayed, notice we pass the arguments word and NumGuess so these variables can persist
function wordFull(word, numGuess){
    //this is seeing if our word.isVis function is true (check Word.js) and also if wins is greater to or equal than high score
    if ((word.isVis() === true) && (wins >= highScore)){
        wins++;//wins gets incremented
        highScore = wins;//we set highScore equal to wins for ease of future use, pushes value to global highScore
        console.log(colors.blue(wordPick.toUpperCase() +" Congrats you Win!!!!!"));// this consoles that you have won along with some styling
        //this lets you know you are now the new highscore holder 
        console.log("You have the new HighScore of: " + highScore + " words in a row!!");
        //this will prompt you to enter your name to keep track of your new bad ass high score and name
        inquirer.prompt([
        {
            type: "input",
            message: "Enter your name",
            name: "name"
        }
        // notice the {name} this is an es6 way to destructure an object and grab the name value.. otherwise you would have to write something like (response)=function(response.name)
        ]).then(({ name }) => {
            //this will write our argments into the highScore.txt file, notice I choose writeFile as oppose to appendTO because it overwrites previous data
            //this data is stored in a in an array format seperated by a comma and accessed by the [i] notation
            fs.writeFile("highScore.txt", name +","+ highScore, function (err) {
                if (err) throw err;
            });
            inquirer.prompt([
                {
                    type: "confirm",
                    message: "Do you want to keep playing and increase your lead?",
                    name: "playAgain",
                    default: true,//this will return yes by default if user hits enter, once again, dummy proof
                }
            
            ]).then(({playAgain}) => {
                if (playAgain) {
                    //this calls the initialize function
                    initialize();
                } else {
                    //this is the command to exit back to terminal
                    process.exit(0);
                }
            });  
        });
    // else the word is no longer hidden but you are not the new high score holder
    } else if(word.isVis()){
        //great you got the word correct, this is where i tell you about it
        console.log(colors.blue(wordPick.toUpperCase() +" Congrats you Win!!!!!"));
        wins++; //increment the wins value
        initialize(); //call the initilize function to display your wins in a row and where you stand
    } else {
        //else the word still has hidden letters and we run another game round, still passing through the word and numGuess variables so they can persist
        gameRound(word, numGuess);
    }
}
//this defines out play again function
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