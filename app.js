// TODO

// URGENT

// NECESSARY
// fix slow loading

// OPTIONAL
// flexbox sizing
// make keyboard reset smoother
// second occurance of letter
// dark mode
// better transition to new game
// file organization

var game;

class Game {
	constructor() {
		this.trickMode = true;
		this.allowTyping = true;


		this.currentRow;
		this.currentLetter;
		this.currentGuesses = [];
		this.gameOver;

		this.board;
		this.domHandler;

		this.validLetters = "abcdefghijklmnopqrstuvwxyz";

		this.possibleWords = [
			"hermes",
			"prince",
			"chaos",
			"cower",
			"feedme",
			"kathy",
			"steppy"
		];

		this.currentWordIndex = 0;

		this.acceptedWords;

		this.guesses = 6;
		this.wordLength = 5;
	}

	init() {
		this.domHandler = new DomHandler();
		this.domHandler.addTypingListener();
		this.domHandler.addButtonClickListeners();

		this.board = new Board();

		this.board.populate();
		this.reset();

		this.answer = "hermes".split("");
	}

	reset() {
		this.domHandler.resetKeyboard();

		if(this.currentWordIndex > this.possibleWords.length) {
			this.currentWordIndex = 0;
		}

		this.answer = this.possibleWords[this.currentWordIndex++].toLowerCase().split("");

		this.currentRow = 0;
		this.currentLetter = 0;
		this.gameOver = false;

		if(this.trickMode) {
			this.wordLength = 5;
		}else {
			this.wordLength = this.answer.length;
		}

		if(this.wordLength == 5) {
			this.acceptedWords = acceptedShortWords;
		}else {
			this.acceptedWords = acceptedLongWords;
		}


		this.board.setLength();
	}


	getCurrentLetterBox(){
		return this.board.rows[this.currentRow].letterBoxes[this.currentLetter];
	}

	getDivFromId(id) {
		return document.querySelector(".ID"+id);
	}

	makeGuess() {
		let guess = "";

		// get user guess
		this.board.rows[this.currentRow].letterBoxes.forEach((letterBox)=> {
			guess += letterBox.letter;
		});

		guess = guess.toLowerCase();


		if(this.acceptedWords.includes(guess)){
			this.board.rows[this.currentRow].flipLettersAndCheck(); 
			this.currentGuesses.push(guess);

			if(guess == this.answer.join('')) {
				// YOU WIN
				this.board.rows[this.currentRow].jumpLetters(); 
				this.endGame();
			}else if(this.currentRow == this.guesses-1) {
				// YOU LOSE
				this.endGame();
			}

			this.currentRow++;
			this.currentLetter = 0;	

			if(this.trickMode && this.currentRow == 3) {
				this.allowTyping = false;
				setTimeout(() => {this.domHandler.flickerBackground()}, 1500);
				setTimeout(() => {this.addLetter()}, 2500);
				setTimeout(() => { this.message("Did you think this was Wordl?")}, 5500);
				setTimeout(() => { this.message("Think again")}, 9500);
				setTimeout(() => {this.board.eraseMessage()}, 13000);
				setTimeout(() => {this.allowTyping = true;}, 13200);
				
			}
		}else {
			console.log("INVALID GUESS");
			this.board.rows[this.currentRow].shake();
		}
	}

	addLetter() {
		this.wordLength++;
		this.acceptedWords = acceptedLongWords;

		for(let i = this.currentRow; i <  this.wordLength; i++){
			this.board.rows[i].addLetter();
		}
	}

	endGame() {
		this.gameOver = true;

		if(this.trickMode){
			setTimeout(() => { this.message("This isn't Wordle")}, 2000);
			setTimeout(() => { this.message("This is")}, 5000);
			setTimeout(() => { this.message("Wormle")}, 7600);
			setTimeout(() => {this.domHandler.addBackground()}, 8100);
			setTimeout(() => {this.domHandler.changeLetterInHeader()}, 9100);


			setTimeout(() => {this.message("Happy Valen- tines day, Ava")}, 14000);


			setTimeout(() => { this.board.write("")}, 18500);
			setTimeout(() => { this.reset()}, 19000);
		}else {
			setTimeout(() => { this.board.write("")}, 5000);
			setTimeout(() => { this.reset()}, 5500);
		}

		this.trickMode = false;
	}

	message(message) {
		this.domHandler.resetKeyboard();
		this.board.write("");
		setTimeout(() => { this.board.write(message)}, 500);
	}

}




function init() {
	game = new Game();
	game.init();
}



init();


