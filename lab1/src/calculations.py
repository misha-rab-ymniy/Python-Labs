from enum import Enum


class Operation(Enum):
    ADD = "add"
    DIV = "div"
    SUB = "sub"
    MULT = "mult"


def calculate(first_number: float, second_number: float, operation: Operation):
    match operation:
        case Operation.ADD:
            return first_number + second_number
        case Operation.SUB:
            return first_number - second_number
        case Operation.DIV:
            return first_number / second_number
        case Operation.MULT:
            return first_number * second_number
