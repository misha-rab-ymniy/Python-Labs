import base64
import inspect
import types
from collections.abc import Iterator

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

        if isinstance(obj, (types.MethodType, types.FunctionType)):
            return Encoder.__encode_function(obj)

        if isinstance(obj, Iterator):
            print('iter')
            return Encoder.__encode_iter(obj)

        if inspect.isclass(obj):
            return Encoder.__encode_class(obj)

        return Encoder.__encode_object(obj)

    @staticmethod
    def __encode_iter(obj):
        data = list(map(Encoder.encode, obj))
        return {'__type__': 'iterator', 'data': data}

    @staticmethod
    def __encode_cell(obj):
        return {'__type__': 'cell', '__value__': Encoder.encode(obj.cell_contents)}

    @staticmethod
    def __encode_dict(obj):
        a = {key: Encoder.encode(value) for key, value in obj.items()}
        return a

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
        class_ = getattr(
            inspect.getmodule(obj),
            obj.__qualname__.split(".<locals>", 1)[0].rsplit(".", 1)[0],
        )
        encoded_function = {'__type__': 'function' if isinstance(obj, types.FunctionType) else 'method',
                            '__code__': Encoder.encode(obj.__code__),
                            '__name__': obj.__name__,
                            '__globals__': {
                                key: Encoder.encode(value)
                                for (key, value) in obj.__globals__.items() if
                                key in obj.__code__.co_names and value is not class_
                                and key != obj.__code__.co_name
                            },
                            '__defaults__': obj.__defaults__,
                            '__closure__': tuple(cell for cell in obj.__closure__ if
                                                 cell.cell_contents is not class_)
                            if obj.__closure__ is not None else tuple()
                            }
        return encoded_function

    @staticmethod
    def __encode_object(obj):
        return {'__type__': 'object', '__class__': Encoder.__encode_class(obj.__class__),
                'attributes': {
                    key: Encoder.encode(value) for key, value in inspect.getmembers(obj)
                    if not key.startswith('__') and not isinstance(value, (types.FunctionType, types.MethodType))
                }}

    @staticmethod
    def __encode_code(obj):
        attributes = [attr for attr in dir(obj) if
                      attr.startswith('co') and attr not in ["co_positions", "co_lines", "co_lnotab",
                                                             "co_exceptiontable"]]
        encoded_code = {
            attribute: Encoder.encode(getattr(obj, attribute)) for attribute in attributes
        }
        return encoded_code

    @staticmethod
    def __encode_class(obj):
        attributes = {attribute: Encoder.encode(getattr(obj, attribute)) for attribute, value in inspect.getmembers(obj)
                      if
                      attribute not in [
                          "__mro__", "__base__", "__basicsize__",
                          "__class__", "__dictoffset__", "__name__",
                          "__qualname__", "__text_signature__", "__itemsize__",
                          "__flags__", "__weakrefoffset__", "__objclass__"
                      ] and type(value) not in [
                          types.WrapperDescriptorType, types.MethodDescriptorType,
                          types.BuiltinFunctionType, types.MappingProxyType,
                          types.GetSetDescriptorType
                      ]}
        bases = [Encoder.encode(base) for base in obj.__bases__ if base != object]
        encoded_class = {'__type__': 'class',
                         '__name__': obj.__name__,
                         'data': attributes,
                         '__bases__': bases
                         }
        return encoded_class


class Decoder:
    @staticmethod
    def decode(obj):
        if type(obj) in BASE_TYPE:
            return obj
        if type(obj) is dict:
            if obj.get('__type__') is None:
                return {key: Decoder.decode(value) for key, value in obj.items()}
            if obj['__type__'] in ['function', 'method']:
                return Decoder.__decode_function(obj)
            if obj['__type__'] == 'module':
                return Decoder.__decode_module(obj)
            if obj['__type__'] == 'tuple':
                return tuple(Decoder.decode(item) for item in obj['items'])
            if obj['__type__'] == 'cell':
                return Decoder.__decode_cell(obj)
            if obj['__type__'] == 'bytes':
                return Decoder.__decode_bytes(obj['data'])
            if obj['__type__'] == 'iterator':
                return iter(item for item in obj['data'])
            if obj['__type__'] == 'class':
                return Decoder.__decode_class(obj)
            if obj['__type__'] == 'object':
                return Decoder.__decode_object(obj)
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

    @staticmethod
    def __decode_class(obj):
        name = obj['__name__']
        bases = tuple(Decoder.decode(item) for item in obj.pop('__bases__'))
        data = {
            attr: Decoder.decode(item) for (attr, item) in obj['data'].items()
            if not (isinstance(item, dict) and item.get('__type__') == 'function')
        }

        decode_class = type(name, bases, data)

        for key, item in obj['data'].items():
            if isinstance(item, dict) and item.get('__type__') == 'function':
                try:
                    func = Decoder.decode(item)
                except ValueError:
                    lst = list(item['__closure__'])
                    lst.append((lambda: decode_class).__closure__[0])
                    item['__closure__'] = tuple(lst)
                    func = Decoder.decode(item)
                setattr(decode_class, item['__name__'], func)
        return decode_class

    @staticmethod
    def __decode_object(obj):
        dec = Decoder.__decode_class(obj['__class__'])
        new_obj = object.__new__(dec)
        new_obj.__dict__ = {
            key: Decoder.decode(value) for key, value in obj["attributes"].items()
        }
        return new_obj
