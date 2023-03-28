from calculations import calculate, Operation
from find_even import find_even
from hello_world import hello_world


def main():
    hello_world()

    try:
        print(calculate(6, 4, Operation.MULT))
    except ZeroDivisionError as err:
        print("Division by zero")

    print(find_even([2, 3, 4, 8, 7, 6, 9, 5]))


if __name__ == "__main__":
    main()
