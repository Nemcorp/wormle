class Row {
	constructor(rowNum) {
		this.letterBoxes = [];
		this.div = document.createElement('div');
		this.div.classList.add("row");
		game.board.div.appendChild(this.div);
		this.rowNum = rowNum;
		this.rowLength;
	}

	populate() {
		this.rowLength = game.wordLength;
		for(let i = 0; i < 6; i++) {
			let lb = new LetterBox(this, i);

			if(i >= game.wordLength) {
				lb.div.classList.add("tiny");
			}
		}
	}

	addLetter() {
		let lb = this.letterBoxes[this.letterBoxes.length-1];
		lb.div.classList.remove("tiny");
		lb.div.classList.add("fadeIn");
		this.rowLength++;
	}


	displayWord(word = "", index = 0){
		let letter = word[index];
		if(!letter){
			letter = "";
		}

		this.letterBoxes[index].setLetter(letter);
		this.letterBoxes[index].check();

		if(index < word.length){
			this.letterBoxes[index].jump();
		}

		index++;

		if(index < 6){
			setTimeout(() => (this.displayWord(word, index)), 50);
		}
	}



	shake() {
		this.div.classList.add("wrong");
		setTimeout(() => {
			this.div.classList.remove("wrong");
		}, 300);
	}

	flipLettersAndCheck(index = 0) {
		this.letterBoxes[index].flip();
		this.letterBoxes[index++].check();

		if(index < game.wordLength){
			setTimeout(() => (this.flipLettersAndCheck(index)), 70);
		}
	}

	jumpLetters(index = 0) {
		this.letterBoxes[index++].jump();

		if(index < game.wordLength){
			setTimeout(() => (this.jumpLetters(index)), 70);
		}
	}

	slideLeft() {
		this.div.classList.add("slideLeft");
	}
}