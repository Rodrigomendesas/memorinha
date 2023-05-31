let FRONT = 'card_front';
let BACK = 'card_back';
let CARD = 'card';
let ICON = 'icon';
let FIGURE = 'figure';

start_game();

function start_game() {
	initialize_cards(game.createCardsFromFigures());
}

function initialize_cards(cards) {
	let gameBoard = document.getElementById('gameBoard');
	gameBoard.innerHTML = '';
	game.cards.forEach(card => {

		let cardElement = document.createElement('div');
		cardElement.id = card.id;
		cardElement.classList.add(CARD);
		cardElement.dataset.icon = card.icon;

		createCardContent(card, cardElement);

		cardElement.addEventListener('click', flipCard);
		gameBoard.appendChild(cardElement);
	})
}

// cards = createCardsFromFigures(figures)

function createCardContent(card, cardElement) {

	createCardFace(FRONT, card, cardElement);
	createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element) {
	let cardElementFace = document.createElement("div");
	cardElementFace.classList.add(face);
	if (face === FRONT) {
		let iconElement = document.createElement('img');
		iconElement.classList.add(ICON)
		iconElement.classList.add(FIGURE);
		iconElement.src = "./assets/" + card.icon + ".png";
		cardElementFace.appendChild(iconElement);
	}
	else {
		cardElementFace.innerHTML = "L"
	}
	element.appendChild(cardElementFace);

}

function flipCard() {

	if (game.setCard(this.id)) {

		this.classList.add("flip");
		if (game.secondCard) {
			if (game.checkMatch()) {
				game.clearCards();
				if (game.checkGameOver()){
					setTimeout(() => {
					let gameOverLayer = document.getElementById("game_over");
					gameOverLayer.style.display = 'flex';
					}, 2000);
				}
			} else {
				setTimeout(() => {
					let firstCardView = document.getElementById(game.firstCard.id);
					let secondCardView = document.getElementById(game.secondCard.id);

					firstCardView.classList.remove('flip');
					secondCardView.classList.remove('flip');
					game.unflipCards();
				}, 2000);
			};
		};
	};
}

function restart(){
	game.clearCards();
	start_game();
	let gameOverLayer = document.getElementById("game_over");
					gameOverLayer.style.display = 'none';
}