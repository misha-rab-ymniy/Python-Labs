import math

import json_serialization as json


class A:
    name: str

    def __init__(self, name):
        self.name = name


class B:
    id: int

    def __init__(self, id):
        self.id = id


Fa = 10


class Lol(A, B):
    k: int
    t: A = A(2)
    Fa = 2

    def __init__(self, k, id, name):
        self.k = int(math.acos(k))
        super().__init__(name)
        super().__init__(id)

    def hif(self):
        k = int(math.acos(0.5))
        print("hif")


def func():
    print("func")


if __name__ == '__main__':
    lol = Lol(1, 2, "3")
    # print(dir(Lol))
    # print(Lol.__bases__)
    # print(type(lol.hif))
    serialize_obj = json.dumps(func)
    print(serialize_obj)
    deserialize_obj = json.loads(serialize_obj)
    print(deserialize_obj)
