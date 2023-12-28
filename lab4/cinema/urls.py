from django.urls import path

from . import views

app_name = 'cinema'

urlpatterns = [
    path('', views.main, name='main'),
    path('list', views.film_list, name='film_list'),
    path('<slug:category_slug>', views.film_list, name='film_list_by_category'),
    path('<int:id>/<slug:slug>', views.film_detail, name='film_detail'),
    path("<int:id>/<slug:slug>/edit", views.edit_film, name="film-edit"),
    path("list/create/session", views.create_session, name="session-create"),
    path("list/create/film", views.create_film, name="film-create"),
    path("<int:id>/<slug:slug>/delete", views.delete_film, name="film-delete"),
]
