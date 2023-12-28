from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=200, help_text="Enter first name")
    last_name = models.CharField(max_length=200, help_text="Enter last name")
    date_birth = models.DateField()
    email = models.EmailField()
    phone_number = models.CharField(max_length=50, help_text="Enter phone number")
    post = models.CharField(
        max_length=50, default="admin_post", help_text="Enter phone post"
    )

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["first_name", "last_name", "date_birth", "email", "phone_number"]

    def __str__(self):
        return f"{self.id} {self.first_name} {self.last_name}"
