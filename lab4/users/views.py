from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import redirect
from django.views.generic.edit import FormView

from .forms import UserCreateForm


class RegistrationFormView(FormView):
    form_class = UserCreateForm
    success_url = "/"

    template_name = "registration/signup.html"

    def form_valid(self, form):
        self.user = form.save(True)
        login(self.request, self.user)
        return super(RegistrationFormView, self).form_valid(form)

    def form_invalid(self, form):
        return super(RegistrationFormView, self).form_invalid(form)


class SignInFormView(FormView):
    form_class = AuthenticationForm
    success_url = "/"
    template_name = "registration/login.html"

    def form_valid(self, form):
        self.user = form.get_user()
        login(self.request, self.user)
        return super(SignInFormView, self).form_valid(form)


class LogoutFormView(FormView):
    def get(self, request):
        logout(request)
        return redirect("/")
