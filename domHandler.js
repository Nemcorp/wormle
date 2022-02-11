class DomHandler {
	constructor() {

	}

	addTypingListener() {
		document.addEventListener("keydown", this.handleKeyDown);
	}

	addButtonClickListeners() {
		document.querySelectorAll(".key").forEach((key) => {
			key.addEventListener("click", this.handleKeyDown);
		});
	}


	handleKeyDown(e) {
		let letter;

		if(e.type == "keydown") {
			if(e.keyCode == 8) {
				letter = "backspace";
			}else if (e.keyCode == 13) {
				letter = "enter";
			} else {
				letter = e.key;
			}
		}else if(e.type == "click") {
			let target = e.target;
			if(e.target !== e.currentTarget) {
				target = e.target.parentElement;
			};

			if(target.classList.contains("backspace")){
				letter = "backspace";
			}else if(target.classList.contains("enter")){
				letter = "enter";
			}else {
				letter = target.innerText; 
			}
		}



		// if game is over, don't accept input
		if(game.gameOver) return;
		if(game.allowTyping == false) return;


		// BACKSPACE LOGIC
		if(letter == "backspace") {
			if(game.currentLetter > 0){
				game.currentLetter--;
				let currentLetterBox = game.getCurrentLetterBox();
				currentLetterBox.resetLetter("");
			}
		}

		// ENTER LOGIC
		if(letter == "enter") {
			if(game.currentLetter >= game.wordLength){
				game.makeGuess();
			}else {
				game.board.rows[game.currentRow].shake();
			}
		}

		// LETTER LOGIC
		if(game.validLetters.includes(letter.toLowerCase()) && game.currentLetter < game.wordLength){
			let divId = `${game.currentRow}-${game.currentLetter}`;
			let currentLetterBox = game.getCurrentLetterBox();

			currentLetterBox.setLetter(letter);

			currentLetterBox.div.classList.add("pulse");
			setTimeout(() => {
				currentLetterBox.div.classList.remove("pulse");
			}, 300);


			if(game.currentLetter < game.wordLength){
				game.currentLetter++;
			}
		}
	}

	addBackground() {
		document.querySelector("body").classList.add("hermes");
		setTimeout(() => { document.querySelector("#board").classList.add("opacity-flicker");}, 2000);
	}

	flickerBackground() {
		let body = document.querySelector("body");
		body.classList.add("flicker");
		setTimeout(() => {
			body.classList.remove("pulse");
		}, 1000);
	}

	changeLetterInHeader() {
		let l = document.querySelector(".custom-letter");
		l.innerHTML = "m";
		this.pulseElement("custom-letter");

		setTimeout(() => {
			l.classList.add("slightly-bigger")
		}, 500);
	}

	pulseElement(id) {
		document.querySelector("."+id).classList.add("multiPulse");
	}

	clearOldBoard() {
		document.querySelector("#board").innerHTML = "";
	}

	resetKeyboard() {
		document.querySelectorAll(".key").forEach((key) => {
			key.classList.remove("solved");
			key.classList.remove("guessed");
			key.classList.remove("incorrect");
		});
	}

}
