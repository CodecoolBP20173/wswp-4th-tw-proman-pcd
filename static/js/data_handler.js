// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
dataHandler = {
    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _loadData: function() {
        // it is not called from outside
        // loads data from local storage, parses it and put into this._data property
        var dataString = localStorage.getItem("proman-data");
        this._data = JSON.parse(dataString);
    },
    _saveData: function() {
        // it is not called from outside
        // saves the data from this._data to local storage
        var dataString = JSON.stringify(this._data);
        localStorage.setItem("proman-data", dataString);

    },
    init: function() {
        this._loadData();
    },
    getBoards: function(callback) {
        // the boards are retrieved and then the callback function is called with the boards
        boards = this._data.boards;
        console.log(boards);
        callback(boards)
    },
    getBoard: function(boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
        //NO NEED FOR THIS (YET)
    },
    getStatuses: function(callback, targetDomObj, board_id) {
        // the statuses are retrieved and then the callback function is called with the statuses
        var statusesArray = this._data.statuses;
        callback(statusesArray, targetDomObj, board_id);
    },
    getStatus: function(statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
        //NO NEED FOR THIS (YET)
    },
    getCardsByBoardId: function(boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        var cards = getObjectListByKeyValue(this._data, "cards", "board_id", boardId);
        callback(cards);
    },
    getCard: function(cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
        //NO NEED FOR THIS (YET)
    },
    createNewBoard: function (boardTitle, callBack) {
        let newBoardId = getNewId(this._data, "boards");
        let newBoard = {
            id: newBoardId,
            title: boardTitle,
            is_active: true
        };
        this._data["boards"].push(newBoard);
        this._saveData();
        callBack(this._data.boards);
    },
    createNewCard: function(cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
        let newCardID = getNewId(this._data, "cards");
        let newCard = {
            id: newCardID,
            title: cardTitle,
            board_id: parseInt(boardId),
            status_id: 1,
            order: 1
        };
        dataHandler.increaseOrderNumber();
        this._data["cards"].push(newCard);
        let cardsOfBoard = getObjectListByKeyValue(this._data, "cards", "board_id", parseInt(boardId));
        callback(cardsOfBoard);
    },
    saveStatus: function (cardId, status) {
        for (let x of this._data.cards) {
            if (x.id == cardId) {
                x.status_id = status;
                this._saveData();
            }
        }
    },
    saveOrder: function (orderArray) {
        for (var x of this._data.cards) {
            for (var id of orderArray) {
                if (x.id == id) {
                    x.order = orderArray.indexOf(id) + 1;
                }
            }
        }

        sortObj(this._data.cards, "order");
        this._saveData();
    },
    editCard: function (cardId, cardTitle, callback) {
        //TODO: bekötni a card namehez
        let cards = this._data.cards;
        for (let i = 0; i < cards.length; i++){
            if (cards[i].id === cardId) {
                cards[i].title = cardTitle;
                break;
            }
        }
        //this._saveData();
        callback(this._data.cards);
    },
    increaseOrderNumber: function () {
        for (let i=0; i < dataHandler._data.cards.length; i++) {
            if (dataHandler._data.cards[i].status_id === 1){
                dataHandler._data.cards[i].order += 1;
            }

        }
    }
};
