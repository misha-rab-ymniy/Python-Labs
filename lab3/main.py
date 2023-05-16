from custom_serializer.encoder import Encoder, Decoder

if __name__ == '__main__':
    ser = Encoder.encode([1, 2, 3, 4, 5])
    des = Decoder.decode(ser)
    print(des)
