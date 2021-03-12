from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse, HttpResponseRedirect

from django.shortcuts import render

#Forms
from .forms import NameForm
# Create your views here.

class HomeView(TemplateView):
    template_name = "AutoPop/index.html"
    form_class = NameForm
    def get(self, request):
        return render(request, self.template_name, {"form": self.form_class})
    def post(self, request):
        #Creates a form instance and populate it with data from the request
        form = NameForm(request.POST)
        #Check whether it's valid
        if form.is_valid():
            print("valid")
            return render(request, self.template_name, {
                "form": form,
                "message":"Successfully loged in "+form.cleaned_data["your_name"]
            })



def index(request):
    my_dict = {"message": "Your journey starts here"}
    return render(request, 'AutoPop/index.html', context=my_dict)


 
