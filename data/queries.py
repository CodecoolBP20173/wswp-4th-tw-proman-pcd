from data import data_manager


def get_users():
    return data_manager.execute_select('SELECT * FROM users;')


def add_new_row_into_users(user_name, password, time):
    data_manager.execute_dml_statement("""
                                          INSERT INTO users (username, password, submission_time) 
                                          VALUES (%(user_name)s, %(password)s, %(time)s);
                                        """, {'user_name': user_name, 'password': password, 'time': time})


def get_user_by_name(user_name):
    return data_manager.execute_select('SELECT id, username, password FROM users WHERE username = %(user_name)s;',
                                       {'user_name': user_name})


def get_user_by_id(user_id):
    return data_manager.execute_select('SELECT id, username, password FROM users WHERE id = %(user_id)s;',
                                       {'user_id': user_id})
