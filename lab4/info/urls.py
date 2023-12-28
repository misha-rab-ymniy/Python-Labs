from django.urls import path

from . import views

app_name = "info"
urlpatterns = [
    path('about_us', views.about_us, name='about_us'),
    path('faq', views.faq, name='faq'),
    path('privacy_policy', views.privacy_policy, name='privacy_policy'),
    path('contacts', views.contacts, name='contacts'),
    path('additional', views.additional, name='additional'),
    path('coupons', views.coupons, name='coupons.css'),
    path('vacancies', views.vacancies, name='vacancies')
]
