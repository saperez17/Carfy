from rest_framework import serializers
from .models import *

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ('id', 'author', 'message', 'created_at')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class CustomerSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
        model=Customer
        fields = ['user', 'city', 'country', 'email' , 'fullname', 'address', 'mobile_phone']
    def get_serializer_context(self):
        return self.context['request'].data
    def create(self, validated_data):
        request_data = dict(self.get_serializer_context())
        user = User.objects.filter(username=request_data['user'][0])
        if user.count()!=0:
            return Customer.objects.create(user=user[0],city=request_data['city'],country=request_data['country'], 
                                            email=request_data['email'], fullname=request_data['fullname'],
                                            address=request_data['address']
                                            )
        else:
            raise serializers.ValidationError("The user couldn't  be found")
            return validated_data
    def update(self, instance, validated_data):
            # update_data = dict(self.get_serializer_context())
            instance.user = User.objects.get(username=validated_data.get('user', instance.user)) 
            instance.city = validated_data.get("city", instance.city)
            instance.country = validated_data.get("country", instance.country)
            instance.email = validated_data.get("email", instance.email)
            instance.fullname = validated_data.get("fullname", instance.fullname)
            instance.address = validated_data.get("address", instance.address)
            instance.save()
            return instance

class ShopSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Shop
        fields = ['id', 'owner','shop_name', 'membership', 'longitude', 'latitude', 'slogan', 'city']
        # 'shop_services'
    def get_serializer_context(self):
        return self.context['request'].data  
    def create(self, validated_data):
        request_data = dict(self.get_serializer_context())
        user = User.objects.filter(username=self.context['request'].user.username)
        
        if user.count()!=0:        
            service_provider = user[0].service_provider
            print(service_provider)
            # return validated_data
            return Shop.objects.create(owner=service_provider, shop_name=request_data['shop_name'],
                                         membership=request_data['membership'], longitude=request_data['longitude'],
                                          latitude=request_data['latitude'], slogan=request_data['shop_slogan'], 
                                          city=request_data['city'])
        else:
            raise serializers.ValidationError("The service provider couldn't be found")
            return validated_data
    
    def update(self, instance, validated_data):
            instance.owner = validated_data.get('owner', instance.owner)
            instance.shop_name = validated_data.get("shop_name", instance.shop_name)
            instance.membership = validated_data.get("membership", instance.membership)
            instance.longitude = validated_data.get("longitude", instance.longitude)
            instance.latitude = validated_data.get("latitude", instance.latitude)
            instance.slogan = validated_data.get("slogan", instance.slogan)
            instance.city = validated_data.get("city", instance.city)
            # instance.shop_services = validated_data.get("shop_services", instance.shop_services)
            instance.save()
            return instance
            
class ServiceProviderSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    my_shops = ShopSerializer(many=True, read_only=True)
    # user_type = serializers.CharField()
    class Meta:
        model = ServiceProvider
        fields = ['id', 'user','fullname', 'payment', 'city', 'country','address', 'email', 'my_shops']
    def get_serializer_context(self):
        return self.context['request'].data   
    def create(self, validated_data):
        request_data = dict(self.get_serializer_context())
        user = User.objects.filter(username=request_data['user'][0])
        if user.count()!=0:
            return ServiceProvider.objects.create(user=user[0], payment=request_data['payment'][0], city=request_data['city'][0], 
                                                    country=request_data['country'][0], email=request_data['email'][0],
                                                    fullname=request_data['fullname'][0], address=request_data['address'][0])
        else:
            raise serializers.ValidationError("The user couldn't be found")
            return validated_data
    
    def update(self, instance, validated_data):
            instance.user = validated_data.get('user', instance.user)
            instance.payment = validated_data.get("payment", instance.payment)
            instance.city = validated_data.get("city", instance.city)
            instance.country = validated_data.get("longitude", instance.longitude)
            instance.email = validated_data.get("email", instance.email)
            instance.fullname = validated_data.get("fullname", instance.fullname)
            instance.address = validated_data.get("address", instance.address)
            instance.save()
            return instance


            
class ShopServiceSerializer(serializers.ModelSerializer):
    # shop_services = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # provider = serializers.SlugRelatedField(read_only=True, slug_field='shop_name')
    provider = ShopSerializer(read_only=True)
    services = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = ShopService
        fields = ['id','service_name','provider','target_automobile', 'price', 'services', 'description', 'long_description', 'home_service','created_at']
    def get_serializer_context(self):
        return self.context['request'].data      
    def create(self, validated_data):
        request_data = dict(self.get_serializer_context())
        user = User.objects.filter(username=request_data['user'][0])
        if user.count()!=0:        
            shop = user[0].service_provider.my_shops.filter(shop_name=request_data['shop_name'][0])
            if shop.count()!=0:
                return ShopService.objects.create(provider=shop, 
                                                  target_automobile=request_data['target_automobile'],
                                                  price=request_data['price'],
                                                  services=request_data['services'][:], 
                                                  description=request_data['description'], home_service=request_data['home_service'],
                                                  service_name=request_data['service_name'],
                                                  long_description=request_data['long_description'])
            else:
                raise serializers.ValidationError("The shop couldn't be found")
                return validated_data
        else:
            raise serializers.ValidationError("The user couldn't be found")
            return validated_data
    
    def update(self, instance, validated_data):
            provider.owner = validated_data.get('provider', instance.provider)
            target_automobile.shop_name = validated_data.get("target_automobile", instance.target_automobile)
            instance.price = validated_data.get("price", instance.price)
            instance.services = validated_data.get("services", instance.services)
            instance.description = validated_data.get("description", instance.description)
            instance.service_name = validated_data.get("service_name", instance.service_name)
            instance.long_description = validated_data.get("long_description", instance.long_description)
            instance.save()
            return instance

class ServiceRequestSerializer(serializers.ModelSerializer):
    service = ShopServiceSerializer(read_only=True)
    requester = CustomerSerializer(read_only=True)
    class Meta:
        model = ServiceRequest
        fields = ['id','requester','service', 'status', 'review', 'rating', 'created_at', 'accepted_at', 'location']
    def get_serializer_context(self):
        return self.context['request']
    def create(self, validated_data):
        request = self.get_serializer_context()
        request_data = dict(request.data)
        customer = Customer.objects.filter(user=request.user)
        if customer.count()!=0:        
            customer = customer[0]
            shop_service = ShopService.objects.filter(id=request_data['service'])[0]            
            return ServiceRequest.objects.create(requester=customer, service=shop_service,
                                         status=RequestStatusCodes.UNPAID)
        else:
            raise serializers.ValidationError("The service provider couldn't be found")
            return validated_data
    
    def update(self, instance, validated_data):
            instance.requester = validated_data.get('requester', instance.requester)
            instance.service = validated_data.get("service", instance.service)
            instance.status = validated_data.get("status", instance.status)
            instance.review = validated_data.get("review", instance.review)
            instance.rating = validated_data.get("rating", instance.rating)
            instance.created_at = validated_data.get("created_at", instance.created_at)
            instance.accepted_at = validated_data.get("accepted_at", instance.accepted_at)
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