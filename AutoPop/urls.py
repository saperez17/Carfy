from django.urls import path
from django.contrib import  admin
from django.conf.urls import url
from django.views.generic import TemplateView

#Views
from AutoPop.views import HomeView, ServiceListingView, UserAccountView, UserAccountView
#APIs
from AutoPop.views import shopsList


urlpatterns = [
    path("admin", admin.site.urls),
     path("", HomeView.as_view()),
     path("landing_page", ServiceListingView.as_view()),
     path("account", UserAccountView.as_view()),

     path("login", UserAccountView.as_view(template_name="AutoPop/UserAccess/login.html"), name="login"),
     path("signin", UserAccountView.as_view(template_name="AutoPop/UserAccess/signin.html"), name="signin"),
     path('logout', HomeView.as_view(logout_user=True), name='logout'),
    #  path("signin", , name="signin"),
    # path("", HomeView.as_view())
    # path("", views.index, name="homepage"),

    path("api/v1/shopList", shopsList, name="shop_list" )
]
