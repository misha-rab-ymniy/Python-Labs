import requests


def get_random_joke(request):
    try:
        response = requests.get(
            "https://icanhazdadjoke.com", headers={"Accept": "application/json"}
        ).json()
        return response
    except:
        return []


def get_random_poem():
    try:
        [poem] = requests.get("https://poetrydb.org/linecount,random/4;1").json()
        return poem.get("lines")
    except:
        return []
