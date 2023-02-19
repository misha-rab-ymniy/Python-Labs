from calculations import calculate, Operation
from hello_world import hello_world


def main():
    hello_world()

    try:
        print(calculate(6, 4, Operation.MULT))
    except ZeroDivisionError as err:
        print("Division by zero")


if __name__ == "__main__":
    main()
