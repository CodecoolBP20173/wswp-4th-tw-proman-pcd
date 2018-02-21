// It is just an idea how you can structure your data during your page is running.
// You can use it for testing purposes by simply copy/paste/run in the Console tab in your browser

var keyInLocalStorage = 'proman-data';

sampleData = {
    "statuses": [
        {
            "id": 1,
            "name": "New"
        },
        {
            "id": 2,
            "name": "In progress"
        },
        {
            "id": 3,
            "name": "Testing"
        },
        {
            "id": 4,
            "name": "Done"
        }
    ],
    "boards": [
        {
            "id": 1,
            "title": "AskMate (sprint 1)",
            "is_active": true,
            "deleted": false,
            "new": false
        },
        {
            "id": 2,
            "title": "AskMate (sprint 2)",
            "is_active": true,
            "deleted": false,
            "new": false
        },
        {
            "id": 3,
            "title": "AskMate (sprint 3)",
            "is_active": true,
            "deleted": false,
            "new": false
        },
        {
            "id": 4,
            "title": "ProMan",
            "is_active": true,
            "deleted": false,
            "new": false
        }
    ],
    "cards": [
        //1. board: AskMate Sprint 1
        {
            "id": 1,
            "title": "List questions",
            "board_id": 1,
            "status_id": 1,
            "order": 1,
            "deleted": false,
            "new": false
        },
        {
            "id": 2,
            "title": "Display a question",
            "board_id": 1,
            "status_id": 1,
            "order": 2,
            "deleted": false,
            "new": false
        },
        {
            "id": 3,
            "title": "Ask a question",
            "board_id": 1,
            "status_id": 1,
            "order": 3,
            "deleted": false,
            "new": false
        },
        {
            "id": 4,
            "title": "Sort questions",
            "board_id": 1,
            "status_id": 1,
            "order": 4,
            "deleted": false,
            "new": false
        },
        {
            "id": 5,
            "title": "Edit a question",
            "board_id": 1,
            "status_id": 1,
            "order": 5,
            "deleted": false,
            "new": false
        },
        {
            "id": 6,
            "title": "Delete question",
            "board_id": 1,
            "status_id": 1,
            "order": 6,
            "deleted": false,
            "new": false
        },
        {
            "id": 7,
            "title": "Post an answer",
            "board_id": 1,
            "status_id": 1,
            "order": 7,
            "deleted": false,
            "new": false
        },
        {
            "id": 8,
            "title": "Delete an answer",
            "board_id": 1,
            "status_id": 1,
            "order": 8,
            "deleted": false,
            "new": false
        },
        {
            "id": 9,
            "title": "Vote",
            "board_id": 1,
            "status_id": 1,
            "order": 9,
            "deleted": false,
            "new": false
        },
        {
            "id": 10,
            "title": "Add image",
            "board_id": 1,
            "status_id": 1,
            "order": 10,
            "deleted": false,
            "new": false
        },

        //2. board: AskMate Sprint 2
        {
            "id": 11,
            "title": "Use database",
            "board_id": 2,
            "status_id": 1,
            "order": 1,
            "deleted": false,
            "new": false
        },
        {
            "id": 12,
            "title": "Sort questions",
            "board_id": 2,
            "status_id": 1,
            "order": 2,
            "deleted": false,
            "new": false
        },
        {
            "id": 13,
            "title": "Display latest questions",
            "board_id": 2,
            "status_id": 1,
            "order": 3,
            "deleted": false,
            "new": false
        },
        {
            "id": 14,
            "title": "Search questions",
            "board_id": 2,
            "status_id": 1,
            "order": 4,
            "deleted": false,
            "new": false
        },
        {
            "id": 15,
            "title": "Fancy search results",
            "board_id": 2,
            "status_id": 1,
            "order": 5,
            "deleted": false,
            "new": false
        },
        {
            "id": 16,
            "title": "Edit answer",
            "board_id": 2,
            "status_id": 1,
            "order": 6,
            "deleted": false,
            "new": false
        },
        {
            "id": 17,
            "title": "Add comment to question",
            "board_id": 2,
            "status_id": 1,
            "order": 7,
            "deleted": false,
            "new": false
        },
        {
            "id": 18,
            "title": "Add comment to answer",
            "board_id": 2,
            "status_id": 1,
            "order": 8,
            "deleted": false,
            "new": false
        },
        {
            "id": 19,
            "title": "Edit comments",
            "board_id": 2,
            "status_id": 1,
            "order": 9,
            "deleted": false,
            "new": false
        },
        {
            "id": 20,
            "title": "Delete comments",
            "board_id": 2,
            "status_id": 1,
            "order": 10,
            "deleted": false,
            "new": false
        },
        {
            "id": 21,
            "title": "Tag question",
            "board_id": 2,
            "status_id": 1,
            "order": 11,
            "deleted": false,
            "new": false
        },
        {
            "id": 22,
            "title": "Delete tag",
            "board_id": 2,
            "status_id": 1,
            "order": 12,
            "deleted": false,
            "new": false
        },

        //3. board:  AskMate Sprint 3
        {
            "id": 23,
            "title": "User registration",
            "board_id": 3,
            "status_id": 1,
            "order": 1,
            "deleted": false,
            "new": false
        },
        {
            "id": 24,
            "title": "User login",
            "board_id": 3,
            "status_id": 1,
            "order": 2,
            "deleted": false,
            "new": false
        },
        {
            "id": 25,
            "title": "List users",
            "board_id": 3,
            "status_id": 1,
            "order": 3,
            "deleted": false,
            "new": false
        },
        {
            "id": 26,
            "title": "Bind questions to user",
            "board_id": 3,
            "status_id": 1,
            "order": 4,
            "deleted": false,
            "new": false
        },
        {
            "id": 27,
            "title": "Bind answer to user",
            "board_id": 3,
            "status_id": 1,
            "order": 5,
            "deleted": false,
            "new": false
        },
        {
            "id": 28,
            "title": "Bind the comment to user",
            "board_id": 3,
            "status_id": 1,
            "order": 6,
            "deleted": false,
            "new": false
        },
        {
            "id": 29,
            "title": "User page",
            "board_id": 3,
            "status_id": 1,
            "order": 7,
            "deleted": false,
            "new": false
        },
        {
            "id": 30,
            "title": "Accepted answer",
            "board_id": 3,
            "status_id": 1,
            "order": 8,
            "deleted": false,
            "new": false
        },
        {
            "id": 31,
            "title": "Gain reputation",
            "board_id": 3,
            "status_id": 1,
            "order": 9,
            "deleted": false,
            "new": false
        },
        {
            "id": 32,
            "title": "Lose reputation",
            "board_id": 3,
            "status_id": 1,
            "order": 10,
            "deleted": false,
            "new": false
        },
        {
            "id": 33,
            "title": "Tag page",
            "board_id": 3,
            "status_id": 1,
            "order": 11,
            "deleted": false,
            "new": false
        },

        //4. board: ProMan
        {
            "id": 34,
            "title": "Development/Create an enviroment",
            "board_id": 4,
            "status_id": 1,
            "order": 1,
            "deleted": false,
            "new": false
        },
        {
            "id": 35,
            "title": "Boards/List page",
            "board_id": 4,
            "status_id": 1,
            "order": 2,
            "deleted": false,
            "new": false
        },
        {
            "id": 36,
            "title": "Boards/Detailed page",
            "board_id": 4,
            "status_id": 1,
            "order": 3,
            "deleted": false,
            "new": false
        },
        {
            "id": 37,
            "title": "Cards/Order",
            "board_id": 4,
            "status_id": 1,
            "order": 4,
            "deleted": false,
            "new": false
        },
        {
            "id": 38,
            "title": "Cards/Statuses",
            "board_id": 4,
            "status_id": 1,
            "order": 5,
            "deleted": false,
            "new": false
        },
        {
            "id": 39,
            "title": "Cards/Edit title",
            "board_id": 4,
            "status_id": 1,
            "order": 6,
            "deleted": false,
            "new": false
        }
    ]
};

localStorage.setItem(keyInLocalStorage, JSON.stringify(sampleData));