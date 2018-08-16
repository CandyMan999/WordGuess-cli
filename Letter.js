//here we are creating our letter constructor
//this function can be passed a var I named it char to represent a letter character
function Letter(char){
    this.char = char; 
    this.isVis = false; //we start off the value of isVis to false so when used in showLetter function each letter should initially return "_"
    this.showLetter = function(){
        if(this.isVis){
            return this.char;  //with the showLetter function when called on a letter if it is true it will return that letter or character as I called it
        } else {
            return "_"     //else if false it will return an underScore, you always have to return values in object consturtures or they will be lost, console log every step
        }
    }
    this.checkLetter = function(userGuess){
        if(userGuess === this.char){  //this is a function that checks if the val of the userGuess is = to the value of this constructors char value.. ie. is a = a
            this.isVis = true; // if it is we set isVis to true 
            return true; //then we return true back to the function when ran
        } else {
            return false; //Else we return the info of false back to the function whenever ran.. remember when you call a function it needs information back to preform the next line of code.
        }
    }
}

//var letter = new Letter("a")
module.exports = Letter;

