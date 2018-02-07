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
                        <div class="_board_body card-body row">
                            Status panels come here
                        </div>
                    </div>
            `;
            accordion.appendChild(div);
            var statusParentObject = document.getElementById(`board_id${board.id}`).firstElementChild;
            dataHandler.getStatuses(dom.showStatuses, statusParentObject, board.id);
        }


    },
    loadCards: function(boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, this.showCards);
    },
    showCards: function(cards) {
        // add cards to the board
        // it adds necessary event listeners also
        var grandParentObj = document.getElementById("board_" + cards[0].board_id);
        for (let card of cards) {
            var parentObject= grandParentObj.querySelectorAll(`[data-status='${card.status_id}']`)[0];
            var cardNode = dom.generateCardNode(card);
            parentObject.appendChild(cardNode);
        }
    },
    // here comes more features
    generateCardNode: function(card) {
        var cardNode = document.createElement("div");
        cardNode.id = "card_" + card.id;
        cardNode.classList.add("_card");
        var cardTextNode = document.createTextNode(card.title);
        cardNode.appendChild(cardTextNode);
        return cardNode;
    },
    showStatuses: function(statusesArray, parentDomObj, board_id) {
        // add status panels to the boards
        var htmlContentString = "";
        for (let status of statusesArray) {
            htmlContentString += `
                    <div class="card col _statuspanel" data-status="${status.id}">
                        <div class="card-header">
                            ${status.name}
                        </div>
                        <div class="card-block">
                        </div>
                    </div>
            `;
        }
        parentDomObj.innerHTML = htmlContentString;
        dataHandler.getCardsByBoardId(board_id, dom.showCards);
    }
}