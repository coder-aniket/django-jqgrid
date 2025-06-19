"""
Django settings for example_project.

This project demonstrates the usage of django-jqgrid package.
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Add the parent directory to the Python path so we can import django_jqgrid
import sys
sys.path.insert(0, str(BASE_DIR.parent.parent))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-example-key-only-for-demonstration-do-not-use-in-production'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',
    'django_jqgrid',
    
    # Local apps
    'demo_app',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'example_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django_jqgrid.context_processors.jqgrid_security',
                'django_jqgrid.context_processors.jqgrid_config',
            ],
        },
    },
]

WSGI_APPLICATION = 'example_project.wsgi.application'


# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST Framework configuration
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # For demo purposes
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 25
}

# django-jqgrid configuration
JQGRID_CONFIG = {
    'DEFAULT_ROWS_PER_PAGE': 20,
    'ENABLE_FILTERING': True,
    'ENABLE_CRUD_OPERATIONS': True,
}

# Django JQGrid Security Configuration
JQGRID_SECURITY_CONFIG = {
    # For demo purposes - session-based auth with optional features
    'auth_method': 'session',
    'csrf_enabled': True,
    'require_authentication': False,  # Allow anonymous access for demo
    'session_enabled': True,
    'session_auto_check': False,  # Disabled for demo
    'field_level_permissions': True,
    'audit_log_enabled': False,  # Disabled for demo
    
    # Custom headers for demo
    'custom_headers': {
        'X-API-Version': '1.0',
        'X-Client-Type': 'django-jqgrid-demo'
    }
}