from flask import Flask, render_template, request, session, redirect, abort, flash, url_for
import time, utils
from data import queries
from flask_login import LoginManager, login_user, logout_user, login_required
from datetime import timedelta


class User():

    def __init__(self, username):
        self.username = username
        #self.email = None

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.username

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
def load_user(username):
    user = queries.get_user(username)
    if user == []:
        return None
    return User(username)


@app.route("/")
@login_required
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route("/registration")
def registration():
    #TODO: check if it exist in database
    user_name = "szilva"
    password = utils.hash_password('szilva3')
    submission_time = utils.convert_unix_timestamp_to_readable(time.time())
    submission_time = submission_time.replace('\n', ' ')
    session['name'] = user_name
    session['pwd'] = password
    queries.add_new_row_into_users(user_name, password, submission_time)

    return render_template('boards.html')


@app.route("/login", methods=['GET', 'POST'])
def login():
    # TODO: check if it exist in database, hashpassword!!!!
    if request.method == 'POST':
        user_name = request.form['username']#"alma"
        password = request.form['password']#"szilva"
        user = queries.get_user(user_name)

        checked = 'remember-me' in request.form

        if user != [] and user_name == user[0]['user_id'] \
                and User.validate_login(user[0]['password'], password):
            login_user(User(user_name), remember=checked)
            flash("Logged in successfully", category='success')
            next = request.args.get('next')
            return redirect(next or url_for('boards'))
            #return redirect(request.args.get("next"))
        else:
            abort(401)
    else:
        return render_template('login.html')


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()