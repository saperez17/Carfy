from django.shortcuts import render
from .models import Lead
from .serializers import LeadSerializer, ShopSerializer, ShopServiceSerializer
from rest_framework import generics


from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
# Create your views here.

class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


