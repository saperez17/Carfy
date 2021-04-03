from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics


from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
# Create your views here.

class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
class CustomerListCreate(generics.ListCreateAPIView):
    queryset =  Customer.objects.all()
    serializer_class = CustomerSerializer
class ServiceProviderListCreate(generics.ListCreateAPIView):
    queryset =  ServiceProvider.objects.all()
    serializer_class = ServiceProviderSerializer
class ShopListCreate(generics.ListCreateAPIView):
    queryset =  Shop.objects.all()
    serializer_class = ShopSerializer


