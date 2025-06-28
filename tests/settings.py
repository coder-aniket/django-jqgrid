"""Test settings for django_jqgrid."""

import os

# Test database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:',
    }
}

# Required settings
SECRET_KEY = 'django-jqgrid-test-secret-key-not-for-production'
DEBUG = True
USE_TZ = True

# Apps
INSTALLED_APPS = [
    'django.contrib.contenttypes',
    'django.contrib.auth',
    'django.contrib.sessions',
    'django.contrib.messages',
    'rest_framework',
    'django_jqgrid',
]

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
}

# Django jqGrid settings
JQGRID_CONFIG = {
    'DEFAULT_ROWS_PER_PAGE': 25,
    'ENABLE_EXCEL_EXPORT': True,
    'ENABLE_CSV_EXPORT': True,
    'ENABLE_FILTERING': True,
    'ENABLE_CRUD_OPERATIONS': True,
}

# Static files
STATIC_URL = '/static/'

# Root URL conf (dummy)
ROOT_URLCONF = 'tests.urls'