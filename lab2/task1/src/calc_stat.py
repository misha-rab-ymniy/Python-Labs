import re

from abbreviations import ONE_LETTER_ABB, TWO_LETTER_ABB


def calc_sentences(text: str) -> int:
    reg = r'[.?!]+'
    number_sentences = len(re.findall(reg, text))

    for abb in ONE_LETTER_ABB:
        num_abb = len(re.findall(abb, text))
        number_sentences -= num_abb

    for abb in TWO_LETTER_ABB:
        num_abb = len(re.findall(abb, text))
        number_sentences -= num_abb * 2

    return number_sentences


def calc_non_declarative_sentences(text: str) -> int:
    reg = r'([!?]+)'
    return len(re.findall(reg, text))
