//here we are calling in our Letter.js file because the word constructor is dependent on it
//side note, we only need the Word.js file inside our logic.js file because Word.js already encompasses Letter.js, passing Letter.js into Logic.js would be redundant
var Letter = require("./Letter.js"); 
// this creates our word constructor
function Word(word){
    //this will spit the word at every character, map is a cool javascript method that calls a function for each element in an array which we just created by the split method, 
   //each element in that array is now represented by the char variable which we defined in our Letter constructor to represent a letter.
    this.letters = word.split("").map(function(char){
        //since map calls a function for each element in an array this will pass each letter for the whole word into our Letter constructor
        return new Letter(char); // we will then return this value as always and each letter element will hold the propeties and methods we defined in the Letter cpnstructor
    });
    //this defines a method of the constructor
    this.showWord = function(){ 
        //same thing here we mapping over the above defined "letters" representing a word then for each element 
        //ie "letter" we will return the value of the showLetter method defined in Letter.js 
       let display = this.letters.map(function(letter){
            return letter.showLetter(); // returning the value as always or it won't be available for use
        }).join(" ");// this will join the word back together for a nice display of "_ _ _ _"
        console.log(display);//then this will console.log are value returned to the display method in our console  
    }
    //this defines a method that goes through each letter in the word and runs the checkLetter method defined in Letter.js
    this.checker = function(char){
        //it has a default of false meaning some letters or all are still hidden, this function will only return true if each char returns true when the checkLetter method is ran
        //this method needs a switch unlike the other methods where you can just return a value because it needs to default false
        let hasMatch = false;
        //this uses a forEach loop to check the truthy or falsy values of each letter element represented by char
        this.letters.forEach(letter => {
            if(letter.checkLetter(char)) {
              hasMatch = true; //if every element returns true we switch hasMatch to true and that value will be returned to the method when called
            }
        });
       return hasMatch; //otherwise the method will be returned a value of false when called
    }
    // this defines a method 
    this.isVis = function(){   
        //based off our isVis method this will run through every letter in letters we defined above and determine isVis's outcome
        //this is a cool es6 way of writing everything out in one line using the javascript .every() method, .some() is another interesting option
        //here you can see since we wrote it all in one line we need to return the whole resulting value back to the method we are defining, either true or false
       return this.letters.every(letter=>letter.isVis);
    }
}


// word = new Word("drunk");
// word.checker("u");

// console.log(word.showWord());
// console.log(word);


module.exports = Word;