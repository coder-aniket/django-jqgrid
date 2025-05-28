# Installation

## Requirements

- Python 3.8 or higher
- Django 3.2 or higher
- Django REST Framework 3.12 or higher

## Installation Steps

### 1. Install via pip

```bash
pip install django-jqgrid
```

### 2. Add to INSTALLED_APPS

Add `django_jqgrid` to your Django project's `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    # ... other apps
    'rest_framework',
    'django_jqgrid',
    'jsoneditor',  # For JSON field editing in admin
]
```

### 3. Include URLs

Add django-jqgrid URLs to your project's URL configuration:

```python
# urls.py
from django.urls import path, include

urlpatterns = [
    # ... other patterns
    path('api/jqgrid/', include('django_jqgrid.api_urls')),
    path('jqgrid/', include('django_jqgrid.urls')),
]
```

### 4. Run Migrations

Run migrations to create necessary database tables:

```bash
python manage.py migrate django_jqgrid
```

### 5. Collect Static Files

Collect static files to serve jqGrid assets:

```bash
python manage.py collectstatic
```

## Configuration

### Basic Settings

Add basic configuration to your Django settings:

```python
# settings.py

# django-jqgrid configuration
JQGRID_CONFIG = {
    'ROW_NUM': 25,
    'ROW_LIST': [10, 25, 50, 100],
    'ENABLE_IMPORT_EXPORT': True,
    'GUI_STYLE': 'bootstrap4',  # Options: 'bootstrap', 'bootstrap4', 'bootstrap5', 'jqueryui'
}
```

### Static Files Setup

Ensure your static files are properly configured:

```python
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
```

### Template Configuration

Add the required template context processors:

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.static',  # Required for static files
            ],
        },
    },
]
```

## Verify Installation

To verify the installation:

1. Start your Django development server:
   ```bash
   python manage.py runserver
   ```

2. Check if static files are accessible:
   - Navigate to: `http://localhost:8000/static/django_jqgrid/js/jqgrid-core.js`
   - You should see the JavaScript file content

3. Test the API endpoint:
   - Navigate to: `http://localhost:8000/api/jqgrid/`
   - You should see the REST framework browsable API

## Troubleshooting

### Static Files Not Loading

If static files are not loading:

1. Ensure `django.contrib.staticfiles` is in `INSTALLED_APPS`
2. Run `python manage.py collectstatic`
3. Check `STATIC_URL` and `STATIC_ROOT` settings
4. In development, ensure `DEBUG = True`

### Import Errors

If you encounter import errors:

1. Verify all dependencies are installed:
   ```bash
   pip install djangorestframework>=3.12 django-jsoneditor>=0.2.0
   ```

2. Check Python path and virtual environment activation

### Database Errors

If migrations fail:

1. Ensure database is properly configured
2. Run `python manage.py makemigrations django_jqgrid`
3. Then run `python manage.py migrate`

## Next Steps

After successful installation:

- Follow the [Quick Start Guide](quickstart.md) to create your first grid
- Explore [Configuration Options](configuration.md) for customization
- Check out [Examples](examples.md) for real-world usage