from django.contrib import admin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from django.contrib.auth.models import User

from .models import User, ServiceProvider, Customer, Shop, ShopService, ServiceCoverage, CustomerPublication, ServiceRequest

#Define a new User admin
# class UserAdmin(BaseUserAdmin):
#     inlines=(ServiceProviderInline,)

# Register your models here.
#Re-register UserAdmin
# admin.site.unregister(User)
admin.site.register(User, BaseUserAdmin)
admin.site.register(ServiceProvider)
admin.site.register(Customer)
admin.site.register(Shop)
admin.site.register(ShopService)
admin.site.register(ServiceCoverage)
admin.site.register(CustomerPublication)
admin.site.register(ServiceRequest)
