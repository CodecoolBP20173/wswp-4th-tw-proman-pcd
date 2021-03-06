from flask import Flask, render_template, request, session, redirect, abort, flash, url_for, jsonify
import time
from data import queries
from flask_login import LoginManager, login_user, logout_user, current_user, login_required
from datetime import timedelta
import utils

class User():

    def __init__(self, username, id):
        self.username = username
        self.id = id

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    @staticmethod
    def validate_login(password_hash, password):
        return utils.verify_password(password, password_hash)

app = Flask(__name__)

app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=10)


@login_manager.user_loader
def load_user(id):
    user = queries.get_user_by_id(id)
    if user == []:
        return None
    name = user[0]['username']
    return User(name, id)


@app.route("/")
@login_required
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route("/registration", methods=['GET', 'POST'])
def registration():
    if request.method == "GET":
        if current_user.is_authenticated:
            return render_template('boards.html')
        else:
            return render_template('registration.html')
    else:
        user_name = request.form['username']
        if queries.get_user_by_name(user_name) == []:
            password = utils.hash_password(request.form['password'])
            submission_time = utils.convert_unix_timestamp_to_readable(time.time())
            submission_time = submission_time.replace('\n', ' ')
            queries.add_new_row_into_users(user_name, password, submission_time)

            # automatically login
            user_id = queries.get_user_by_name(user_name)[0]['id']
            checked = 'remember-me'
            object_user = User(user_name, user_id)
            login_user(object_user, remember=checked)
            next = request.args.get('next')
            return redirect(next or url_for('boards'))
        else:
            flash("The username is already exist!")
            return redirect('/registration')


@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_name = request.form['username']
        password = request.form['password']
        user = queries.get_user_by_name(user_name)
        checked = 'remember-me' in request.form

        if user != [] and user_name == user[0]['username'] \
                and User.validate_login(user[0]['password'], password):
            user_id = user[0]['id']
            object_user = User(user_name, user_id)
            login_user(object_user, remember=checked)
            next = request.args.get('next')
            return redirect(next or url_for('boards'))
        else:
            flash("Incorrect ursername or password!")
            return redirect('/login')
    else:
        if current_user.get_id() == None:
            return render_template('login.html')
        else:
            return render_template('boards.html')


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.route("/get-synced-data", methods=["POST"])
@login_required
def sync_data():
    local_data = request.get_json()
    user_id = current_user.get_id()
    synced_data = utils.sync_data(local_data, user_id)
    response = jsonify(synced_data)
    return response


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()

