// It uses data_handler.js to visualize elements

dom = {
    loadBoards: function() {
        // retrieves boards and makes showBoards called
        dataHandler.init();
        dataHandler.getBoards(this.showBoards);
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
                    <div class="card-header _boardhead" id="heading_${board.id}" data-board_id="${board.id}">
                        <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#board_id${board.id}" aria-expanded="true"
                                    aria-controls="collapseOne">
                                ${board.title}
                            </button>
                        </h5>
                    </div>
    
                    <div id="board_id${board.id}" class="collapse hide" aria-labelledby="heading_${board.id}" data-parent="#accordion">
                        <div class="_board_body card-body row">
                            Status panels come here
                        </div>
                    </div>
            `;
            accordion.appendChild(div);
            var statusParentObject = document.getElementById(`board_id${board.id}`).firstElementChild;
            dataHandler.getStatuses(dom.showStatuses, statusParentObject, board.id);
        }
        dom.addNewCardButtons();
        // dragula
        var dragulaContainers = [];
        for (let i = 0; i < boards.length*4; i++) {
            dragulaContainers.push(document.getElementsByClassName("card-block")[i]);
        }
        dragula(dragulaContainers).on('drop', function(el) {
            let parent = el.parentElement;
            let grandparent = parent.parentElement;
            let status = grandparent.dataset.status;
            let id = el.dataset.id;

            dataHandler.saveStatus(id, status);
        }).on('drop', function (el) {
            let parent = el.parentElement;
            let cardArray = parent.getElementsByClassName("_card");

            let idArray = [];
            for (let x = 0; x < cardArray.length; x++) {
                let idToPush = cardArray[x].dataset.id;
                idArray.push(idToPush);
            }

            dataHandler.saveOrder(idArray);
        });


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
            var targetObjectArray = parentObject.getElementsByClassName("card-block");
            targetObjectArray[0].appendChild(cardNode);
        }
    },
    // here comes more features


    generateCardNode: function(card) {
        var cardNode = document.createElement("div");
        cardNode.id = "card_" + card.id;
        cardNode.classList.add("_card");
        cardNode.classList.add("card");
        cardNode.dataset.id = card.id;
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
                        <div class="new_card_wrapper">
                        </div>
                    </div>
            `;
        }
        parentDomObj.innerHTML = htmlContentString;
        dataHandler.getCardsByBoardId(board_id, dom.showCards);
    },

    addNewCardButtons: function() {
        var newPanelDomObjArray = document.querySelectorAll("[data-status='1']");
        for (newPanel of newPanelDomObjArray) {
            var parentDomObjArray = newPanel.getElementsByClassName("new_card_wrapper");
            var board_id = getFirstAncestorByClass(parentDomObjArray[0], "_boardhead").dataset.board_id;
            parentDomObjArray[0].innerHTML = `
                <div class="card _btn _newcard" data-board_id="${board_id}">ADD NEW CARD</div>
            `;
            var cardBtnDomObj = parentDomObjArray[0].getElementsByClassName("_newcard")[0];
            cardBtnDomObj.addEventListener("click", function () {
                dom.turnContentIntoInput(function () {
                   console.log("Create card");
                }, this);
            });
        }
    },

    turnContentIntoInput: function(callback, domObj) {
        var currentHTMLContent = domObj.parentNode.innerHTML;
        domObj.parentNode.innerHTML = `
                <textarea id="edit_field" class="card" placeholder="New task ..."></textarea>
        `;
        var textAreaObj = document.getElementById("edit_field");
        textAreaObj.focus();
        textAreaObj.addEventListener("keydown", function () {
            dom.saveCardEventListener(function() {
               console.log("Creating card");
            }, currentHTMLContent, textAreaObj);
        });
    },

    saveCardEventListener: function(callback, oldHTMLContent, domObject) {
        var key = event.which || event.keyCode;
        if (key == 13 && !event.shiftKey) {
            event.preventDefault();
            callback();
            domObject.parentNode.innerHTML = oldHTMLContent;
        }
    }
}