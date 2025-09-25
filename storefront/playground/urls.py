from django.urls import path, include
from django.http import HttpResponse
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet

# URLConf
router = DefaultRouter()
router.register(r'playground', MovieViewSet)

# Homepage view
def home(request):
    return HttpResponse("Welcome to MovieMate API")

urlpatterns = [
   path('', home),              # this makes '/' work
   path('api/', include(router.urls)),
]