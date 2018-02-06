// It uses data_handler.js to visualize elements

dom = {
    loadBoards: function() {
        // retrieves boards and makes showBoards called
        dataHandler.init();
        dataHandler.getBoards(this.showBoards);

        //TODO: onload?
        var addNewCard = document.getElementById("addNewCard");

        addNewCard.addEventListener('click', function () {
            var cardTitle = prompt("Card title: ");

            if ( cardTitle != null ) {
                dataHandler.createNewCard(cardTitle, 2, 1, dom.showCards);
            }
        });
    },
    showBoards: function(boards) {
        // shows boards appending them to #accordion div
        // it adds necessary event listeners also
        var accordion = document.getElementById("accordion");

        // create a div for each board. To populate them with cards, divs can be referred to via board.id
        for (let board of boards) {
            var div = document.createElement('div');
            div.classList.add("card");
            div.setAttribute("id", "board_"+board.id);
            div.innerHTML = `
                    <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#board_id${board.id}" aria-expanded="true"
                                    aria-controls="collapseOne">
                                ${board.title}
                            </button>
                        </h5>
                    </div>
    
                    <div id="board_id${board.id}" class="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="card-body">
                            Board: cards come here
                        </div>
                    </div>
            `;
            accordion.appendChild(div);
        }

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