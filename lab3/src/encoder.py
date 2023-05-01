import inspect
import types

from constants import BASE_TYPE


class Encoder:

    @staticmethod
    def encode(obj):
        if isinstance(obj, BASE_TYPE):
            print('base_type')
            return obj

        elif inspect.isclass(obj):
            print('class')

        elif isinstance(obj, types.FunctionType):
            print('function')
            return Encoder.__encode_function(obj)

        elif isinstance(obj.__class__, types.MethodType):
            print('method')

        elif isinstance(obj, object):
            print('object')
            return Encoder.__encode_object(obj)

    @staticmethod
    def __encode_function(obj):
        print(dir(obj))
        print(obj.__class__.__)
        encode_function = {'__type__': obj.__class__.__name__, }

    @staticmethod
    def __encode_object(obj):
        return {'__type__': 'object', 'class_of_object': Encoder.__encode_class(obj.__class__),
                'attributes': obj.__dict__}

    @staticmethod
    def __encode_class(obj):
        pass


class Decoder:
    @staticmethod
    def decode(obj):
        if type(obj) in BASE_TYPE:
            return obj
        else:
            pass
