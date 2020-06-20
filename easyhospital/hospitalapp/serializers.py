from django.contrib.auth.models import User
from rest_framework import serializers
from easyhospital.hospitalapp.models import Patient, Hospital


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'email', 'first_name', 'last_name']


class PatientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        depth = 1
        model = Patient
        fields = ['url', 'user', 'patient_dob', 'has_covid', 'patient_lat', 'patient_long']


class HospitalSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hospital
        fields = ['url', 'name', 'contact_no', 'hospital_lat', 'hospital_long', 'total_beds', 'empty_beds',
                  'empty_covid_beds', 'testing_kits', 'accepting_patients', 'accepting_covid_patients',
                  'covid_exclusive', 'government_hospital', 'ambulance_facility', 'last_updated', 'user',
                  'patients_guided_here']
