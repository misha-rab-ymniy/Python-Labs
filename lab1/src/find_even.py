def find_even(numbers: list) -> list:
    return list(filter(lambda x: not x % 2, numbers))
