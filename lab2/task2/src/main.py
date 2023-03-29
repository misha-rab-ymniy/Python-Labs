from app import APP


def main():
    try:
        APP().start_app()
    except KeyboardInterrupt:
        print("\nGoodbye!")


if __name__ == '__main__':
    main()
