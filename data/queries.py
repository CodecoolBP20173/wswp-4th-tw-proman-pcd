from data import data_manager


def get_shows():
    return data_manager.execute_select('SELECT * FROM users;')


def add_new_row_into_users(user_name, password, time):
    return data_manager.execute_dml_statement("""
                                                INSERT INTO users (user_id, password, submission_time)
                                                VALUES (%(user_name)s, %(user_name)s, %(user_name)s);
                                              """, {'user_name': user_name, 'password': password,
                                                    'time': time})
