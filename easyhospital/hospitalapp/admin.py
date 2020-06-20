from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import Patient
from easyhospital.hospitalapp.models import Hospital


# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton
admin.site.register(Hospital)