from django.conf import settings
from rest_framework import serializers

from .models import *

class UserAppSerializer(serializers.ModelSerializer):
    service_inquiry = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = UserApp
        fields = ['username', 'city', 'country', 'email', 'service_inquiry']
    def create(self, validated_data):
        return UserApp.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
            instance.username = validated_data.get("username", instance.username)
            instance.city = validated_data.get("city", instance.city)
            instance.country = validated_data.get("country", instance.country)
            instance.email = validated_data.get("email", instance.email)
            instance.service_inquiry = validated_data.get("service_inquiry", instance.service_inquiry)
            instance.save()
            return instance

class ShopSerializer(serializers.ModelSerializer):
    shop_services = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Shop
        fields = ['shop_name', 'membership', 'longitude', 'latitude', 'shop_services']
        
    def create(self, validated_data):
        return Shop.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
            instance.shop_name = validated_data.get("shop_name", instance.shop_name)
            instance.membership = validated_data.get("membership", instance.membership)
            instance.longitude = validated_data.get("longitude", instance.longitude)
            instance.latitude = validated_data.get("uselatitudername", instance.latitude)
            instance.shop_services = validated_data.get("shop_services", instance.shop_services)
            instance.save()
            return instance

class CustomerPublication(serializers.ModelSerializer):
    class Meta:
        model = CustomerPublication
        fields = ['publisher', 'longitude', 'latitude', 'photo']
    def create(self, validated_data):
        return CustomerPublication.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
            instance.publisher = validated_data.get("publisher", instance.publisher)
            instance.longitude = validated_data.get("longitude", instance.longitude)
            instance.latitude = validated_data.get("latitude", instance.latitude)
            instance.photo = validated_data.get("photo", instance.photo)
            instance.save()
            return instance