import random
import string

def generate_id(n):
    """
    Генерирует уникальный идентификатор длиной n.

    :param n: Длина идентификатора.
    :return: Строка с уникальным идентификатором.
    """
    if n <= 0:
        raise ValueError("Длина идентификатора должна быть больше 0")
    
    characters = string.ascii_letters + "_" + string.digits
    return ''.join(random.choices(characters, k=n))


if "__main__" == __name__:
    # Пример использования:
    id_length = 10
    unique_id = generate_id(id_length)
    print(f"Сгенерированный ID: {unique_id}")
