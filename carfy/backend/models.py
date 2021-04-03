from django.db import models

# Create your models here.
class Lead(models.Model):
    author = models.CharField(max_length=100)
    message = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)