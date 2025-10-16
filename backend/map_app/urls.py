from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RemoteSiteViewSet

router = DefaultRouter()
router.register(r'sites', RemoteSiteViewSet, basename='remote-site')

urlpatterns = [
    path('', include(router.urls)),
]
