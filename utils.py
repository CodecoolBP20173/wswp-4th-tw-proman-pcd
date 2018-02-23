import datetime, bcrypt
from data import queries
import json
import copy


def convert_unix_timestamp_to_readable(unix_stamp):
    """
    Takes a unix timestamp as an argument, then converts it to human readable format :)
    :param unix_stamp: The unix timestamp you want to convert
    :return: String, readable to every human (UTC time)
    """
    return datetime.datetime.utcfromtimestamp(int(unix_stamp)).strftime('%Y-%m-%d\n%H:%M:%S')


def hash_password(plain_text_password):
    """
    It hashes password. By using bcrypt, the salt is saved into the hash itself
    :param plain_text_password: String
    :return: String
    """
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    """
    It verifies the given password compared to the saved one
    :param plain_text_password: String
    :param hashed_password: String
    :return: Boolean
    """
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)

def get_merged_dicts_list(dict_list1, dict_list2):
    dictstring_list1 = [json.dumps(dictelem, sort_keys=True) for dictelem in dict_list1]
    dictstring_list2 = [json.dumps(dictelem, sort_keys=True) for dictelem in dict_list2]
    merged_dictstring_set = set(dictstring_list1 + dictstring_list2)
    return [json.loads(string) for string in merged_dictstring_set]


def process_local_boards (local_boards, user_id):
    processed_boards = []
    for board in local_boards:
        if board["new"]:
            queries.insert_board(board, user_id)
            board["new"] = False
        if board["deleted"]:
            queries.delete_board(board["id"])
        else:
            processed_boards.append(board)
    return processed_boards


def process_local_cards(local_cards, user_id):
    processed_cards = []
    for card in local_cards:
        if card["new"]:
            queries.insert_card(card, user_id)
            card["new"] = False
        if card["deleted"]:
            queries.delete_card(card["id"])
        else:
            if card["edited"]:
                queries.update_card(card)
                card["edited"] = False
            processed_cards.append(card)
    return processed_cards


def add_default_values_boards(dictlist):
    for i in range(len(dictlist)):
        dictlist[i]["new"] = False
        dictlist[i]["deleted"] = False
        dictlist[i]["is_active"] = True
    return dictlist


def add_default_values_cards(dictlist):
    for i in range(len(dictlist)):
        dictlist[i]["new"] = False
        dictlist[i]["edited"] = False
        dictlist[i]["deleted"] = False
    return dictlist


def filter_old_data(data_list):
    result_list = copy.deepcopy(data_list)
    for i in range(len(data_list)):
        for data in data_list[i+1:]:
            if data_list[i]["id"] == data["id"]:
                if data_list[i]["submission_time"] > data["submission_time"]:
                    result_list.remove(data)
                else:
                    result_list.append(data_list[i])
    return result_list


def correct_time_format_in_data(data_list):
    for i in range(len(data_list)):
        data_list[i]["submission_time"] = data_list[i]["submission_time"].strftime('%Y-%m-%d %H:%M')


def sync_data(local_data, user_id):
    # Upward update
    local_boards = local_data["boards"]
    local_cards = local_data["cards"]

    processed_local_boards = process_local_boards(local_boards, user_id)
    processed_local_cards = process_local_cards(local_cards, user_id)

    # Downward update
    sql_boards = add_default_values_boards(queries.get_boards(user_id))
    sql_cards = add_default_values_cards(queries.get_cards(user_id))

    correct_time_format_in_data(sql_boards)
    correct_time_format_in_data(sql_cards)

    merged_boards = get_merged_dicts_list(processed_local_boards, sql_boards)
    merged_cards = get_merged_dicts_list(processed_local_cards, sql_cards)

    result_boards = filter_old_data(merged_boards)
    result_cards = filter_old_data(merged_cards)

    merged_data = {
        "boards": result_boards,
        "cards" : result_cards
    }
    return merged_data

