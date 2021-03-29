from django.contrib import admin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from django.contrib.auth.models import User

from .models import User, ServiceProvider, Customer, Shop, Automobile, ShopService, ServiceCoverage, CustomerPublication

#Define an inline admin descriptor for ShopProvider
#which acts a bit like a singleton
class ServiceProviderInline(admin.StackedInline):
    model = ServiceProvider
    can_delete = False
    verbose_name_plural = 'service_provider'

#Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines=(ServiceProviderInline,)

# Register your models here.
#Re-register UserAdmin
# admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(ServiceProvider)
admin.site.register(Customer)
admin.site.register(Shop)
admin.site.register(Automobile)
admin.site.register(ShopService)
admin.site.register(ServiceCoverage)
admin.site.register(CustomerPublication)
