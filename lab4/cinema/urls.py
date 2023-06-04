from django.urls import path

from . import views

urlpatterns = [
    path('', views.film_list, name='film_list'),
    path('<slug:category_slug>', views.film_list, name='film_list_by_category'),
    path('<slug:id>/<slug:slug>', views.film_detail, name='film_detail')
]
