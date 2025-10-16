from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RemoteSiteSerializer
from .models import RemoteSite
# Create your views here.


class RemoteSiteViewSet(viewsets.ModelViewSet):
    queryset = RemoteSite.objects.all()
    serializer_class = RemoteSiteSerializer

    