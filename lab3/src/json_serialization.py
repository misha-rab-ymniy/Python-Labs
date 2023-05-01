from encoder import Encoder, Decoder


def dumps(obj):
    return Encoder.encode(obj)


def loads(obj):
    return Decoder.decode(obj)
