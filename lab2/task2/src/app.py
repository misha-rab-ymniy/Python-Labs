from cli import CLI
from container_controller import ContainerController


class APP:
    __possible_commands = '''
        # add <key> [key, …] – add one or more elements to the container
        # remove <key> – delete key from container
        # find <key> [key, …] – check if the element is presented in the container
        # list – print all elements of container
        # grep <regex> – check the value in the container by regular expression
        # save/load – save container to file/load container from file
        # switch – switches to another user
    '''
    is_work = True

    def show_possible_commands(self, args=''):
        print('Hello! List of all commands: \n', self.__possible_commands)

    def start_app(self):
        print(f'''Hello! It's CLI program-storage for unique elements! ''')
        self.show_possible_commands()

        cli = CLI()
        controller = ContainerController()

        all_commands = ['add', 'load', 'save', 'find', 'remove', 'grep', 'switch', 'list', 'exit']
        for command in all_commands:
            cli.append_command(command, getattr(controller, command))

        cli.append_command('help', self.show_possible_commands)

        while self.is_work:
            cli.parse_command()
