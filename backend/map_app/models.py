from django.db import models

# Create your models here.
class RemoteSite(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.CharField(max_length=50, default="active")


    def __str__(self):
        return self.name