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


def length_each_word(words: list[str]) -> list[int]:
    return list(map(lambda word: len(word), words))


def separate_words(text: str) -> list[str]:
    reg = r'\w*[A-z]\w*'
    return re.findall(reg, text)


def average_sentences_length(text: str) -> float:
    len_words = sum(length_each_word(separate_words(text)))
    num_sentences = calc_sentences(text)
    try:
        return len_words / num_sentences
    except ZeroDivisionError:
        return 0


def average_words_length(text: str) -> float:
    len_each_word = length_each_word(separate_words(text))
    try:
        return sum(len_each_word) / len(len_each_word)
    except ZeroDivisionError:
        return 0
