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
        var dataString = JSON.stringify(dataHandler._data);
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
        let newBoardId = createGUID();
        let timestamp = createTimestamp();
        let newBoard = {
            id: newBoardId,
            title: boardTitle,
            is_active: true,
            deleted: false,
            new: true,
            submission_time: timestamp
        };
        this._data["boards"].push(newBoard);
        this._saveData();
        dataHandler.syncData(this._data);
        callBack(this._data.boards);
    },
    createNewCard: function(cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
        let newCardID = createGUID();
        let timestamp = createTimestamp();
        let newCard = {
            id: newCardID,
            title: cardTitle,
            board_id: boardId,
            status_id: 1,
            order: 1,
            deleted: false,
            new: true,
            submission_time: timestamp
        };
        dataHandler.increaseOrderNumber();
        this._data["cards"].push(newCard);
        sortObj(this._data.cards, "order");
        this._saveData();
        dataHandler.syncData(this._data);
        let cardsOfBoard = getObjectListByKeyValue(this._data, "cards", "board_id", boardId);
        callback(cardsOfBoard);
    },
    saveCardStatus: function (cardId, status) {
        for (let x of this._data.cards) {
            if (x.id == cardId) {
                let timestamp = createTimestamp();
                x.status_id = status;
                x.submission_time = timestamp;
                this._saveData();
                dataHandler.syncData(this._data);
            }
        }
    },
    saveOrder: function (orderArray) {
        for (var x of this._data.cards) {
            for (var id of orderArray) {
                if (x.id == id) {
                    let timestamp = createTimestamp();
                    x.submission_time = timestamp;
                    x.order = orderArray.indexOf(id) + 1;
                }
            }
        }

        sortObj(this._data.cards, "order");
        this._saveData();
        dataHandler.syncData(this._data);
    },
    editCard: function (cardId, boardId, cardTitle, callback) {
        cardId = parseInt(cardId);
        boardId = parseInt(boardId);
        let cards = this._data.cards;
        let timestamp = createTimestamp();
        for (let i = 0; i < cards.length; i++){
            if (cards[i].id === cardId) {
                cards[i].title = cardTitle;
                cards[i].submission_time = timestamp;
                break;
            }
        }
        this._saveData();
        dataHandler.syncData(this._data);
        let cardsOfBoard = getObjectListByKeyValue(this._data, "cards", "board_id", boardId);
        callback(cardsOfBoard);
    },
    increaseOrderNumber: function () {
        for (let i=0; i < dataHandler._data.cards.length; i++) {
            if (dataHandler._data.cards[i].status_id === 1){
                dataHandler._data.cards[i].order += 1;
            }

        }
    },
    deleteCard: function (cardId) {
        for (let i = 0; i < this._data.cards.length; i++) {
            if (this._data.cards[i].id == cardId) {
                this._data.cards[i].deleted = true;
                console.log(this._data.cards);
                this._saveData();
                dataHandler.syncData(this._data);
            }
        }
    },
    deleteBoard: function (boardId) {
        for (let i = 0; i < this._data.boards.length; i++) {
            if (this._data.boards[i].id == boardId) {
                this._data.boards[i].deleted = true;
                //TODO: sync
                this._saveData();
                dataHandler.syncData(this._data);
            }
        }
    },
    getBoardId: function (cardId) {
        for (let i = 0; i < this._data.cards.length; i++) {
            if (this._data.cards[i].id == cardId) {
                return this._data.cards[i].board_id;
            }
        }
    },
    syncData: function (data) {
        console.log("Data sync in process...");
        const url = "/get-synced-data";
        const merged_data = {
            boards: data["boards"],
            cards: data["cards"]
        };
        let payload = JSON.stringify(merged_data);
        fetch(url, {
            method: 'POST',
            body: payload,
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }).then(function(response) {
            if (response.ok) {
                console.log("Data sync completed");
                return response.json();
            } else {
                throw `Data sync failed: ${response.status} ${response.statusText}`;
            }
        }).then(function(json_response){
            console.log("JSON parse ok");
            console.log("JS RESPONSE_" + json_response);
            dataHandler._data["boards"] = json_response["boards"];
            dataHandler._data["cards"] = json_response["cards"];
        }).catch(function (err) {
            console.log("Data sync failed: " + err);
        });
    }
};
