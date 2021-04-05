from django.urls import path
from django.conf.urls import url
from django.contrib import admin
from .views import *

urlpatterns = [
    # path('', index_view),
    path("admin", admin.site.urls),
    # path("", UserAccountView.as_view()),
    path("login", UserAccountView.as_view(template_name="frontend/UserAccess/login.html"), name="login"),
    path("signin", UserAccountView.as_view(template_name="frontend/UserAccess/signin.html"), name="signin"),
    path('landing_page', index_view),
    url(r'^.*/$', index_view)  # regex matches, then lets routing be handled by the frontend. Still needs a / at end.
    #  edited from r'^.*/$' new r'^.{0}/$'
]