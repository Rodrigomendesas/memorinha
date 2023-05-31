let game = {

    figures : ['pi', 'tioro', 'vava', 'vovo', 'bibi', 'ka', 'lara', 'mamae', 'mimi', 'papai'],

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function(id){

        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode){
            return false;
        }

        if (!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true; 
            return true; 
        }

    },

    checkMatch: function(){
        if (!this.firstCard || !this.secondCard){
            return false;
        }

        return this.firstCard.icon === this.secondCard.icon;

    },

    clearCards: function(){

        this.firstCard = null;
        this.secondCard = null; 
        this.lockMode = false;

    },

    unflipCards (){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false; 
        this.clearCards(); 

    },

    checkGameOver(){

        return this.cards.filter(card => !card.flipped).length == 0;
    },
 

    cards : null,

    createCardsFromFigures: function () {
        this.cards = [];
    
        this.figures.forEach((figure) => {
            this.cards.push(this.createPairFromFigure(figure));
        })
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffle_cards();

        return this.cards;
    },
    
    createPairFromFigure: function (figure) {
        return [{
            id: this.createIdWithFigure(figure),
            icon: figure,
            flipped: false,
        }, {
            id: this.createIdWithFigure(figure),
            icon: figure,
            flipped: false,
        }]
    },
    
    createIdWithFigure: function (figure) {
        return figure + parseInt(Math.random() * 1000);
    },

    shuffle_cards: function (cards) {
        let current_index = this.cards.length;
        let random_index = 0;
    
        while (current_index !== 0) {
            random_index = Math.floor(Math.random() * current_index);
            current_index--;
    
            [this.cards[random_index], this.cards[current_index]] = [this.cards[current_index], this.cards[random_index]];
        }
    },


}