from django.urls import path

from . import views

app_name = 'cinema'

urlpatterns = [
    path('', views.main, name='main'),
    path('list', views.film_list, name='film_list'),
    path('<slug:category_slug>', views.film_list, name='film_list_by_category'),
    path('<int:id>/<slug:slug>', views.film_detail, name='film_detail')
]
