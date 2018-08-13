var Letter = require("./Letter.js");

function Word(word){
    
    this.letters = word.split("").map(function(char){
        return new Letter(char);

    });
    this.showWord = function(){ 
       
       
       return this.letters.map(function(letter){
            return letter.showLetter();

        }).join(" ");
      
        
    }
    this.checker = function(char){
        let hasMatch = false;
        this.letters.forEach(letter => {
            if(letter.checkLetter(char)) {
              hasMatch = true;
            }
        });
       return hasMatch;
    }
  
}


// word = new Word("drunk");
// word.checker("u");

// console.log(word.showWord());
// console.log(word);


module.exports = Word;