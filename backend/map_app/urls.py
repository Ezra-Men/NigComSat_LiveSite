from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RemoteSiteViewSet

router = DefaultRouter()
router.register(r'sites', RemoteSiteViewSet, basename='site')

urlpatterns = [
    path('sites/', include(router.urls)),
]