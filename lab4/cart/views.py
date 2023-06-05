from cinema.models import Film
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST

from .cart import Cart
from .forms import CartAddFilmForm


@require_POST
def cart_add(request, film_id):
    cart = Cart(request)
    film = get_object_or_404(Film, id=film_id)
    form = CartAddFilmForm(request.POST)
    if form.is_valid():
        cd = form.cleaned_data
        cart.add(film=film,
                 quantity=cd['quantity'],
                 update_quantity=cd['update'])
    return redirect('cart:cart_detail')


def cart_remove(request, film_id):
    cart = Cart(request)
    film = get_object_or_404(Film, id=film_id)
    cart.remove(film)
    return redirect('cart:cart_detail')


def cart_detail(request):
    cart = Cart(request)
    return render(request, 'cart/detail.html', {'cart': cart})
