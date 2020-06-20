from django.db import models
from django.db.models.expressions import RawSQL
# from django.contrib.gis.geos import Point
from django.contrib.auth.models import User


class Hospital(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    # location = Point(srid=4326)
    id = models.CharField(max_length=100, primary_key=True)
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

    def get_covid_locations_nearby_coords(latitude, longitude, max_distance=None):
        """
        Return objects sorted by distance to specified coordinates
        which distance is less than max_distance given in kilometers
        """
        # Great circle distance formula
        gcd_formula = "6371 * acos(least(greatest(\
        cos(radians(%s)) * cos(radians(latitude)) \
        * cos(radians(longitude) - radians(%s)) + \
        sin(radians(%s)) * sin(radians(latitude)) \
        , -1), 1))"
        distance_raw_sql = RawSQL(
            gcd_formula,
            (latitude, longitude, latitude)
        )
        qs = Hospital.objects.all() \
            .annotate(distance=distance_raw_sql).order_by('distance')
        qs = qs.filter(accepting_covid_patients=True)
        qs = qs.filter(empty_covid_beds__gt=0)

        if max_distance is not None:
            qs = qs.filter(distance__lt=max_distance)
        return qs

    def get_noncovid_locations_nearby_coords(latitude, longitude, max_distance=None):
        """
        Return objects sorted by distance to specified coordinates
        which distance is less than max_distance given in kilometers
        """
        # Great circle distance formula
        gcd_formula = "6371 * acos(least(greatest(\
        cos(radians(%s)) * cos(radians(latitude)) \
        * cos(radians(longitude) - radians(%s)) + \
        sin(radians(%s)) * sin(radians(latitude)) \
        , -1), 1))"
        distance_raw_sql = RawSQL(
            gcd_formula,
            (latitude, longitude, latitude)
        )
        qs = Hospital.objects.all() \
            .annotate(distance=distance_raw_sql).order_by('distance')
        qs = qs.filter(covid_exclusive=False)
        qs = qs.filter(empty_beds__gt=0)

        if max_distance is not None:
            qs = qs.filter(distance__lt=max_distance)
        return qs

    def __str__(self):
        return self.hospital_name
