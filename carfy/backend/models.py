from django.db import models
from django_countries.fields import CountryField
from django.contrib.auth.models import AbstractUser
from django.conf import settings

import os
import random 

from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
#Multiselect model field
from multiselectfield import MultiSelectField

from datetime import datetime
from django.utils import timezone

# Create your models here.
class Lead(models.Model):
    author = models.CharField(max_length=100)
    message = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)

    # Create your models here.
class User(AbstractUser):
    def ___str___(self):
        return f"{self.username}"

#Create profile models 
class ServiceProvider(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="service_provider") #Profile model
    fullname = models.CharField(max_length=150, unique=False, default='')
    payment = models.CharField(max_length=100, unique=False)
    city = models.CharField(verbose_name=_("City"), max_length=1023, blank=True, null=True)
    country = CountryField(blank=True, null=True)
    address = models.CharField(max_length=150, unique=False, default='')
    email = models.EmailField(unique=True)
    # class Meta: 
    #     ordering = ['username']
    def __str__(self):
        return f"{self.user.username}"

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="customer")
    fullname = models.CharField(max_length=150, unique=False, default='')
    city = models.CharField(verbose_name=_("City"), max_length=1023, blank=True, null=True)
    country = CountryField(blank=True, null=True)
    address = models.CharField(max_length=150, unique=False, default='')
    # phone_regex = RegexValidator(regex=r"^\+(?:[0-9]●?){6,14}[0-9]$", message=_("Enter a valid international mobile phone number starting with +(country code)"))
    # mobile_phone = models.CharField(validators=[phone_regex], verbose_name=_("Mobile phone"), max_length=17, blank=True, null=True)
    mobile_phone = models.CharField(verbose_name=_("Mobile phone"), max_length=17, blank=True, null=True)
    email = models.EmailField(unique=True)
    def __str__(self):
        return f"{self.user.username}"
class MembershipPlan(models.TextChoices):
    PREMIUM = 'P', _('Premium')
    BASIC = 'B', _('Basic')
    FREE = 'F', _('Free')
class Shop(models.Model):
    owner = models.ForeignKey(ServiceProvider, on_delete=models.CASCADE, related_name="my_shops")
    slogan = models.CharField(max_length=50, unique=False, default='')
    shop_name = models.CharField(max_length=100, unique=True)
    membership = models.CharField(max_length=2, choices=MembershipPlan.choices, default=MembershipPlan.FREE)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=-76.585664)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=2.449903)
    city = models.CharField(verbose_name=_("City"), max_length=1023, blank=True, null=True, default='Popayan')

    def get_membership(self):
        return self.membership
    def __str__(self):
        return f"{self.shop_name}, Plan: {self.membership}"

class TargetAutomobile(models.TextChoices):
        SEDAN = 'S', _('SEDAN')
        TRUCK = 'T', _('TRUCK')
        MOTORCYCLE = 'M', _('MOTORCYCLE')
        UNKNOWN = 'U', _('UNKNOWN')

class ServiceDetail(models.TextChoices):
            OIL_CHANGE = 'OC', _('OIL CHANGE')
            OIL_FILTER = 'OFC', _('FILTER CHANGE')
            AIR_FILTER = 'AIF', _('AIR_FILTER_CHANGE')
            WIPER_BLADE = 'WB', _('WIPER BLADE REPLACEMENT')
            TIRE_REPAIR = 'TR', _('TIRE FIXING')
            PAINT_WORK = 'PW', _('PAINT WORK')
            TECHNICAL_ASSISTANCE = 'TA', _('PROFESSIONAL TECHNICAL ASSISTANCE')
            MAINTENANCE = 'MA', _('SCHEDULED MAINTENANCE')
            CAR_WASHING = 'CW', _('CAR WASHING')
            BRAKE_WORK = 'BW', _('BRAKE WORK')
            ENGINE_TUNE_UP = 'ETU', _('ENGINE TUNE UP')
            WHEELS_WORK = 'WW', _('WHEELS ALIGNED/BALANCED')
            NONE = 'NN', _('NO SERVICE LISTED')
            
class ShopService(models.Model):
    service_name = models.CharField(max_length=100, default="NEW SERVICE") 
    provider = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name="shop_services")
    target_automobile = models.CharField(max_length=20, choices=TargetAutomobile.choices, default=TargetAutomobile.UNKNOWN)
    price = models.DecimalField(verbose_name=_('Service Price'), max_digits=10, decimal_places=0)
    services = MultiSelectField(choices=ServiceDetail.choices, default=ServiceDetail.NONE)
    description = models.CharField(max_length=250, default="")
    long_description =  models.CharField(max_length=1500, default="")
    home_service = models.BooleanField(default=False)
    created_at = models.DateTimeField(editable=True, default=timezone.now)
    def __str__(self):
        return f"{self.provider} CarAudience. {self.target_automobile}, Price: {self.price}"
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created_at = timezone.now()
        return super(ShopService, self).save(*args, **kwargs)

class RequestStatusCodes(models.TextChoices):
        PENDING = 'PEN', _('PENDING')
        UNPAID = 'UN',_('UNPAID')
        PAID = 'PA',_('PAID')
        ACCEPTED = 'ACC', _('ACCEPTED')
        CANCELED = 'CAN', _('CANCELED')
        REJECTED = 'REJ', _('REJECTED')
        COMPLETED = 'COM', _('COMPLETED')

class ServiceRequest(models.Model):
    requester = models.ForeignKey(Customer, on_delete=models.CASCADE)
    service = models.ForeignKey(ShopService, on_delete=models.CASCADE)
    status = models.CharField(max_length=30, choices=RequestStatusCodes.choices, default=RequestStatusCodes.UNPAID)
    review = models.CharField(max_length=300, default="", blank=True)
    rating = models.IntegerField(verbose_name=_('Rating'), default=0)
    location = models.CharField(max_length=250, default="", blank=True)
    created_at = models.DateTimeField(editable=True, default=timezone.now)
    accepted_at = models.DateTimeField(editable=True, default=timezone.now)
    def __str__(self):
        return f"{self.requester} - {self.service} - {self.status}"
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created_at= timezone.now()
        return super(ServiceRequest, self).save(*args, **kwargs)

class ServiceCoverage(models.Model):
    coverage = models.CharField(max_length=3, choices=ServiceDetail.choices, default=ServiceDetail.NONE)
    shop_offer = models.ForeignKey(ShopService, on_delete=models.CASCADE, related_name="available_services")

def get_random_name():
        random_img_name = "publication_default_img_" + str(random.randint(1,2)) + ".png"
        img_name = os.path.join(settings.MEDIA_ROOT, "images", "publication_images", random_img_name)
        return img_name

class CustomerPublication(models.Model):
    publisher = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="service_inquiry")
    description = models.CharField(max_length=100, unique=False)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=-76.606422)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=2.441650)
    photo = models.ImageField(verbose_name=_("Optional Image"), upload_to="images/publication_images", default=get_random_name)

    