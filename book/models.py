from django.db import models
from django.core.validators import RegexValidator


class UserDetails(models.Model):
    name = models.CharField(max_length=256, blank=False, null=False)
    views = models.IntegerField(unique=False, blank=True, null=True)
    reviews = models.CharField(max_length=1024, blank=True, null=True)
