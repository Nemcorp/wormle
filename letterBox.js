class LetterBox {
	constructor(row, letterNum) {
		this.row = row;
		this.letterNum = letterNum;

		this.div = document.createElement('div');
		this.div.classList.add("letterBox");
		this.div.classList.add("flip-card");
		this.row.div.appendChild(this.div);

		this.letter;
		this.resetLetter("");

		this.row.letterBoxes.push(this);
	}

	setLetter(l) {
		this.letter = l.toLowerCase();
		this.div.innerHTML = `<span class="letter"> ${this.letter} </span>`;
		
		if(l != ""){
			this.div.classList.add("in-progress");
			
			if(this.letterNum == 5 && this.row.rowLength < 6){
				this.div.classList.remove("tiny");
				this.div.classList.add("fadeIn");
			}
		}

	}

	resetLetter() {
		this.letter = "";
		this.div.innerHTML = `<span class="letter"> ${this.letter} </span>`;
		this.div.classList.remove("in-progress");
	}


	check() {
		let keyDiv;

		if(game.validLetters.includes(this.letter.toLowerCase()) && this.letter != ""){
			keyDiv = document.querySelector("." + this.letter.toLowerCase());
		}

		// TODO check number of occurences
		if(this.letter == ""){
			this.div.classList.remove("solved");
			this.div.classList.remove("guessed");
			this.div.classList.remove("incorrect");
			this.div.classList.remove("in-progress");
		}else if(this.letter == game.answer[this.letterNum]){
			this.div.classList.add("solved");
			keyDiv.classList.add("solved");
		}else if(game.answer.includes(this.letter)) {
			this.div.classList.add("guessed");
			keyDiv.classList.add("guessed");
		}else if(keyDiv){
			this.div.classList.add("incorrect");
			keyDiv.classList.add("incorrect");
		}else {
			this.div.classList.add("incorrect");
		}
	}

	flip() {
		this.div.classList.add("flip");
		setTimeout(() => {
			this.div.classList.remove("flip");
		}, 300);
	}

	jump() {
		this.div.classList.add("jump");
		setTimeout(() => {
			this.div.classList.remove("jump");
		}, 300);
	}

}
