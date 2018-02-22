import datetime, bcrypt


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


