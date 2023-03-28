import os
import re

from cli import CLI
from container import Container


class ContainerController:
    __container: Container = None

    def __init__(self):
        self.switch()

    def __split_keys(self, keys: str, function: callable):
        for key in keys.split():
            function(key)

    def add(self, args: str):
        if not args:
            print('Nothing to add')
            return

        self.__split_keys(args, self.__container.add)
        print("Successfully added")

    def list(self, args):
        container_list = self.__container.list()

        if not container_list:
            print("Empty container")
            return

        print(' '.join(container_list))

    def remove(self, arg):
        if not arg:
            print("Nothing to remove")
            return

        if self.__container.find(arg):
            self.__container.remove(arg)
            print('Key removed successfully')
        else:
            print(f'The key {arg} was not found')

    def find(self, args):
        if not args:
            print('Keys to find was not entered')
            return
        self.__split_keys(args, self._find_key)

    def _find_key(self, key):
        if self.__container.find(key):
            print(f'Key: {key}')
        else:
            print(f'The key {key} was not found')

    def grep(self, args):
        if not args:
            print('Empty regexp')
            return

        try:
            reg = re.compile(args)
        except re.error:
            print('Incorrect regexp')
            return

        found_keys = self.__container.grep(reg)
        if not found_keys:
            print('Null elements')
            return

        print(' '.join(found_keys))

    def save(self):
        if not os.path.exists('./data'):
            os.mkdir('data')
        if self.__container:
            self.__container.save()
            print("Saved")
        else:
            print("Empty container")

    def load(self, args):
        try:
            self.__container.load()
            print("Loaded")
        except FileNotFoundError:
            print("This user doesn't have a container")

    def switch(self, args=''):
        if self.__container:
            self.__request_for_save()

        username = CLI.parse_username()
        self.__container = Container(username)

        self.__request_for_load(args)

    def __request_for_load(self, args):
        answer = input("Do you want to load? [yes/no] ")

        if answer.lower() in ['yes', 'y']:
            self.load(args)

    def __request_for_save(self):
        answer = input("Do you want to save? [yes/no] ")

        if answer.lower() in ['yes', 'y']:
            self.save()

    def exit(self, args):
        self.__request_for_save()
        print('\nThe application stopped. Goodbye!')
        exit(0)
