from django.contrib import admin

from .models import Category, Film, Session, Hall, Ticket


# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


admin.site.register(Category, CategoryAdmin)


class FilmAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created', 'updated']
    list_filter = ['created', 'updated']
    # list_editable = ['price', 'available']
    prepopulated_fields = {'slug': ('name',)}


admin.site.register(Film, FilmAdmin)

admin.site.register(Session)
admin.site.register(Hall)
admin.site.register(Ticket)
