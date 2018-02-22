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
            "is_active": true
        },
        {
            "id": 2,
            "title": "AskMate (sprint 2)",
            "is_active": true
        },
        {
            "id": 3,
            "title": "AskMate (sprint 3)",
            "is_active": true
        },
        {
            "id": 4,
            "title": "ProMan",
            "is_active": true
        }
    ],
    "cards": [
        //1. board: AskMate Sprint 1
        {
            "id": 1,
            "title": "List questions",
            "board_id": 1,
            "status_id": 4,
            "order": 1
        },
        {
            "id": 2,
            "title": "Display a question",
            "board_id": 1,
            "status_id": 4,
            "order": 2
        },
        {
            "id": 3,
            "title": "Ask a question",
            "board_id": 1,
            "status_id": 1,
            "order": 1
        },
        {
            "id": 4,
            "title": "Sort questions",
            "board_id": 1,
            "status_id": 4,
            "order": 3
        },
        {
            "id": 5,
            "title": "Edit a question",
            "board_id": 1,
            "status_id": 3,
            "order": 1
        },
        {
            "id": 6,
            "title": "Delete question",
            "board_id": 1,
            "status_id": 2,
            "order": 1
        },
        {
            "id": 7,
            "title": "Post an answer",
            "board_id": 1,
            "status_id": 1,
            "order": 2
        },
        {
            "id": 8,
            "title": "Delete an answer",
            "board_id": 1,
            "status_id": 2,
            "order": 2
        },
        {
            "id": 9,
            "title": "Vote",
            "board_id": 1,
            "status_id": 1,
            "order": 3
        },
        {
            "id": 10,
            "title": "Add image",
            "board_id": 1,
            "status_id": 1,
            "order": 4
        },

        //2. board: AskMate Sprint 2
        {
            "id": 11,
            "title": "Use database",
            "board_id": 2,
            "status_id": 3,
            "order": 1
        },
        {
            "id": 12,
            "title": "Sort questions",
            "board_id": 2,
            "status_id": 4,
            "order": 1
        },
        {
            "id": 13,
            "title": "Display latest questions",
            "board_id": 2,
            "status_id": 4,
            "order": 2
        },
        {
            "id": 14,
            "title": "Search questions",
            "board_id": 2,
            "status_id": 3,
            "order": 2
        },
        {
            "id": 15,
            "title": "Fancy search results",
            "board_id": 2,
            "status_id": 1,
            "order": 1
        },
        {
            "id": 16,
            "title": "Edit answer",
            "board_id": 2,
            "status_id": 2,
            "order": 1
        },
        {
            "id": 17,
            "title": "Add comment to question",
            "board_id": 2,
            "status_id": 2,
            "order": 2
        },
        {
            "id": 18,
            "title": "Add comment to answer",
            "board_id": 2,
            "status_id": 2,
            "order": 3
        },
        {
            "id": 19,
            "title": "Edit comments",
            "board_id": 2,
            "status_id": 2,
            "order": 4
        },
        {
            "id": 20,
            "title": "Delete comments",
            "board_id": 2,
            "status_id": 1,
            "order": 2
        },
        {
            "id": 21,
            "title": "Tag question",
            "board_id": 2,
            "status_id": 1,
            "order": 3
        },
        {
            "id": 22,
            "title": "Delete tag",
            "board_id": 2,
            "status_id": 1,
            "order": 4
        },

        //3. board:  AskMate Sprint 3
        {
            "id": 23,
            "title": "User registration",
            "board_id": 3,
            "status_id": 4,
            "order": 1
        },
        {
            "id": 24,
            "title": "User login",
            "board_id": 3,
            "status_id": 4,
            "order": 2
        },
        {
            "id": 25,
            "title": "List users",
            "board_id": 3,
            "status_id": 3,
            "order": 1
        },
        {
            "id": 26,
            "title": "Bind questions to user",
            "board_id": 3,
            "status_id": 2,
            "order": 1
        },
        {
            "id": 27,
            "title": "Bind answer to user",
            "board_id": 3,
            "status_id": 2,
            "order": 2
        },
        {
            "id": 28,
            "title": "Bind the comment to user",
            "board_id": 3,
            "status_id": 1,
            "order": 1
        },
        {
            "id": 29,
            "title": "User page",
            "board_id": 3,
            "status_id": 3,
            "order": 2
        },
        {
            "id": 30,
            "title": "Accepted answer",
            "board_id": 3,
            "status_id": 1,
            "order": 2
        },
        {
            "id": 31,
            "title": "Gain reputation",
            "board_id": 3,
            "status_id": 1,
            "order": 3
        },
        {
            "id": 32,
            "title": "Lose reputation",
            "board_id": 3,
            "status_id": 1,
            "order": 4
        },
        {
            "id": 33,
            "title": "Tag page",
            "board_id": 3,
            "status_id": 1,
            "order": 5
        },

        //4. board: ProMan
        {
            "id": 34,
            "title": "Development/Create an enviroment",
            "board_id": 4,
            "status_id": 4,
            "order": 1
        },
        {
            "id": 35,
            "title": "Boards/List page",
            "board_id": 4,
            "status_id": 4,
            "order": 2
        },
        {
            "id": 36,
            "title": "Boards/Detailed page",
            "board_id": 4,
            "status_id": 4,
            "order": 3
        },
        {
            "id": 37,
            "title": "Cards/Order",
            "board_id": 4,
            "status_id": 4,
            "order": 4
        },
        {
            "id": 38,
            "title": "Cards/Statuses",
            "board_id": 4,
            "status_id": 4,
            "order": 5
        },
        {
            "id": 39,
            "title": "Cards/Edit title",
            "board_id": 4,
            "status_id": 4,
            "order": 6
        }
    ]
};

localStorage.setItem(keyInLocalStorage, JSON.stringify(sampleData));