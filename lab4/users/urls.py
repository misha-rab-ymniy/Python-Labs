from django.urls import path

from . import views

urlpatterns = [
    path("signup/", views.RegistrationFormView.as_view(), name="signup"),
    path("signin/", views.SignInFormView.as_view(), name="signin"),
    path("logout/", views.LogoutFormView.as_view(), name="logout"),
]
