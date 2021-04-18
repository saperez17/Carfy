from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework.decorators import api_view

from django.contrib.auth.models import AnonymousUser

from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer

import json
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
    def get_queryset(self):
        user = self.request.user
        print(f"get service provider info  {self.request.user}")
        if (user.id!=None):
            filtered_queryset = self.queryset.filter(user=user.pk)
            return filtered_queryset.all()
        else:
            return None

class ShopListCreate(generics.ListCreateAPIView):
    '''
    URL: /api/shop/
    description: GET-> Returns a list of all shops
                 GET with shop_name -> Returns details of the corresponding shop
                 POST -> save a new shop to the db given the right data is provided
    '''
    queryset =  Shop.objects.all()
    serializer_class = ShopSerializer
    def get(self, request, *args, **kwargs):
        print(request)
        shop_name = request.data.get('shop_name')
        if(shop_name!=None):
            shop = self.queryset.filter(shop_name=shop_name)
            if (shop.count()!=0):
                return Response(self.serializer_class(shop[0]).data) 
        return self.list(request, *args, **kwargs)  
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)        

class ShopServiceListCreate(generics.ListCreateAPIView):
    queryset =  ShopService.objects.all()
    serializer_class = ShopServiceSerializer


