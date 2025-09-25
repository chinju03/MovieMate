from django.db import models

# Create your models here.
class Movie(models.Model):
    STATUS_CHOICES = [
        ('wishlist', 'Wishlist'),
        ('watching', 'Watching'),
        ('completed', 'Completed'),
    ]

    title = models.CharField(max_length=200)
    director = models.CharField(max_length=200, blank=True)
    genre = models.CharField(max_length=100, blank=True)
    poster = models.URLField(blank=True)
    platform = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='wishlist')
    is_tv = models.BooleanField(default=False)
    total_episodes = models.IntegerField(default=0)
    episodes_watched = models.IntegerField(default=0)
    rating = models.IntegerField(default=0)  # 1–5 stars
    review = models.TextField(blank=True)

    def __str__(self):
        return self.title
