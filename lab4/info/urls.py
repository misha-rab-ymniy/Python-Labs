from django.urls import path

from . import views

app_name = "info"
urlpatterns = [
    path('about_us', views.about_us, name='about_us'),
    path('faq', views.faq, name='faq'),
]
