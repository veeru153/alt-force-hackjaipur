from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from easyhospital.hospitalapp.models import Hospital, Patient
from easyhospital.hospitalapp.serializers import UserSerializer, PatientSerializer, HospitalSerializer
# from django.contrib.gis.db.models.functions import GeometryDistance
# from django.contrib.gis.geos import Point


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class PatientViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Patients to be viewed or edited.
    """
    queryset = Patient.objects.all().order_by('id')
    serializer_class = PatientSerializer
    permission_classes = [permissions.AllowAny]


class HospitalViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Hospitals to be viewed or edited.
    """

    serializer_class = HospitalSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Hospital.objects.all().order_by('id')
        covid = self.request.query_params.get('covid')

        if covid.lower() == 'yes':
            queryset = queryset.filter(accepting_covid_patients=True)
        elif covid.lower() == 'no':
            queryset = queryset.filter(covid_exclusive=False)

        return queryset
