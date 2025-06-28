"""Test URLs for django_jqgrid."""

from django.urls import path, include

urlpatterns = [
    path('api/', include('django_jqgrid.urls')),
]