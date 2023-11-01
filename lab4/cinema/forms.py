from django import forms

from .models import Film, Session


class FilmForm(forms.ModelForm):
    class Meta:
        model = Film
        fields = ["category", "name", "slug", "image", "description", "duration"]


class SessionForm(forms.ModelForm):
    class Meta:
        model = Session
        fields = ["film", "hall", "date", "hall_name", "price"]
