
class Board {
	constructor() {
		this.rows = [];
		this.div = document.querySelector("#board");
	}

	populate() {
		for(let i = 0; i < game.guesses; i++) {
			let row = new Row(i);
			this.rows.push(row);
			row.populate();
		}
	}

	setLength() {
		this.rows.forEach((row) => {
			if(game.wordLength == 5){
				row.letterBoxes[5].div.classList.add("tiny");
			}else {
				row.letterBoxes[5].div.classList.remove("tiny");
			}
		});
	}

	write(message){
		this.displayMessage(message.split(" "));
	}

	displayMessage(message, index = 0) {
		let word = "";
		if(index < message.length){
			word = message[index];
		}

		this.rows[index++].displayWord(word);

		if(message.length > 0 && index < game.guesses){
			setTimeout(() => (this.displayMessage(message, index)), 250);
		}
	}

	eraseMessage() {
		game.domHandler.resetKeyboard();
		this.write("");
		setTimeout(() => {this.displayMessage(game.currentGuesses)}, 500);
	}

}