const Word = require("./Word");
const inquirer = require("inquirer");


let wordList = ["arowana", "barracuda","cobia","dogfish","escolar",
                "flounder", "grouper","halibut","icefish","jewfish",
                "killifish","lionfish","marlin","noodlefish","oscar",
                "perch","quillback","ray","shiner","trout","uaru","viperfish",
                "wahoo","yellowtail","zebrafish"]

let wordPick;
let numGuess = 8;
let isWon = false;





function startGame(){
    //sets hint for the start of game
    console.log("\nHint: It is a type of fish");
    wordPick = wordList[Math.floor(Math.random()* wordList.length)];
    console.log(wordPick);

    let word = new Word(wordPick);
   
    console.log("\n"+word.showWord());

    if(numGuess > 0 && (!isWon)){
        inquirer.prompt([
			{
				type: "input",
				message: "Guess a letter",
				name: "letter"
			}
		
		]).then(letter => {
            
           

            console.log(letter);
            word.checker(letter);

            console.log(word);
           console.log(word.showWord());
          
            
            

        })

    }
   
   
}

startGame();