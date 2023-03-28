from calc_stat import calc_sentences


def main():
    text = input()
    print(f"Number of sentences in the text: {calc_sentences(text)}")


if __name__ == "__main__":
    main()
