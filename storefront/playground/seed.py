from .models import Movie

def run():
    sample_movies = [
        {
            "title": "The Matrix",
            "director": "Wachowskis",
            "genre": "Sci-Fi",
            "platform": "Netflix",
            "status": "completed",
            "is_tv": False,
            "total_episodes": 0,
            "episodes_watched": 0,
            "rating": 5,
            "review": "A classic sci-fi action film."
        },
        {
            "title": "Stranger Things",
            "director": "Duffer Brothers",
            "genre": "Sci-Fi",
            "platform": "Netflix",
            "status": "watching",
            "is_tv": True,
            "total_episodes": 34,
            "episodes_watched": 8,
            "rating": 4,
            "review": "Exciting supernatural thriller."
        },
        {
            "title": "Breaking Bad",
            "director": "Vince Gilligan",
            "genre": "Drama",
            "platform": "Prime",
            "status": "wishlist",
            "is_tv": True,
            "total_episodes": 62,
            "episodes_watched": 0,
            "rating": 0,
            "review": ""
        }
    ]

    for movie_data in sample_movies:
        movie, created = Movie.objects.get_or_create(title=movie_data["title"], defaults=movie_data)
        if created:
            print(f"Added: {movie.title}")
        else:
            print(f"Skipped (already exists): {movie.title}")
