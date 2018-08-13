function Letter(char){
    this.char = char;
    this.isVis = false;
    this.showLetter = function(){
        if(this.isVis){
            return this.char;
        } else {
            return "_"
        }
    }
    this.checkLetter = function(userGuess){
        if(userGuess === this.char){
            this.isVis = true;
            return true;
        } else {
            return false;
        }
        

    }

    
}

//var letter = new Letter("a")
module.exports = Letter;

