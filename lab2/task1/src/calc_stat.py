import re

from abbreviations import ONE_LETTER_ABB, TWO_LETTER_ABB


def calc_all_sentences(text: str) -> int:
    reg = r'[.?!]+'
    return len(re.findall(reg, text))


def calc_sentences(text: str) -> int:
    return calc_all_sentences(text) - extra_sentences(text)


def extra_sentences(text: str) -> int:
    num = 0
    reg = r"[\"']([^\"']+)[\"']"
    direct_speeches = re.findall(reg, text)
    for direct_speech in direct_speeches:
        num = calc_all_sentences(direct_speech) - find_abbreviations(direct_speech)
    return num + find_abbreviations(text)


def find_abbreviations(text: str) -> int:
    num = 0
    for abb in ONE_LETTER_ABB:
        num_abb = len(re.findall(abb, text))
        num += num_abb

    for abb in TWO_LETTER_ABB:
        num_abb = len(re.findall(abb, text))
        num += num_abb * 2
    return num


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


def generate_ngrams(text: str, n: int) -> list[str]:
    return [text[i:i + n] for i in range(len(text) - n + 1)]


def get_ngrams_top(text: str, k: int = 10, n: int = 4) -> dict:
    substring_dict = {}
    ngrams = generate_ngrams(text, n)
    for ngram in ngrams:
        substring_dict[ngram] = substring_dict.get(ngram, 0) + 1

    if not substring_dict:
        return {}
    else:
        sorted_dict = dict(sorted(substring_dict.items(), key=lambda item: item[1], reverse=True))
        sorted_list = list(sorted_dict)
        k = min(len(sorted_list), k)

        k_repeated = {}
        for i in range(k):
            k_repeated[sorted_list[i]] = sorted_dict[sorted_list[i]]
        return k_repeated
