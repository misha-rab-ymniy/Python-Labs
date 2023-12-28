import json

from cart.forms import CartAddFilmForm
from django.db.models import Min
from django.shortcuts import render, get_object_or_404, redirect
from lab4.services import get_random_poem
from news.models import Article

from .forms import FilmForm, SessionForm
from .models import Category, Film, Session


def main(request):
    context = {}
    context["last_article"] = Article.objects.order_by("-created_at").first()
    context["poem"] = get_random_poem()
    return render(request, 'cinema/main.html', context)


# Create your views here.
def film_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    films = Session.objects.values('film').annotate(price=Min('price'))
    for film in films:
        film['film'] = Film.objects.get(id=film['film'])

    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        answer = []
        for film in films:
            if category in film['film'].category.all():
                answer.append(film)
        films = answer

    js_list = []
    for film in films:
        js_list.append(film['price'])

    print(json.dumps(js_list))
    return render(request, 'cinema/film/list.html',
                  {'category': category,
                   'categories': categories,
                   'films': films,
                   'js_films': json.dumps(js_list)})


def film_detail(request, id, slug):
    film = get_object_or_404(Film, id=id)
    session = Session.objects.filter(film=film)
    cart_film_form = CartAddFilmForm()
    return render(request, 'cinema/film/detail.html',
                  {'film': film, 'cart_film_form': cart_film_form, 'sessions': session})


def edit_film(request, id, slug):
    film = get_object_or_404(Film, id=id)
    form = FilmForm(instance=film)
    if request.method == "POST":
        form = FilmForm(request.POST, instance=film)
        if form.is_valid():
            form.save()
            return redirect("/")
        else:
            form = FilmForm(instance=film)
    return render(request, "cinema/film/film_edit.html", {"form": form, "exhibit": film})


def create_session(request):
    form = SessionForm()
    if request.method == "POST":
        form = SessionForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("cinema:film_list")
        else:
            form = SessionForm()
    return render(request, "cinema/film/create_session.html", {"form": form})


def create_film(request):
    form = FilmForm()
    if request.method == "POST":
        form = FilmForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("cinema:session-create")
        else:
            form = FilmForm()
    return render(request, "cinema/film/create_film.html", {"form": form})


def delete_film(request, id, slug):
    film = get_object_or_404(Film, id=id)
    film.delete()
    return redirect("cinema:film_list")
