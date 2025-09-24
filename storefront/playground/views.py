from rest_framework import viewsets, filters
from .models import Movie
from .serializers import MovieSerializer

# Create your views here.
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all().order_by('title')
    serializer_class = MovieSerializer

    # enable filtering
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'genre', 'platform', 'status']
    ordering_fields = ['title', 'genre', 'platform', 'status']