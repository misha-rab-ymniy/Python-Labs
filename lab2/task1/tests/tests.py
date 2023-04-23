import unittest

from ..src.calc_stat import (
    calc_sentences,
    average_words_length,
    average_sentences_length,
    calc_non_declarative_sentences,
    get_ngrams_top
)


class TestAmountOfSentences(unittest.TestCase):
    def test_1(self):
        self.assertEqual(calc_sentences('Hello, World! '), 1)

    def test_2(self):
        self.assertEqual(calc_sentences('Hello, Mr.Maks.'), 1)

    def test_3(self):
        self.assertEqual(calc_sentences('Hello, Mr. Maks!? '), 1)

    def test_4(self):
        self.assertEqual(calc_sentences('Hello, Dr. Maks. '), 1)

    def test_5(self):
        self.assertEqual(calc_sentences('Hello, Mrs. Maxwell...'), 1)

    def test_6(self):
        self.assertEqual(calc_sentences('There is some great news when it comes to job interviews. It’s not all '
                                        'doom and gloom (bad). Most recruiters these days ask the interviewees ('
                                        'you) the same basic questions.'), 3)

    def test_7(self):
        self.assertEqual(calc_sentences(''), 0)

    def test_8(self):
        self.assertEqual(calc_sentences('1231.'), 1)


class TestAverageLengthOfWords(unittest.TestCase):
    def test_1(self):
        self.assertEqual(average_words_length('Another sentence.'), 7.5)

    def test_2(self):
        self.assertEqual(average_words_length('My strange sentence.'), 17 / 3)

    def test_3(self):
        self.assertEqual(average_words_length(''), 0)

    def test_4(self):
        self.assertEqual(average_words_length('Hello!'), 5)

    def test_5(self):
        self.assertEqual(average_words_length('M'), 1)


class TestAverageLengthOfSentence(unittest.TestCase):
    def test_1(self):
        self.assertEqual(average_sentences_length('Hello Mr. Maks! Im a driver.'), 10)

    def test_2(self):
        self.assertEqual(average_sentences_length('Hello!'), 5)

    def test_3(self):
        self.assertEqual(average_sentences_length(''), 0)

    def test_4(self):
        self.assertEqual(average_sentences_length('1.'), 0)

    def test_5(self):
        self.assertEqual(average_sentences_length(' '), 0)


class TestAmountOfNonDeclarative(unittest.TestCase):
    def test_1(self):
        self.assertEqual(calc_non_declarative_sentences('Hello Mr. Maks! Im a driver.'), 1)

    def test_2(self):
        self.assertEqual(calc_non_declarative_sentences('H!'), 1)

    def test_3(self):
        self.assertEqual(calc_non_declarative_sentences(''), 0)

    def test_4(self):
        self.assertEqual(calc_non_declarative_sentences('I.'), 0)

    def test_5(self):
        self.assertEqual(calc_non_declarative_sentences('Hello!!!!!!!'), 1)


class TestNGrams(unittest.TestCase):
    def test_1(self):
        self.assertEqual(get_ngrams_top('Hello, Maks!', 10, 3),
                         [('Hel', 1), ('ell', 1), ('llo', 1), ('lo,', 1), ('o, ', 1),
                          (', M', 1), (' Ma', 1), ('Mak', 1), ('aks', 1), ('ks!', 1)])

    def test_2(self):
        self.assertEqual(get_ngrams_top('', 100, 100), [])

    def test_3(self):
        self.assertEqual(get_ngrams_top('H', 1, 1), [('H', 1)])

    def test_4(self):
        self.assertEqual(get_ngrams_top('Hello!', 0, 0), [])


if __name__ == '__main__':
    unittest.main()
