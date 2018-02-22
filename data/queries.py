from data import data_manager
import datetime


def get_users():
    return data_manager.execute_select('SELECT * FROM users;')


def add_new_row_into_users(user_name, password, time):
    data_manager.execute_dml_statement("""
                                          INSERT INTO users (username, password, submission_time) 
                                          VALUES (%(user_name)s, %(password)s, %(time)s);
                                        """, {'user_name': user_name, 'password': password, 'time': time})


def get_user(user_name):
    return data_manager.execute_select('SELECT username, password FROM users WHERE username = %(user_name)s;',
                                       {'user_name': user_name})


def get_boards(user_id):
    return data_manager.execute_select('SELECT id, title, submission_time FROM boards WHERE user_id = %(user_id)s;',
                                       {'user_id': user_id})


def get_cards(user_id):
    return data_manager.execute_select('SELECT id, board_id, status_id, title, order_no, submission_time FROM cards WHERE user_id = %(user_id)s;',
                                       {'user_id': user_id})


def insert_board(board, user_id):
    data_manager.execute_dml_statement("""
                                        INSERT INTO boards(id, user_id, title, submission_time)
                                        VALUES (%(id)s, %(user_id)s, %(title)s, %(submission_time)s);
                                       """, {
                                        "id": board["id"],
                                        "user_id": user_id,
                                        "title": board["title"],
                                        "submission_time": board["submission_time"]
                                        })


def insert_card(card, user_id):
    data_manager.execute_dml_statement("""
                                            INSERT INTO cards(id, board_id, user_id, status_id, title, order_no, submission_time)
                                            VALUES (%(id)s, %(board_id)s, %(user_id)s, %(status_id)s, %(title)s, %(order_no)s, %(submission_time)s);
                                           """, {
                                            "id": card["id"],
                                            "board_id": card["board_id"],
                                            "user_id": user_id,
                                            "status_id": card["status_id"],
                                            "title": card["title"],
                                            "order_no": card["order_no"],
                                            "submission_time": card["submission_time"]
                                            })

def delete_board(board_id):
        data_manager.execute_dml_statement("""
                                            DELETE FROM boards WHERE id = %(board_id)s;
                                            """, {
                                            "board_id": board_id
                                            })


def delete_card(card_id):
    data_manager.execute_dml_statement("""
                                            DELETE FROM cards WHERE id = %(card_id)s;
                                            """, {
                                            "card_id": card_id
                                        })