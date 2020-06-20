from django.db import models
# from django.contrib.gis.geos import Point
from django.contrib.auth.models import User


class Hospital(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    # location = Point(srid=4326)
    hospital_name = models.CharField(max_length=100, default='No Name Provided')
    email = models.EmailField(max_length=100, default='exampleblabla@mail.com', unique=True)
    latitude = models.DecimalField(max_digits=22, decimal_places=16)
    longitude = models.DecimalField(max_digits=22, decimal_places=16)
    government_hospital = models.BooleanField(default=False)
    ambulance_facility = models.BooleanField(default=False)
    covid_exclusive = models.BooleanField(default=False)
    accepting_covid_patients = models.BooleanField(default=False)
    empty_beds = models.IntegerField(default=0)
    empty_ventilators = models.IntegerField(default=0)
    covid_patients = models.IntegerField(default=0)
    empty_covid_beds = models.IntegerField(default=0)
    last_updated = models.TimeField(auto_now=True)

    def __str__(self):
        return self.hospital_name
