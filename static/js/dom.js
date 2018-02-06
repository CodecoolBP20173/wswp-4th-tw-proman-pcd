// It uses data_handler.js to visualize elements
dom = {
    loadBoards: function() {
        dataHandler.init();
        // retrieves boards and makes showBoards called
    },
    showBoards: function(boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
    },
    loadCards: function(boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, this.showCards);
    },
    showCards: function(cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        for (let card of cards) {
            var cardParent = document.getElementById("board_" + card.board_id);
            var cardNode = dom.generateCardNode(card);
            cardParent.appendChild(cardNode);
        }
    },
    // here comes more features
    generateCardNode: function (card) {
        var cardNode = document.createElement("div");
        cardNode.id = "card_" + card.id;
        cardNode.classList.add("_card");
        var cardTextNode = document.createTextNode(card.title);
        cardNode.appendChild(cardTextNode);
        return cardNode;
    }
}