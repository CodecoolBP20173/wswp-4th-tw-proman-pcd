import datetime, bcrypt
from data import queries
import json


def convert_unix_timestamp_to_readable(unix_stamp):
    """
    Takes a unix timestamp as an argument, then converts it to human readable format :)
    :param unix_stamp: The unix timestamp you want to convert
    :return: String, readable to every human (UTC time)
    """
    return datetime.datetime.utcfromtimestamp(int(unix_stamp)).strftime('%Y-%m-%d\n%H:%M:%S')


def hash_password(plain_text_password):
    # By using bcrypt, the salt is saved into the hash itself
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    #TODO:Write back to salted
    return (plain_text_password == hashed_password)
    #hashed_bytes_password = hashed_password.encode('utf-8')
    #return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)

def get_merged_dicts_list(dict_list1, dict_list2):
    dictstring_list1 = [json.dumps(dictelem, sort_keys=True) for dictelem in dict_list1]
    dictstring_list2 = [json.dumps(dictelem, sort_keys=True) for dictelem in dict_list2]
    merged_dictstring_set = set(local_boards_strings + sql_boards_strings)
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


def process_local_cards (local_cards, user_id):
    processed_cards = []
    for board in local_cards:
        if board["new"]:
            queries.insert_card(board, user_id)
            board["new"] = False
        if board["deleted"]:
            queries.delete_card(board["id"])
        else:
            processed_cards.append(board)
    return processed_cards


def add_default_values(dictlist):
    for i in range(len(dictlist)):
        dictlist[i]["new"] = False
        dictlist[i]["deleted"] = False
    return dictlist


def sync_data(local_data, user_id):
    sql_boards = add_default_values(queries.get_boards(user_id))
    sql_cards = add_default_values(queries.get_cards(user_id))

    local_boards = local_data["boards"]
    local_cards = local_data["cards"]

    process_local_boards(local_boards, user_id)
    process_local_boards(local_cards, user_id)

    merged_boards = get_merged_dicts_list(local_boards, sql_boards)
    merged_cards = get_merged_dicts_list(local_cards, sql_cards)

    merged_data = {
        "boards": merged_boards,
        "cards" : merged_cards
    }
    return merged_data




