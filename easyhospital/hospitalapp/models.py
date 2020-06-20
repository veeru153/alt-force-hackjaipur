from django.db import models
from django.contrib.auth.models import User


class Patient(models.Model):
    # This model extends the default user table in Django
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    patient_dob = models.DateField(auto_now=False, auto_now_add=False)
    has_covid = models.BooleanField(default=False)
    patient_lat = models.DecimalField(max_digits=22, decimal_places=16)
    patient_long = models.DecimalField(max_digits=22, decimal_places=16)

    def __str__(self):
        return self.user.email


class Hospital(models.Model):
    name = models.CharField(max_length=50)
    contact_no = models.IntegerField()
    hospital_lat = models.DecimalField(max_digits=22, decimal_places=16)
    hospital_long = models.DecimalField(max_digits=22, decimal_places=16)
    total_beds = models.IntegerField(default=0)
    empty_beds = models.IntegerField(default=0)
    empty_covid_beds = models.IntegerField(default=0)
    testing_kits = models.IntegerField(default=0)
    accepting_patients = models.BooleanField(default=False)
    accepting_covid_patients = models.BooleanField(default=False)
    covid_exclusive = models.BooleanField(default=False)
    government_hospital = models.BooleanField(default=False)
    ambulance_facility = models.BooleanField(default=False)
    last_updated = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    patients_guided_here = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str__(self):
        return self.id
