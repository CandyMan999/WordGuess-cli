var Letter = require("./Letter.js");

function Word(word){
    
    this.letters = word.split("").map(function(char){
        return new Letter(char);

    });
    this.showWord = function(){ 
       
       
       let display = this.letters.map(function(letter){
            return letter.showLetter();

        }).join(" ");
        console.log(display);
      
        
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
    this.isVis = function(){   
       return this.letters.every(letter=>letter.isVis);
    }
  
}


// word = new Word("drunk");
// word.checker("u");

// console.log(word.showWord());
// console.log(word);


module.exports = Word;