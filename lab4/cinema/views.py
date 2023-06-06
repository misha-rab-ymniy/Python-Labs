from cart.forms import CartAddFilmForm
from django.shortcuts import render, get_object_or_404

from .models import Category, Film


# Create your views here.
def film_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    films = Film.objects.filter(available=True)
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        films = films.filter(category=category)
    return render(request, 'cinema/film/list.html',
                  {'category': category,
                   'categories': categories,
                   'films': films})


def film_detail(request, id, slug):
    film = get_object_or_404(Film, id=id, slug=slug, available=True)
    cart_film_form = CartAddFilmForm()
    return render(request, 'cinema/film/detail.html', {'film': film, 'cart_film_form': cart_film_form})
