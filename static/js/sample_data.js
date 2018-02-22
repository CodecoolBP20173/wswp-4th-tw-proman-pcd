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
            "submission_time": "2016-01-30 20:30",
            "new": true,
            "deleted": false
        },
        {
            "id": 2,
            "title": "AskMate (sprint 2)",
            "is_active": true,
            "submission_time": "2016-01-30 20:30",
            "new": true,
            "deleted": false
        },
        {
            "id": 3,
            "title": "AskMate (sprint 3)",
            "is_active": true,
            "submission_time": "2016-01-30 20:30",
            "new": true,
            "deleted": false
        },
        {
            "id": 4,
            "title": "ProMan",
            "is_active": true,
            "submission_time": "2016-01-30 20:30",
            "new": true,
            "deleted": false
        }
    ],
    "cards": [
        //1. board: AskMate Sprint 1
        {
            "id": 1,
            "title": "List questions",
            "board_id": 1,
            "status_id": 4,
            "order_no": 1,
            "submission_time": "2016-01-30 20:30",
            "new": true,
            "deleted": false
        },
        {
            "id": 2,
            "title": "Display a question",
            "board_id": 1,
            "status_id": 4,
            "order_no": 2,
            "submission_time": "2016-01-30 20:30",
            "new": true,
            "deleted": false
        },
        {
            "id": 3,
            "title": "Ask a question",
            "board_id": 1,
            "status_id": 1,
            "order_no": 1,
            "submission_time": "2016-01-30 20:30",
            "new": true,
            "deleted": false
        },
        {
            "id": 4,
            "title": "Sort questions",
            "board_id": 1,
            "status_id": 4,
            "order_no": 3,
            "submission_time": "2016-09-30 20:30",
            "new": true,
            "deleted": false
        },
        {
            "id": 5,
            "title": "Edit a question",
            "board_id": 1,
            "status_id": 3,
            "order_no": 1,
            "submission_time": "2016-09-30 20:30",
            "new": true,
            "deleted": false
        },
        {
            "id": 6,
            "title": "Delete question",
            "board_id": 1,
            "status_id": 2,
            "order_no": 1,
            "submission_time": "2016-11-30 20:30",
            "new": true,
            "deleted": false
        }
    ]
};

localStorage.setItem(keyInLocalStorage, JSON.stringify(sampleData));