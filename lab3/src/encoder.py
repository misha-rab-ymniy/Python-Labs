import base64
import inspect
import types

from constants import BASE_TYPE


class Encoder:

    @staticmethod
    def encode(obj):
        if isinstance(obj, BASE_TYPE):
            return obj

        if isinstance(obj, bytes):
            return Encoder.__encode_bytes(obj)

        if isinstance(obj, types.ModuleType):
            return Encoder.__encode_module(obj)

        if isinstance(obj, types.CellType):
            return Encoder.__encode_cell(obj)

        if isinstance(obj, (list, tuple)):
            return Encoder.__encode_collection(obj)

        if isinstance(obj, dict):
            return Encoder.__encode_dict(obj)

        if isinstance(obj, types.CodeType):
            return Encoder.__encode_code(obj)

        if isinstance(obj, types.MethodType):
            return Encoder.__encode_method(obj)

        if isinstance(obj, types.FunctionType):
            print('func')
            return Encoder.__encode_function(obj)

        if inspect.isclass(obj):
            return

        # if isinstance(obj, object):
        #     return Encoder.__encode_object(obj)
        print(f'конец, {type(obj)}, {obj}')
        return

    @staticmethod
    def __encode_method(obj):
        print(inspect.getmodule(obj))
        print(obj.__qualname__.split(".<locals>", 1)[0].rsplit(".", 1)[0])
        cls = getattr(
            inspect.getmodule(obj),
            obj.__qualname__.split(".<locals>", 1)[0].rsplit(".", 1)[0],
        )
        print(dir(obj))
        print(obj.__qualname__)
        if isinstance(cls, type):
            print(cls)

    @staticmethod
    def __encode_cell(obj):
        return {'__type__': 'cell', '__value__': Encoder.encode(obj.cell_contents)}

    @staticmethod
    def __encode_dict(obj):
        return {key: Encoder.encode(value) for key, value in obj.items()}

    @staticmethod
    def __encode_collection(obj):
        return {'__type__': obj.__class__.__name__, 'items': type(obj)([Encoder.encode(item) for item in obj])}

    @staticmethod
    def __encode_module(obj):
        return {'__type__': 'module', '__name__': obj.__name__}

    @staticmethod
    def __encode_bytes(obj):
        return {'__type__': 'bytes', 'data': base64.b64encode(obj).decode("ascii")}

    @staticmethod
    def __encode_function(obj):
        encoded_function = {'__type__': 'function',
                            '__code__': Encoder.encode(obj.__code__),
                            '__name__': Encoder.encode(obj.__name__),
                            '__globals__': {
                                key: Encoder.encode(value)
                                for (key, value) in obj.__globals__.items()
                                if key in obj.__code__.co_names and key != obj.__code__.co_name
                            },
                            '__defaults__': Encoder.encode(obj.__defaults__),
                            '__closure__': Encoder.encode(obj.__closure__)
                            }
        return encoded_function

    @staticmethod
    def __encode_object(obj):
        return {'__type__': 'object', '__class__': Encoder.__encode_class(obj.__class__),
                'attributes': obj.__dict__}

    @staticmethod
    def __encode_code(obj):
        attributes = [attr for attr in dir(obj) if
                      attr.startswith('co') and attr not in ["co_positions", "co_lines", "co_lnotab",
                                                             "co_exceptiontable"]]
        encoded_code = {
            attribute: Encoder.encode(getattr(obj, attribute)) for attribute in attributes
        }
        return encoded_code
        # print(types.CodeType())

    @staticmethod
    def __encode_class(obj):
        pass


class Decoder:
    @staticmethod
    def decode(obj):
        if type(obj) in BASE_TYPE:
            return obj
        if type(obj) is dict:
            if obj.get('__type__') is None:
                return {key: Decoder.decode(value) for key, value in obj.items()}
            if obj['__type__'] == 'function':
                return Decoder.__decode_function(obj)
            if obj['__type__'] == 'module':
                return Decoder.__decode_module(obj)
            if obj['__type__'] == 'tuple':
                lst = tuple(Decoder.decode(item) for item in obj['items'])
                return lst
            if obj['__type__'] == 'cell':
                return Decoder.__decode_cell(obj)
            if obj['__type__'] == 'bytes':
                return Decoder.__decode_bytes(obj['data'])
        return obj

    @staticmethod
    def __decode_function(obj):
        clos = Decoder.decode(obj['__closure__'])
        func = types.FunctionType(code=Decoder.__decode_code(obj['__code__']),
                                  name=obj['__name__'],
                                  globals=Decoder.decode(obj['__globals__']),
                                  argdefs=obj['__defaults__'],
                                  closure=clos)
        return func

    @staticmethod
    def __decode_code(obj):
        decoded = Decoder.decode(obj)

        def f():
            pass

        return f.__code__.replace(**decoded)

    @staticmethod
    def __decode_module(obj):
        return __import__(obj['__name__'])

    @staticmethod
    def __decode_cell(obj):
        value = Decoder.decode(obj['__value__'])
        return (lambda: value).__closure__[0]

    @staticmethod
    def __decode_bytes(obj):
        return base64.b64decode(obj.encode("ascii"))
