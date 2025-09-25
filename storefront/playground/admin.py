from django.contrib import admin
from .models import Movie

# Register your models here.
@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'platform', 'genre', 'rating', 'is_tv')
    list_editable = ('status', 'platform', 'genre', 'rating','is_tv') 
    search_fields = ('title', 'director', 'platform', 'genre')