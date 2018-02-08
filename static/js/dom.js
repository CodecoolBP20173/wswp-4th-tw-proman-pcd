// It uses data_handler.js to visualize elements

dom = {
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.init();
        dataHandler.getBoards(this.showBoards);
    },
    showBoards: function (boards) {
        // shows boards appending them to #accordion div
        // it adds drag and drop functionality
        var accordion = document.getElementById("accordion");
        accordion.innerHTML = "";

        // create a div for each board. To populate them with cards, divs can be referred to via board.id
        for (let board of boards) {
            var div = document.createElement('div');
            div.classList.add("card", "my_background", "test_margin");
            div.setAttribute("id", "board_"+board.id);
            div.innerHTML = `
                    <div class="card-header _boardhead my_text" id="heading_${board.id}" data-board_id="${board.id}">
                        <h5 class="mb-0">
                            <button class="btn btn-link my_button" data-toggle="collapse" data-target="#board_id${board.id}" aria-expanded="true"
                                    aria-controls="collapseOne">
                                ${board.title}
                            </button>
                        </h5>
                    </div>
    
                    <div id="board_id${board.id}" class="my_background collapse hide" aria-labelledby="heading_${board.id}" data-parent="#accordion">
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

        // Drag & Drop functionality via DRAGULA
        var dragulaContainers = [document.getElementById("trashbin")];

        for (let i = 0; i < boards.length * 4; i++) {
            dragulaContainers.push(document.getElementsByClassName("card-block")[i]);
        }
        dragula(dragulaContainers).on('drop', function (el) {
            let parent = el.parentElement;
            let grandparent = parent.parentElement;
            let status = grandparent.dataset.status;
            let id = el.dataset.id;
            dataHandler.saveStatus(id, status);

            // save new order when card is dropped
        }).on('drop', function (el) {

            let parent = el.parentElement;
            let cardArray = parent.getElementsByClassName("my_card");
            let idArray = [];
            for (let x = 0; x < cardArray.length; x++) {
                let idToPush = cardArray[x].dataset.id;
                idArray.push(idToPush);
                }
                dataHandler.saveOrder(idArray);
            }).on('drag', function (el) {
                el.style.maxHeight="80px";
            }).on('drop', function (el) {
                el.style.maxHeight="content";
            }).on('drop', function (el, target) {

            if (target === document.getElementById("trashbin")) {
                el.remove();
                let cardId = el.dataset.id;
                dataHandler.deleteCard(cardId);
            }
            }).on('drag', function () {
                document.getElementById("trashbin").style.display = "block";
            }).on('dragend', function () {
                document.getElementById("trashbin").style.display = "none";
            }).on('over', function (el, container) {
                if (container === document.getElementById("trashbin")) {
                    document.getElementById("trashbin").style.opacity = ".3";
                }
            }).on('out', function (el, container) {
                if (container === document.getElementById("trashbin")) {
                    document.getElementById("trashbin").style.opacity = ".7";
                }
        })
        ;

        dom.addNewBoardButton();
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, this.showCards);
    },
    showCards: function (cards) {
        // add cards to the board
        // it adds necessary event listeners also
        if (cards.length !== 0) {
            //TODO: if the card list is empty, all die
            var grandParentObj = document.getElementById("board_" + cards[0].board_id);
            var cardBlocksArray = grandParentObj.getElementsByClassName("card-block");

            for (let block of cardBlocksArray) {
                block.innerHTML = "";
            }


            for (let card of cards) {
                var parentObject = grandParentObj.querySelectorAll(`[data-status='${card.status_id}']`)[0];
                var cardNode = dom.generateCardNode(card);
                cardNode.classList.add("hvr-bob", "my_hover");
                var targetObjectArray = parentObject.getElementsByClassName("card-block");
                var cardObj = targetObjectArray[0].appendChild(cardNode);
                cardObj.addEventListener("click", function () {
                    dom.turnContentIntoTextarea("edit", this);
                });
            }

        }
    },


    generateCardNode: function (card) {
        var cardNode = document.createElement("div");
        cardNode.id = "card_" + card.id;
        cardNode.classList.add("my_card");
        cardNode.classList.add("card");
        cardNode.dataset.id = card.id;
        var cardTextNode = document.createTextNode(card.title);
        var paragraphNode = document.createElement("p");
        paragraphNode.classList.add("text-center");
        cardNode.appendChild(paragraphNode);
        paragraphNode.appendChild(cardTextNode);
        return cardNode;
    },

    showStatuses: function (statusesArray, parentDomObj, board_id) {
        // add status panels to the boards
        var htmlContentString = "";
        for (let status of statusesArray) {
            htmlContentString += `
                    <div class="card col _statuspanel my_text my_board_${status.id}" data-status="${status.id}">
                        <div class="card-header my_header">
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

    addNewCardButtons: function () {
        var newPanelDomObjArray = document.querySelectorAll("[data-status='1']");
        for (let newPanel of newPanelDomObjArray) {
            var parentDomObjArray = newPanel.getElementsByClassName("new_card_wrapper");
            var board_id = getFirstAncestorByClass(parentDomObjArray[0], "_boardhead").dataset.board_id;
            parentDomObjArray[0].innerHTML = `
                <div class="card _btn _newcard my_card my_hover" data-board_id="${board_id}">ADD NEW CARD</div>
            `;
            var cardBtnDomObj = parentDomObjArray[0].getElementsByClassName("_newcard")[0];
            cardBtnDomObj.addEventListener("click", function () {
                dom.turnContentIntoTextarea("add", this);
            });
        }
    },

    turnContentIntoTextarea: function (method, domObj) {
        var currentText = domObj.textContent;
        var card_id =  domObj.dataset.id
        domObj.innerHTML = `
                <textarea id="edit_field_${card_id}" class="card my_card my_hover" placeholder="New task ..."></textarea>

        `;
        var textAreaObj = domObj.firstElementChild;
        textAreaObj.value = currentText;
        textAreaObj.focus();
        var board_id = getFirstAncestorByClass(textAreaObj, "_boardhead").dataset.board_id;
        textAreaObj.addEventListener("keydown", function () {
            dom.saveCardEventListener(method, textAreaObj, board_id);
        });
        textAreaObj.addEventListener("focusout", function () {
            dom.cancelChangeEventListener(currentText, textAreaObj);
        });
    },

    saveCardEventListener: function (method, domObject, board_id) {
        var key = event.which || event.keyCode;
        if (key == 13 && !event.shiftKey) {
            event.preventDefault();
            var newCardTitle = domObject.value;
            if (method === "add") {
                dataHandler.createNewCard(newCardTitle, board_id, 1, dom.showCards);
                dom.addNewCardButtons();
            } else if (method === "edit") {
                card_id = domObject.parentNode.dataset.id;
                dataHandler.editCard(card_id, board_id, newCardTitle, dom.showCards);

            }
        }
    },

    addNewBoardButton: function () {
        let createBoardDiv = document.getElementById('createBoardDiv');

        createBoardDiv.innerHTML = `
            <h5 class="mb-0">
                <button id="createBoardButton" class="card my_button btn btn-link">Add new Board</button>
            </h5>
        `;
        let createNewBoardButton = document.getElementById('createBoardButton');
        createNewBoardButton.addEventListener('click', function () {
            dom.turnButtonIntoInput();
        })
    },

    turnButtonIntoInput: function() {
        let createBoardDiv = document.getElementById('createBoardDiv');
        createBoardDiv.innerHTML = `
            <input id="createBoardInput"/>
        `;

        var createBoardInput = document.getElementById('createBoardInput');
        createBoardInput.addEventListener("keydown", function () {
            dom.saveBoardEventListener(createBoardInput);
        });
        createBoardInput.addEventListener("focusout", function () {
            //dom.cancelChangeEventListener(currentText, textAreaObj);
            createBoardInput.value = "";
        });
    },

    saveBoardEventListener: function(domObject) {
        var key = event.which || event.keyCode;
        if (key == 13 && !event.shiftKey) {
            event.preventDefault();
            var newBoardTitle = domObject.value;

            if (newBoardTitle !== "") {
                dataHandler.createNewBoard(newBoardTitle, dom.showBoards);
            }

            dom.addNewBoardButton();
        }
    },

    cancelChangeEventListener: function (oldText, domObject) {
        domObject.parentNode.innerHTML = oldText;
    }
};