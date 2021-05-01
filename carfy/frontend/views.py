from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.views.generic import TemplateView

from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response



from backend.models import ServiceProvider, Customer, User
from backend.serializers import ServiceProviderSerializer, CustomerSerializer, UserSerializer

import json

# Create your views here.
def index_view(request):
    return render(request,'frontend/index.html', context=None)

# class UserAccountView(TemplateView):
#     template_name = "frontend/UserAccess/user_access.html"
#     form_class = NameForm
#     def get(self, request):
#         html_filename = self.template_name.split('/')[-1]
#         if 'login' in html_filename:
#             return render(request, self.template_name, {"form": self.form_class})
#         elif ('signin' in html_filename):
#             print(html_filename)
#             return render(request, 'frontend/UserAccess/signin.html', {})
#         else:
#             return render(request, self.template_name, {})
#     def post(self, request):
#         form = self.form_class(request.POST)
#         if form.is_valid():
#             user = authenticate(request, username=form.cleaned_data['username'], password=form.cleaned_data['password'])
#             if user is not None:
#                 login(request, user)
#                 return redirect("/landing-page")
#             else:
#                 return render(request, self.template_name, {
#                 "form": form,
#                 "message":"Oops, try again."
#                 })
def logout_view(request):
    logout(request)
    print('logout')
    print(request)
    return redirect("/landing-page")

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
                data['user_type'] = 'provider'
                return Response(data)
        except:
            print('service provider rel not found')
        
        try:
            profile_model = Customer.objects.filter(user=user)
            print(profile_model)
            if profile_model.count()!=0:
                customer_serializer = CustomerSerializer(profile_model[0])
                data = customer_serializer.data
                data['user_type'] = 'customer'
                return Response(data)
        except:
            print('customer rel not found')
        response = {'isAuthenticated':request.user.is_authenticated, 'user':request.user.username}
        return Response(response)
    else:
        # return Response(json.dumps({'data':'user not found'}))
        response = {'message':'User not authenticated'}
        return Response(response)
