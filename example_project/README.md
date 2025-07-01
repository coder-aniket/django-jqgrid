# Django jqGrid Example Project

This is a complete Django project demonstrating the features and capabilities of the `django-jqgrid` package.

## Features Demonstrated

- Product management grid with advanced features
- Customer management with search and filtering
- Order tracking with financial data
- Category management with relationships
- Custom formatters and styling
- Responsive design
- API integration with Django REST Framework

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/coder-aniket/django-jqgrid.git
cd django-jqgrid/example_project
```

### 2. Create Virtual Environment

```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies

```bash
# Install project dependencies
pip install -r requirements.txt

# Install django-jqgrid from parent directory (development mode)
pip install -e ..

# OR install from PyPI (when published)
# pip install django-jqgrid
```

### 4. Setup Database

```bash
# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser
```

### 5. Load Sample Data

```bash
# Option 1: Use Django shell
python manage.py shell
```

```python
from example.models import create_sample_data
create_sample_data()
exit()
```

```bash
# Option 2: Create a management command (see below)
python manage.py load_sample_data
```

### 6. Run the Development Server

```bash
python manage.py runserver
```

### 7. Access the Application

- Main page: http://localhost:8000/
- Examples: http://localhost:8000/examples/
- Admin: http://localhost:8000/admin/
- API: http://localhost:8000/examples/api/

## Project Structure

```
example_project/
├── manage.py                    # Django management script
├── requirements.txt             # Project dependencies
├── example_project/            # Django project settings
│   ├── __init__.py
│   ├── settings.py             # Django settings
│   ├── urls.py                 # URL configuration
│   ├── wsgi.py                 # WSGI configuration
│   └── asgi.py                 # ASGI configuration
└── example/                    # Example application
    ├── models.py               # Data models
    ├── views.py                # Views and ViewSets
    ├── serializers.py          # DRF serializers
    ├── urls.py                 # App URLs
    ├── admin.py                # Django admin
    ├── templates/              # HTML templates
    ├── static/                 # CSS and JS files
    └── migrations/             # Database migrations
```

## Available Grids

### Products Grid
- URL: `/examples/products/`
- Features: Multi-column sorting, filtering, custom formatters, status indicators

### Customers Grid
- URL: `/examples/customers/`
- Features: Search functionality, pagination, relationship display

### Orders Grid
- URL: `/examples/orders/`
- Features: Financial data formatting, status workflow, date handling

### Categories Grid
- URL: `/examples/categories/`
- Features: Basic CRUD operations, active/inactive toggle

## Creating a Management Command for Sample Data

Create `example/management/commands/load_sample_data.py`:

```python
from django.core.management.base import BaseCommand
from example.models import create_sample_data

class Command(BaseCommand):
    help = 'Load sample data for django-jqgrid examples'

    def handle(self, *args, **kwargs):
        self.stdout.write('Loading sample data...')
        create_sample_data()
        self.stdout.write(self.style.SUCCESS('Sample data loaded successfully!'))
```

## Configuration Options

### Django Settings

Key settings in `example_project/settings.py`:

```python
# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 25,
}

# Django jqGrid settings
JQGRID_CONFIG = {
    'DEFAULT_ROWS_PER_PAGE': 25,
    'ENABLE_EXCEL_EXPORT': True,
    'ENABLE_CSV_EXPORT': True,
}
```

### Grid Configuration

Example grid configuration in templates:

```javascript
$('#productsGrid').jqGrid({
    url: '/examples/api/products/',
    datatype: 'json',
    colModel: [...],
    pager: '#productsGridPager',
    rowNum: 25,
    autowidth: true,
    height: 500
});
```

## Customization

### Adding New Models

1. Create model in `example/models.py`
2. Create serializer in `example/serializers.py`
3. Create ViewSet in `example/views.py`
4. Add URL pattern in `example/urls.py`
5. Create template in `example/templates/example/`

### Custom Formatters

Add custom formatters in your grid configuration:

```javascript
function priceFormatter(cellvalue, options, rowObject) {
    return '$' + parseFloat(cellvalue).toFixed(2);
}

colModel: [
    {name: 'price', formatter: priceFormatter},
    // ...
]
```

## Development Tips

### Debug Mode

Enable Django Debug Toolbar by adding to `INSTALLED_APPS`:

```python
if DEBUG:
    INSTALLED_APPS += ['debug_toolbar']
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
```

### Database Options

Switch to PostgreSQL for production:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'jqgrid_example',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### Static Files

Collect static files for production:

```bash
python manage.py collectstatic
```

## Troubleshooting

### Common Issues

1. **Import Error for django_jqgrid**
   - Make sure you've installed the package: `pip install -e ..`
   
2. **Static files not loading**
   - Run `python manage.py collectstatic`
   - Check STATIC_URL and STATIC_ROOT settings

3. **Database errors**
   - Run `python manage.py migrate`
   - Check database settings

4. **No sample data**
   - Run the create_sample_data function
   - Check for any error messages

### Getting Help

- Check the main [django-jqgrid documentation](../README.md)
- Review the [example app documentation](example/README.md)
- Open an issue on GitHub

## License

This example project is part of django-jqgrid and is licensed under the MIT License.