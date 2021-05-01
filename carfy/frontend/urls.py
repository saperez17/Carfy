from django.urls import path
from django.conf.urls import url
from django.contrib import admin
from .views import *

urlpatterns = [
    url(r'^.*', index_view),  # regex matches, then lets routing be handled by the frontend. Still needs a / at end.
]