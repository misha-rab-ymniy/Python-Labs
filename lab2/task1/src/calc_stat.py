import re


def calc_sentences(text: str) -> int:
    reg = "[.?!]+"
    number_sentences = len(list(re.finditer(reg, text)))
    return number_sentences
