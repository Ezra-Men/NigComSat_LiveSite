from rest_framework import serializers
from .models import RemoteSite

class RemoteSiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = RemoteSite
        fields =  '__all__'