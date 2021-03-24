from django.urls import path
from django.contrib import  admin
from django.conf.urls import url
from django.views.generic import TemplateView

from AutoPop.views import HomeView, ServiceListingView, UserAccountView


urlpatterns = [
    path("admin", admin.site.urls),
     path("", HomeView.as_view()),
     path("landing_page", ServiceListingView.as_view()),
     path("account", UserAccountView.as_view())
    # path("", HomeView.as_view())
    # path("", views.index, name="homepage"),
]
