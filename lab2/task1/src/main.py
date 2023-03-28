from calc_stat import calc_sentences, calc_non_declarative_sentences, average_sentences_length, average_words_length, \
    get_ngrams_top


def main():
    text = input("Please, input the text: \n")
    print(f"Number of sentences in the text: {calc_sentences(text)}")
    print(f"Number of non-declarative sentences in the text: {calc_non_declarative_sentences(text)}")
    print(f"Average length of the sentence in characters: {average_sentences_length(text)}")
    print(f"Average length of the word in characters: {average_words_length(text)}")

    try:
        k, n = map(int, input('Enter K and N to get top-K repeated N-grams in the text: ').split())

        k_repeated = get_ngrams_top(text, k, n)
        if not k_repeated:
            print(f'There is no any {n}-grams in text')
        else:
            print('Top-K repeated N-grams in the text:')
            for ngram, count in k_repeated.items():
                print(f'Ngram "{ngram}" appears {count} time{"s" if count > 1 else ""}')
    except ValueError:
        print("Invalid input")


if __name__ == "__main__":
    main()
