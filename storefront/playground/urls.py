from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet

# URLConf
router = DefaultRouter()
router.register(r'playground', MovieViewSet)

urlpatterns = [
    path('', include(router.urls)),
]