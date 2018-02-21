from flask import Flask, render_template, Response, request
import json
import utility
app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route("/get-synced-boards", methods=["POST"])
def sync_boards():
    local_boards = request.get_json()
    synced_boards = local_boards # sync_boards(local_boards)
    synced_boards_json = json.dumps(synced_boards)
    response = Response(synced_boards_json, status=200, mimetype='application/json')
    return response


@app.route("/get-synced-cards", methods=["POST"])
def sync_cards():
    local_cards = request.get_json()
    synced_cards = local_cards # sync_cards(local_cards)
    synced_cards_json = json.dumps(synced_cards)
    response = Response(synced_cards_json, status=200, mimetype='application/json')
    return response


def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()