from flask import Flask, render_template, request, session
from data import queries
app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route("/registration")
def registration():
    #if request.method == 'POST':
    #/registration?name=alma&pwd=korte
    user_name = request.args.get('name')
    password = request.args.get('pwd')
    #session['name'] = user_name
    #session['pwd'] = password
    print(user_name, password, queries.get_shows())
    return render_template('boards.html')


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()