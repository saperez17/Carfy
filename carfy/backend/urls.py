from django.urls import path
from . import views

urlpatterns = [
     path("login", views.UserAccountView.as_view(template_name="backend/UserAccess/login.html"), name="login"),
     path("signin", views.UserAccountView.as_view(template_name="backend/UserAccess/signin.html"), name="signin"),
     path('logout', views.logout_view, name='logout'),
     path('check_auth', views.check_user_auth),
     path('lead/', views.LeadListCreate.as_view()),
     path('user/', views.UserListCreate.as_view()),
     path('customer/', views.CustomerListCreate.as_view()),
     path('customer/requests/', views.get_user_requests),
     path('service-provider/', views.ServiceProviderListCreate.as_view()),
     path('shop/', views.ShopListCreate.as_view()),
     path('shop-service/', views.ShopServiceListCreate.as_view()),
     path('shop-service/<int:shop_id>', views.ShopServiceListCreate.as_view()),
     path('shop-service/<int:shop_id>/requests', views.getShopServiceRequests),
     path('service-request/update/', views.updateServiceRequest),
     path('service-request/', views.ServiceRequestListCreate.as_view()),
     path('service-request/<int:pk>', views.ServiceRequestDeleteUpdate.as_view()),
     path('service-request/<int:provider_id>', views.ServiceRequestListCreate.as_view())
]