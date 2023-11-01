from datetime import date

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator

from .models import CustomUser


def validate_age(item):
    today = date.today()
    age = (
            today.year - item.year - int((today.month, today.day) < (item.month, item.day))
    )
    if int(age) < 18:
        raise ValidationError("You must be over 18 y.o.")


phone_number_validator = RegexValidator(
    regex=r"^(\+375 \([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2})$",
    message="Format +375 (XX) XXX-XX-XX",
)


class UserCreateForm(UserCreationForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(max_length=100)
    last_name = forms.CharField(max_length=100)
    date_birth = forms.DateField(
        widget=forms.TextInput(attrs={"class": "form-control", "type": "date"}),
        validators=[validate_age],
    )
    phone_number = forms.CharField(
        max_length=50,
        help_text="Enter phone number",
        validators=[phone_number_validator],
    )

    class Meta:
        model = CustomUser
        fields = {
            "username",
            "email",
            "first_name",
            "last_name",
            "date_birth",
            "phone_number",
            "password1",
            "password2",
        }

    def save(self, commit: bool):
        user = super(UserCreationForm, self).save(commit=False)
        user.email = self.cleaned_data["email"]
        user.first_name = self.cleaned_data["first_name"]
        user.last_name = self.cleaned_data["last_name"]
        user.date_birth = self.cleaned_data["date_birth"]
        user.phone_number = self.cleaned_data["phone_number"]
        if commit:
            user.save(True)
        return user
