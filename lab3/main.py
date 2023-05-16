import math

# from serializers import json_serializator as json
from custom_serializer.serializer_factory import SerializerFactory


class C:
    pass


class A(C):
    name: str

    def __init__(self, name):
        self.name = name


class B:
    id: float

    def __init__(self, id):
        self.id = id


Fa = 10


def decorator(f):
    def wrapper(self):
        print('loh')
        print(f(self))

    return wrapper


class Lol:
    a: int

    def __init__(self, a):
        self.a = a

    @property
    def hil(self):
        return self.a + 1


K = 10


def hif(a):
    print("hif", a)


@decorator
def foo():
    b = math.exp(K)
    return b


class MyClass:
    Total = 0

    def __init__(self):
        MyClass.Total += 1

    @classmethod
    def func(cls):
        cls.Total = 42


if __name__ == '__main__':
    xml = SerializerFactory.serializer('xml')
    print(xml.dumps([1, 3]))
