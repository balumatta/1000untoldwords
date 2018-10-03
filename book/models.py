from django.db import models
from django.core.validators import RegexValidator


class UserDetails(models.Model):
    name = models.CharField(max_length=256, blank=False, null=False)
    views = models.IntegerField(unique=False, blank=True, null=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                                 message="Phone number must be entered in the format: '+999999999'.")
    phone = models.CharField(validators=[phone_regex], max_length=15)
    reviews = models.CharField(max_length=1024, blank=True, null=True)
