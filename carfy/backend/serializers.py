from rest_framework import serializers
from .models import *

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ('id', 'author', 'message', 'created_at')




class ServiceProviderSerializer(serializers.ModelSerializer):
    # shop_services = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # owner = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = ServiceProvider
        
    def create(self, validated_data):
        return ServiceProvider.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
            instance.user = validated_data.get('user', instance.user)
            instance.payment = validated_data.get("payment", instance.payment)
            instance.city = validated_data.get("city", instance.city)
            instance.country = validated_data.get("longitude", instance.longitude)
            instance.email = validated_data.get("email", instance.email)
            instance.save()
            return instance

class ShopSerializer(serializers.ModelSerializer):
    # shop_services = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Shop
        fields = ['owner','shop_name', 'membership', 'longitude', 'latitude']
        # 'shop_services'
        
    def create(self, validated_data):
        return Shop.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
            instance.owner = validated_data.get('owner', instance.owner)
            instance.shop_name = validated_data.get("shop_name", instance.shop_name)
            instance.membership = validated_data.get("membership", instance.membership)
            instance.longitude = validated_data.get("longitude", instance.longitude)
            instance.latitude = validated_data.get("latitude", instance.latitude)
            # instance.shop_services = validated_data.get("shop_services", instance.shop_services)
            instance.save()
            return instance
            
class ShopServiceSerializer(serializers.ModelSerializer):
    # shop_services = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    provider = serializers.PrimaryKeyRelatedField( read_only=True)
    services = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = ShopService
        fields = ['provider','target_automobile', 'price', 'services', 'description']
        # 'shop_services'
        
    def create(self, validated_data):
        return ShopService.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
            provider.owner = validated_data.get('provider', instance.provider)
            target_automobile.shop_name = validated_data.get("target_automobile", instance.target_automobile)
            instance.price = validated_data.get("price", instance.price)
            instance.services = validated_data.get("services", instance.services)
            instance.description = validated_data.get("description", instance.description)
            instance.save()
            return instance

# class CustomerPublication(serializers.ModelSerializer):
#     class Meta:
#         model = CustomerPublication
#         fields = ['publisher', 'longitude', 'latitude', 'photo']
#     def create(self, validated_data):
#         return CustomerPublication.objects.create(**validated_data)
    
#     def update(self, instance, validated_data):
#             instance.publisher = validated_data.get("publisher", instance.publisher)
#             instance.longitude = validated_data.get("longitude", instance.longitude)
#             instance.latitude = validated_data.get("latitude", instance.latitude)
#             instance.photo = validated_data.get("photo", instance.photo)
#             instance.save()
#             return instance