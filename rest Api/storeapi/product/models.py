from django.db import models
from django.urls import reverse

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255,unique=True)
    description = models.TextField()
    slug = models.SlugField(max_length=255,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    class Meta:
        ordering = ['name']  
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10,decimal_places=2)