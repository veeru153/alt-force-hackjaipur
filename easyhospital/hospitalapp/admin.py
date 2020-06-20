from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import Patient
from easyhospital.hospitalapp.models import Hospital


# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton
class PatientInline(admin.StackedInline):
    model = Patient
    can_delete = False
    verbose_name_plural = 'employee'


# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (PatientInline,)


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

admin.site.register(Patient)
admin.site.register(Hospital)