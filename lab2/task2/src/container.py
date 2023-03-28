import re


class Container:
    __storage: set[str] = set()
    __username: str

    def __init__(self, name: str):
        self.__username = name

    def add(self, key: str):
        self.__storage.add(key)

    def remove(self, key: str):
        self.__storage.remove(key)

    def find(self, key: str):
        return key in self.__storage

    def list(self):
        return list(self.__storage)

    def grep(self, reg: str):
        return list(filter(lambda key: re.match(reg, key), self.__storage))

    def save(self):
        pass

    def load(self):
        pass
