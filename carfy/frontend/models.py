from django.db import models
from django_countries.fields import CountryField
from django.contrib.auth.models import AbstractUser
from django.conf import settings

import os
import random 

from django.utils.translation import gettext_lazy as _
#Multiselect model field
from multiselectfield import MultiSelectField

# Create your models here.
