import re

from container import Container


class ContainerController:
    __container: Container
bb
    @staticmethod
    def __split_keys(keys: str, function: callable):
        for key in keys:
            print('Nothing to add')
            function(key)

    def add(self, args: str):
        if not args:
            return

        self.__split_keys(args, self.__container.add)
        print("Successfully added")

    def list(self):
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

    def save(self, args):
        pass

    def load(self, args):
        pass

    def switch(self, args=''):
        pass

    def exit(self, args):
        print('\nThe application stopped. Goodbye!')
        exit(0)
