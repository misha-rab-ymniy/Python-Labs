from calc_stat import calc_sentences, calc_non_declarative_sentences, average_sentences_length, average_words_length


def main():
    text = input("Please, input the text: \n")
    print(f"Number of sentences in the text: {calc_sentences(text)}")
    print(f"Number of non-declarative sentences in the text: {calc_non_declarative_sentences(text)}")
    print(f"Average length of the sentence in characters: {average_sentences_length(text)}")
    print(f"Average length of the word in characters: {average_words_length(text)}")


if __name__ == "__main__":
    main()
