from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core.paginator import Paginator

from django.shortcuts import render
from .models import *
#Forms
from .forms import NameForm

# Serializers
from .serializers import ShopSerializer, ShopServiceSerializer


# Django rest framework imports
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer

# Create your views here.
class UserAccountView(TemplateView):
    template_name = "AutoPop/UserAccess/user_access.html"
    form_class = NameForm
    def get(self, request):
        html_filename = self.template_name.split('/')[-1]
        if 'login' in html_filename:
            return render(request, self.template_name, {"form": self.form_class})
        else:
            return render(request, self.template_name, {})
    def post(self, request):
        form = self.form_class(request.POST)
        if form.is_valid():
            user = authenticate(request, username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)
                return redirect("/landing_page")
            else:
                return render(request, self.template_name, {
                "form": form,
                "message":"Oops, try again."
                })
class ServiceListingView(TemplateView):
    template_name = "AutoPop/landing_page.html"
    def get(self, request):
        shops = Shop.objects.all()
        return render(request, self.template_name, {"shops":shops})

class HomeView(TemplateView):
    template_name = "AutoPop/landing_page.html"
    form_class = NameForm
    logout_user = False
    def get(self, request):
        if (self.logout_user):
            logout(request)
        return render(request, self.template_name, {"form": self.form_class})
    def post(self, request):
        #Creates a form instance and populate it with data from the request
        form = self.form_class(request.POST)
        #Check whether it's valid
        if form.is_valid():
            user = authenticate(request, username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user is not None:
                return redirect("/landing_page")
            else:
                return render(request, self.template_name, {
                "form": form,
                "message":"Oops, try again."
                })
        
            

def index(request):
    my_dict = {"message": "Your journey starts here"}
    return render(request, 'AutoPop/index.html', context=my_dict)


@api_view(['GET', 'POST'])
def shop(request, *args, **kwargs):
    try:
        shops = Shop.objects.all()
    except:
        return JsonResponse({"message": "could not fetch shops"}, status=400)
    
    if (request.method == 'GET'):
        shops = Shop.objects.all()
        paginator = Paginator(shops, 8)
        if ('page' in request.data.keys()):
            pag_num = request.GET['page']
            page_obj = paginator.get_page(pag_num)
            serializer = ShopSerializer(page_obj, many=True)
        else:
            serializer = ShopSerializer(shops, many=True)
        return JsonResponse({"message": "shops fetched successfully", "data":serializer.data}, status=200)
    elif (request.method=='POST'):
        user = User.objects.get(username=request.data['username']) 
        service_provider = ServiceProvider.objects.get(user=user)
        shop_name = request.data['shop_name']
        membership = MembershipPlan[request.data['membership']]
        longitude = request.data['longitude']
        latitude = request.data['latitude']
        new_shop = Shop(owner=service_provider,shop_name=shop_name,membership=membership,longitude=longitude,latitude=latitude)
        print(new_shop)
        return JsonResponse({"message": "shops created successfully", "data":[]}, status=200)

@api_view(['GET'])
def shopId(request, id):
    shop = Shop.objects.filter(pk=id)
    if shop.count() != 0:
        serializer = ShopSerializer(shop, many=True)
        return JsonResponse({"message": "Shop fetched successfully", "data":serializer.data}, status=200)
    else:
        return JsonResponse({"message": "Shop not found", "data":[]}, status=200)

@api_view(['GET'])
def shopServices(request):
    shop_services = ShopService.objects.all()
    serializer = ShopServiceSerializer(shop_services, many=True)
    return JsonResponse({"message": "All shop services fetched successfully", "data":serializer.data}, status=200)


