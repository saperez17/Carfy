from django.urls import path
from . import views

urlpatterns = [
     path('api/lead/', views.LeadListCreate.as_view()),
     path('api/user/', views.UserListCreate.as_view()),
     path('api/customer/', views.CustomerListCreate.as_view()),
     path('api/service-provider/', views.ServiceProviderListCreate.as_view()),
     path('api/shop/', views.ShopListCreate.as_view()),
     path('api/shop-service/', views.ShopServiceListCreate.as_view())
]