from django.shortcuts import render, redirect
from .models import *
from .serializers import *
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import authenticate, login, logout
from django.views.generic import TemplateView
from rest_framework import generics
from rest_framework.decorators import api_view
from django.http import HttpResponse

from .forms import NameForm

# from carfy.frontend.views import index_view



from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework import status

from datetime import datetime as dt
import json
# Create your views here.
#User Authentication 
class UserAccountView(TemplateView):
    template_name = "backend/UserAccess/user_access.html"
    form_class = NameForm
    def get(self, request):
        html_filename = self.template_name.split('/')[-1]
        if 'login' in html_filename:
            return render(request, self.template_name, {"form": self.form_class})
        elif ('signin' in html_filename):
            return render(request, 'backend/UserAccess/signin.html', {})
        else:
            return render(request, self.template_name, {})
    def post(self, request):
        form = self.form_class(request.POST)
        if form.is_valid():
            user = authenticate(request, username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)
                return redirect("/carfy")
            else:
                return render(request, self.template_name, {
                "form": form,
                "message":"Oops, try again."
                })
@api_view(['GET'])
def check_user_auth(request):
    profile_model = None
    if(request.user.is_authenticated):
        user = User.objects.get(username=request.user.username)
        if (user.is_superuser):
            return Response(UserSerializer(user).data)
        try:
            print(user)
            profile_model =ServiceProvider.objects.filter(user=user)
            if profile_model.count()!=0:
                data = ServiceProviderSerializer(profile_model[0]).data
                data["user_type"] = "provider"
                return Response(data, status=status.HTTP_200_OK)
        except:
            print('service provider rel not found')
        
        try:
            profile_model = Customer.objects.filter(user=user)
            print(profile_model)
            if profile_model.count()!=0:
                customer_serializer = CustomerSerializer(profile_model[0])
                data = customer_serializer.data
                data["user_type"] = "customer"
                return Response(data,status=status.HTTP_200_OK)
        except:
            print('customer rel not found')
        response = {'isAuthenticated':request.user.is_authenticated, 'user':request.user.username}
        return Response(response)
    else:
        # return Response(json.dumps({'data':'user not found'}))
        response = {'message':'User not authenticated'}
        return Response(response)

def logout_view(request):
    logout(request)
    print('logout')
    print(request)
    return redirect("/carfy")


class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CustomerListCreate(generics.ListCreateAPIView):
    queryset =  Customer.objects.all()
    serializer_class = CustomerSerializer

@api_view(['GET'])
@renderer_classes((JSONRenderer, TemplateHTMLRenderer))
def get_user_requests(request, *args, **kwargs):
    if (request.user.id!=None):
        customer = Customer.objects.get(user=request.user)
        service_requests = ServiceRequest.objects.filter(requester=customer)
        if (service_requests.count()!=0):
            serializer = ServiceRequestSerializer(service_requests, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            message = {'message':'No service request found'}
            return Response(message,status=status.HTTP_200_OK)
    else:
         message = {'message':'You are not logged in'}
         return Response(message,status=status.HTTP_200_OK)
         
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
        print(request.user)
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
    attribute = 0
    #   def get_context_data(self, **kwargs):
    #     context = super(Yearly, self).get_context_data(**kwargs)
    #     context['current_year'] = self.current_year
    #     context['current_month'] = self.current_month
    #     return context
    def get(self, request, *args, **kwargs):
        # check = self.kwargs.has_key('shop_id')
        if('shop_id' in self.kwargs):
            service = self.queryset.filter(id=self.kwargs['shop_id'])
            if (service.count()!=0):
                return Response(self.serializer_class(service[0]).data) 
        return self.list(request, *args, **kwargs)  

class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

class ServiceRequestListCreate(generics.ListCreateAPIView):
    queryset =  ServiceRequest.objects.all()
    serializer_class = ServiceRequestSerializer
    
    def post(self, request, *args, **kwargs):
        # service_req = ServiceRequest.objects.create(requester=requester, service=service)
        return self.create(request, *args, **kwargs)        
    
    def create(self, request, *args, **kwargs):
        data = {}
        request.data['requester'] = Customer.objects.filter(user=request.user)[0].id
        # data['service'] = ShopService.objects.filter(id=request.data['service'])[0]
        # data['status'] = RequestStatusCodes.PENDING
        # data['review'] = ''
        # data['rating'] = 0
        # data['created_at'] = dt.now()
        # data['accepted_at'] = dt.now()
        # service_req = ServiceRequest.objects.create(requester=requester, service=service)
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        print(serializer.errors)
        return JSONResponse(serializer.errors, status=400)
        # serializer.is_valid(raise_exception=True)
        
