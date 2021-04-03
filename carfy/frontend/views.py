from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.views.generic import TemplateView

from .forms import NameForm

# Create your views here.
def index_view(request):
    print(request.user)
    return render(request,'frontend/index.html', context=None)

class UserAccountView(TemplateView):
    template_name = "frontend/UserAccess/user_access.html"
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

