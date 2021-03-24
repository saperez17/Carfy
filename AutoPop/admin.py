from django.contrib import admin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.contrib.auth.admin import UserAdmin

from .models import *
# Register your models here.
admin.site.register(UserAdminApp, UserAdmin)
admin.site.register(UserApp)
admin.site.register(Shop)
admin.site.register(Automobile)
admin.site.register(ShopService)
admin.site.register(ServiceCoverage)
admin.site.register(CustomerPublication)
