from django.contrib.auth.models import User
from rest_framework import serializers
from easyhospital.hospitalapp.models import Patient, Hospital


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'email', 'first_name']


class PatientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        depth = 1
        model = Patient
        fields = ['url', 'has_covid', 'latitude', 'longitude']


class HospitalSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        depth = 1
        model = Hospital
        fields = ['url', 'id', 'user', 'latitude', 'longitude', 'government_hospital', 'ambulance_facility', 'covid_exclusive',
                  'accepting_covid_patients', 'empty_beds', 'empty_ventilators', 'covid_patients', 'empty_covid_beds',
                  'last_updated']
