from django.urls import path

from . import views

app_name = "info"
urlpatterns = [
    path('', views.about_us, name='about_us'),
]
