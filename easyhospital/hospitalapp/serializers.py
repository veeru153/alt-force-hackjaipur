from django.contrib.auth.models import User
from rest_framework import serializers
from easyhospital.hospitalapp.models import Hospital


class HospitalSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        depth = 1
        model = Hospital
        fields = ['url', 'id', 'hospital_name', 'email', 'latitude', 'longitude', 'government_hospital', 'ambulance_facility', 'covid_exclusive',
                  'accepting_covid_patients', 'empty_beds', 'empty_ventilators', 'covid_patients', 'empty_covid_beds',
                  'last_updated']
