from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    def create_user(
            self,
            email,
            first_name,
            last_name,
            date_birth,
            phone_number,
            password=None,
            **extra_fields
    ):
        if not email:
            raise ValueError("Email should be set")
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            date_birth=date_birth,
            phone_number=phone_number,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
            self,
            email,
            first_name,
            last_name,
            date_birth,
            phone_number,
            password=None,
            **extra_fields
    ):
        if not email:
            raise ValueError("Email should be set")
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))

        return self.create_user(
            email,
            first_name,
            last_name,
            date_birth,
            phone_number,
            password,
            **extra_fields
        )
