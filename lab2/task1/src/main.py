from calc_stat import calc_sentences, calc_non_declarative_sentences


def main():
    text = input("Please, input the text: \n")
    print(f"Number of sentences in the text: {calc_sentences(text)}")
    print(f"Number of non-declarative sentences in the text: {calc_non_declarative_sentences(text)}")


if __name__ == "__main__":
    main()
