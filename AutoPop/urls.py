from django.urls import path
from django.contrib import  admin
from django.conf.urls import url
from django.views.generic import TemplateView

from AutoPop.views import HomeView
from . import views

urlpatterns = [
    path("/admin", admin.site.urls),
     path("", HomeView.as_view() )
    # path("", HomeView.as_view())
    # path("", views.index, name="homepage"),
]
