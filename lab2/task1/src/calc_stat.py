import re

from abbreviations import ONE_LETTER_ABB, TWO_LETTER_ABB


def calc_sentences(text: str) -> int:
    reg = "[.?!]+"
    number_sentences = len(list(re.finditer(reg, text)))

    for abb in ONE_LETTER_ABB:
        num_abb = len(re.findall(abb, text))
        number_sentences -= num_abb

    for abb in TWO_LETTER_ABB:
        num_abb = len(re.findall(abb, text))
        number_sentences -= num_abb * 2

    return number_sentences
