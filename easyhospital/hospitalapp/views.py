from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import generics
from easyhospital.hospitalapp.models import Hospital
from easyhospital.hospitalapp.serializers import HospitalSerializer
# from django.contrib.gis.db.models.functions import GeometryDistance
# from django.contrib.gis.geos import Point
from functools import wraps
import jwt

from django.http import JsonResponse


class HospitalViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Hospitals to be viewed or edited.
    """

    serializer_class = HospitalSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Hospital.objects.all().order_by('id')
        covid = self.request.query_params.get('covid')
        covid1 = str(covid).lower()
        latitude = self.request.query_params.get('lat')
        longitude = self.request.query_params.get('long')

        if covid1 == 'yes':
            queryset = queryset.filter(accepting_covid_patients=True)
            queryset = queryset.filter(empty_covid_beds__gt=0)  # covid beds > 0
            # if latitude:
            #    if longitude:
             #       queryset = queryset.
        elif covid1 == 'no':
            queryset = queryset.filter(covid_exclusive=False)
            queryset = queryset.filter(empty_beds__gt=0)
        return queryset


def get_token_auth_header(request):
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    parts = auth.split()
    token = parts[1]

    return token


def requires_scope(required_scope):
    """Determines if the required scope is present in the Access Token
    Args:
        required_scope (str): The scope required to access the resource
    """
    def require_scope(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header(args[0])
            decoded = jwt.decode(token, verify=False)
            if decoded.get("scope"):
                token_scopes = decoded["scope"].split()
                for token_scope in token_scopes:
                    if token_scope == required_scope:
                        return f(*args, **kwargs)
            response = JsonResponse({'message': 'You don\'t have access to this resource'})
            response.status_code = 403
            return response
        return decorated
    return require_scope
