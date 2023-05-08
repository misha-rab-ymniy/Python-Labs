from lab3.src.encoder import Encoder


def dumps(obj):
    data = Encoder.encode(obj)
    return _dumps(data)


def _dumps(obj):
    if isinstance(obj, (int, float)):
        return f'<{obj.__class__.__name__}>{obj}</{obj.__class__.__name__}>'
    if isinstance(obj, bool):
        return f'<bool>{str(obj).lower()}</bool>'
    if isinstance(obj, str):
        return f'<str>{str(obj)}</str>'
    if isinstance(obj, type(None)):
        return f'<none>None</none>'
    if isinstance(obj, (list, tuple)):
        return f"<list>{''.join(list(map(_dumps, obj)))}</list>"
    if isinstance(obj, dict):
        data = "".join([f'<{key}>{_dumps(value)}</{key}>' for key, value in obj.items()])
        return f"<dict>{data}</dict>"
