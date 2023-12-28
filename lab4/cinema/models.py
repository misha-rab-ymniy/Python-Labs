import users.models
from django.db import models
from django.urls import reverse


# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True, unique=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def get_absolute_url(self):
        return reverse('cinema:film_list_by_category', args={self.slug})

    def __str__(self):
        return self.name


class Film(models.Model):
    category = models.ManyToManyField(Category, related_name='categories')
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True)
    image = models.ImageField(upload_to='films/%Y/%m/%d', blank=True)
    description = models.TextField(blank=True)
    duration = models.TimeField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('name',)
        indexes = [
            models.Index(fields=['id', 'slug'])
        ]
        verbose_name = 'Фильм'
        verbose_name_plural = 'Фильмы'

    def get_absolute_url(self):
        return reverse('cinema:film_detail', args=[self.id, self.slug])

    def __str__(self):
        return self.name


class Hall(models.Model):
    capacity = models.IntegerField(default=0)
    seats_number = models.IntegerField()
    seats_row = models.IntegerField()
    hall_name = models.CharField(max_length=200)

    def __str__(self):
        return self.hall_name


class Session(models.Model):
    film = models.ForeignKey(Film, related_name='film', on_delete=models.CASCADE)
    hall = models.ForeignKey(Hall, related_name='hall', on_delete=models.DO_NOTHING)
    date = models.DateTimeField(null=True, blank=True)
    hall_name = models.CharField(max_length=200)
    price = models.IntegerField(default=0)

    class Meta:
        ordering = ('date', 'film')
        indexes = [
            models.Index(fields=['film'])
        ]
        verbose_name = 'Сеанс'
        verbose_name_plural = 'Сеансы'

    def get_absolute_url(self):
        return reverse('cinema:session', args=[self.id])

    def __str__(self):
        return f"Сессия {self.date}"


class Ticket(models.Model):
    user = models.ForeignKey(users.models.CustomUser, on_delete=models.DO_NOTHING, null=True)
    date_of_purchase = models.DateTimeField(auto_now_add=True)
    seat_number = models.PositiveIntegerField()
    seat_row = models.PositiveIntegerField()
    hall = models.ForeignKey(Hall, on_delete=models.DO_NOTHING)
    session = models.ForeignKey(Session, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"ticket {self.id}"
