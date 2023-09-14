from django.db import models
from django.urls import reverse
from django.utils import timezone


# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("news_details", args=[str(self.id)])
