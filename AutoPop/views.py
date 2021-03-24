from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.http import HttpResponse, HttpResponseRedirect

from django.shortcuts import render
from .models import *
#Forms
from .forms import NameForm
# Create your views here.
class UserAccountView(TemplateView):
    template_name = "AutoPop/profile.html"
    def get(self, request):
        return render(request, self.template_name)
        
class ServiceListingView(TemplateView):
    template_name = "AutoPop/landing_page.html"
    def get(self, request):
        shops = Shop.objects.all()
        return render(request, self.template_name, {"shops":shops})

class HomeView(TemplateView):
    template_name = "AutoPop/index.html"
    form_class = NameForm
    def get(self, request):
        return render(request, self.template_name, {"form": self.form_class})
    def post(self, request):
        #Creates a form instance and populate it with data from the request
        form = self.form_class(request.POST)
        #Check whether it's valid
        if form.is_valid():
            print("valid")
            return redirect("/landing_page")
        else:
            return render(request, self.template_name, {
                "form": form,
                "message":"Oops, try again."
            })

def index(request):
    my_dict = {"message": "Your journey starts here"}
    return render(request, 'AutoPop/index.html', context=my_dict)


 
