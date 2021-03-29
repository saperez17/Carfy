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
from .serializers import ShopSerializer


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


@api_view(['GET', ])
def shopsList(request, *args, **kwargs):
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


# @api_view(['POST'])
# def shopCreate(request, *args, **kwargs):
    # """
    # Input
    #     owner = shop's owner (ServiceProvicer Instance)
    #     shop_name = CharField
    #     membership = ('P','B' or 'F')
    #     longitude = Decimal
    #     latitude = Decimal
    # Output:
    #     {data: "Shop created successfully"}
    # """
    # owner = User.objects.get(request.GET['username'])


