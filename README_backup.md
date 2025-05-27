# Django jqGrid

[![PyPI version](https://badge.fury.io/py/django-jqgrid.svg)](https://badge.fury.io/py/django-jqgrid)
[![Python Versions](https://img.shields.io/pypi/pyversions/django-jqgrid.svg)](https://pypi.org/project/django-jqgrid/)
[![Django Versions](https://img.shields.io/pypi/djversions/django-jqgrid.svg)](https://pypi.org/project/django-jqgrid/)
[![License](https://img.shields.io/pypi/l/django-jqgrid.svg)](https://github.com/yourusername/django-jqgrid/blob/master/LICENSE)

A Django package for easy integration of jqGrid with automatic configuration, comprehensive CRUD operations, and advanced features. This package makes it trivial to add powerful, interactive data grids to your Django applications with minimal code.

## Features

- - ⚙️ **Auto-configuration** - Automatically discovers and configures Django models� **Auto-configuration** - Automatically discovers and configures Django models
- =� **Full CRUD Support** - Create, Read, Update, Delete operations out of the box
- = **Advanced Filtering** - Built-in search and filtering capabilities
- =� **Import/Export** - Excel and CSV import/export functionality
- <� **Highly Customizable** - Extensive configuration options
- � **Performance Optimized** - Query optimization and caching support
- = **Security** - CSRF protection and field-level permissions
- < **Multi-database** - Support for multiple databases
- 📱 **Responsive** - Mobile-friendly grid layouts
- 🔧 **DRY Principle** - Reusable components and mixins

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Basic Usage](#basic-usage)
- [Advanced Usage](#advanced-usage)
- [Customization](#customization)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Using pip

```bash
pip install django-jqgrid
```

### Using poetry

```bash
poetry add django-jqgrid
```

### Development Installation

```bash
git clone https://github.com/yourusername/django-jqgrid.git
cd django-jqgrid
pip install -e .
```

## Quick Start

### 1. Add to INSTALLED_APPS

```python
INSTALLED_APPS = [
    # ... other apps
    'django_jqgrid',
]
```

### 2. Include URLs

```python
# urls.py
from django.urls import path, include

urlpatterns = [
    # ... other urls
    path('jqgrid/', include('django_jqgrid.urls', namespace='django_jqgrid')),
    path('api/jqgrid/', include('django_jqgrid.apis_urls', namespace='django_jqgrid_api')),
]
```

### 3. Run Migrations

```bash
python manage.py migrate django_jqgrid
```

### 4. Use in Templates

```django
{% load jqgrid_tags %}

{% block styles %}
    {% jqgrid_css %}
{% endblock %}

{% block content %}
    {% jqgrid "users_grid" "auth" "user" "Users" %}
{% endblock %}

{% block scripts %}
    {% jqgrid_dependencies %}
    {% jqgrid_js %}
{% endblock %}
```

## Configuration

### Basic Settings

Add to your Django settings:

```python
JQGRID_CONFIG = {
    # Grid Display Settings
    'GRID_HEIGHT': 400,
    'GRID_WIDTH': 'auto',
    'ROW_NUM': 25,
    'ROW_LIST': [10, 25, 50, 100, 500, 1000],
    
    # UI Settings
    'ICON_SET': 'fontAwesome',  # 'fontAwesome', 'glyph', 'ui'
    'GUI_STYLE': 'bootstrap4',   # 'bootstrap4', 'bootstrap5', 'jqueryui'
    'LOCALE': 'en',
    
    # Performance Settings
    'ENABLE_CACHE': True,
    'CACHE_TIMEOUT': 300,
    'OPTIMIZE_QUERIES': True,
    
    # Features
    'ENABLE_IMPORT_EXPORT': True,
    'ENABLE_FILTERS': True,
    'ENABLE_COLUMN_CHOOSER': True,
}
```

### Model-Specific Configuration

```python
JQGRID_MODEL_CONFIG = {
    'myapp.MyModel': {
        'fields': {
            'status': {
                'formatter': 'status_formatter',
                'width': 100,
                'align': 'center',
            },
            'created_at': {
                'hidden': True,
            },
        },
        'options': {
            'height': 600,
            'rowNum': 50,
        },
        'bulk_actions': [
            {
                'name': 'approve',
                'label': 'Approve Selected',
                'icon': 'fa-check',
                'handler': 'myapp.bulk_actions.approve_items',
            },
        ],
    },
}
```

## Basic Usage

### Using Template Tags

```django
{% load jqgrid_tags %}

<!-- Basic grid -->
{% jqgrid "products_grid" "shop" "product" %}

<!-- Grid with title -->
{% jqgrid "products_grid" "shop" "product" "Product List" %}

<!-- Grid without import/export buttons -->
{% jqgrid "products_grid" "shop" "product" include_import_export=False %}

<!-- Grid with custom formatters -->
{% jqgrid "products_grid" "shop" "product" 
    custom_formatters=custom_formatters 
    custom_buttons=custom_buttons %}
```

### Using in Views

```python
from django.views.generic import TemplateView
from django_jqgrid import JQGridMixin

class ProductGridView(JQGridMixin, TemplateView):
    template_name = 'shop/products.html'
    grid_model = 'shop.Product'
    
    # Optional customizations
    grid_fields = ['name', 'price', 'category', 'in_stock']
    readonly_fields = ['created_at']
    grid_height = 500
```

### Management Commands

```bash
# Auto-discover and register all models
python manage.py discover_models

# Discover models from specific app
python manage.py discover_models --app myapp

# List registered models
python manage.py discover_models --list
```

## Advanced Usage

### Custom Field Configuration

```python
class ProductGridView(JQGridMixin, TemplateView):
    template_name = 'shop/products.html'
    grid_model = 'shop.Product'
    
    def configure_price(self):
        """Custom configuration for price field"""
        return {
            'formatter': 'currency',
            'formatoptions': {
                'prefix': '$',
                'thousandsSeparator': ',',
                'decimalPlaces': 2
            },
            'align': 'right',
            'width': 100
        }
    
    def configure_status(self):
        """Custom configuration for status field"""
        return {
            'formatter': 'status_badge',
            'stype': 'select',
            'searchoptions': {
                'value': ':All;active:Active;inactive:Inactive'
            }
        }
```

### Custom Formatters

```python
class UserGridView(JQGridMixin, TemplateView):
    template_name = 'users/grid.html'
    grid_model = 'auth.User'
    
    custom_formatters = {
        'status_badge': '''function(cellvalue, options, rowObject) {
            var colors = {
                'active': 'success',
                'inactive': 'danger',
                'pending': 'warning'
            };
            return '<span class="badge badge-' + colors[cellvalue] + '">' + 
                   cellvalue + '</span>';
        }''',
        'user_avatar': '''function(cellvalue, options, rowObject) {
            if (cellvalue) {
                return '<img src="' + cellvalue + '" class="avatar-sm rounded-circle">';
            }
            return '<i class="fa fa-user-circle fa-2x"></i>';
        }'''
    }
```

### Bulk Actions

```python
class OrderGridView(JQGridMixin, TemplateView):
    template_name = 'orders/grid.html'
    grid_model = 'shop.Order'
    
    custom_bulk_actions = [
        {
            'name': 'mark_shipped',
            'label': 'Mark as Shipped',
            'icon': 'fa-truck',
            'handler': 'markOrdersShipped',
            'confirm': 'Mark selected orders as shipped?'
        },
        {
            'name': 'generate_invoices',
            'label': 'Generate Invoices',
            'icon': 'fa-file-invoice',
            'handler': 'generateInvoices',
            'modal': True  # Opens in modal dialog
        }
    ]
```

### Permission-Based Access

```python
class EmployeeGridView(JQGridMixin, PermissionRequiredMixin, TemplateView):
    template_name = 'hr/employees.html'
    grid_model = 'hr.Employee'
    permission_required = 'hr.view_employee'
    
    def has_field_permission(self, field_name, action='read'):
        """Field-level permission control"""
        user = self.request.user
        
        # Only HR managers can see salary information
        if field_name in ['salary', 'bonus', 'ssn']:
            return user.has_perm('hr.view_sensitive_data')
        
        # Only the employee or their manager can edit performance reviews
        if field_name == 'performance_review' and action == 'edit':
            return user.has_perm('hr.edit_performance')
        
        return True
    
    def can_delete(self):
        """Only HR admins can bulk delete"""
        return self.request.user.has_perm('hr.delete_employee')
```

### Query Optimization

```python
class OrderDetailGridView(JQGridMixin, TemplateView):
    template_name = 'orders/details.html'
    
    def get_model(self):
        from shop.models import OrderItem
        return OrderItem
    
    def get_optimized_queryset(self, queryset):
        """Optimize queries for better performance"""
        # Parent class handles basic optimization
        queryset = super().get_optimized_queryset(queryset)
        
        # Add custom optimization
        return queryset.select_related(
            'order__customer',
            'product__category',
        ).prefetch_related(
            'order__payments',
        ).annotate(
            line_total=F('quantity') * F('price'),
            customer_name=F('order__customer__name')
        )
```

### Dynamic Configuration

```python
class DynamicGridView(JQGridMixin, TemplateView):
    template_name = 'dynamic/grid.html'
    
    def get_model(self):
        """Dynamically determine model based on URL"""
        model_name = self.kwargs.get('model')
        return apps.get_model('myapp', model_name)
    
    def get_grid_config(self):
        """Customize configuration based on user preferences"""
        config = super().get_grid_config()
        
        # Apply user's saved preferences
        user_prefs = UserPreference.objects.get(user=self.request.user)
        if user_prefs.grid_theme:
            config['options']['styleUI'] = user_prefs.grid_theme
        
        return config
```

## Customization

### Custom Templates

Create your own grid template by extending the base:

```django
<!-- templates/myapp/custom_grid.html -->
{% extends "django_jqgrid/grid_container.html" %}

{% block grid_toolbar %}
    <div class="btn-group">
        <button id="custom-action" class="btn btn-primary">
            <i class="fa fa-magic"></i> Custom Action
        </button>
    </div>
    {{ block.super }}
{% endblock %}

{% block grid_scripts %}
    {{ block.super }}
    <script>
        $('#custom-action').click(function() {
            // Custom action logic
        });
    </script>
{% endblock %}
```

### JavaScript Hooks

```javascript
// static/js/grid-customizations.js
$(document).ready(function() {
    // Hook into grid initialization
    $(document).on('jqGrid:beforeInit', function(e, gridId, options) {
        console.log('Grid initializing:', gridId);
        // Modify options before initialization
        options.beforeSelectRow = function(rowid, e) {
            console.log('Row selected:', rowid);
            return true;
        };
    });
    
    // Hook into grid load complete
    $(document).on('jqGrid:loadComplete', function(e, gridId, data) {
        console.log('Grid loaded:', gridId);
        // Custom post-load logic
    });
});
```

### CSS Customization

```css
/* static/css/grid-custom.css */

/* Custom grid styling */
.jqgrid-container {
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Custom header styling */
.ui-jqgrid-hdiv {
    background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
}

/* Custom row hover */
.ui-jqgrid tr.jqgrow:hover {
    background-color: #f0f8ff;
}

/* Status badge in cells */
.badge-status {
    padding: 0.25em 0.6em;
    font-size: 0.75em;
    font-weight: 700;
    border-radius: 0.25rem;
}
```

## API Reference

### JQGridMixin

The main mixin class for adding jqGrid functionality to views.

#### Attributes

- `grid_model` - Model class or string reference (e.g., 'app.Model')
- `grid_fields` - List of fields to include (default: all fields)
- `exclude_fields` - List of fields to exclude
- `readonly_fields` - List of read-only fields
- `hidden_fields` - List of hidden fields
- `grid_height` - Grid height in pixels or 'auto'
- `grid_width` - Grid width in pixels or 'auto'
- `row_num` - Default rows per page
- `row_list` - Page size options

#### Methods

- `get_model()` - Return the model class for the grid
- `get_grid_config()` - Return the complete grid configuration
- `get_optimized_queryset(queryset)` - Apply query optimizations
- `has_field_permission(field_name, action)` - Check field permissions
- `configure_<field_name>()` - Custom configuration for specific field

### Template Tags

#### jqgrid_css
Include required CSS files.
```django
{% jqgrid_css %}
```

#### jqgrid_dependencies
Include required JavaScript dependencies.
```django
{% jqgrid_dependencies %}
```

#### jqgrid_js
Include jqGrid JavaScript files.
```django
{% jqgrid_js %}
```

#### jqgrid
Render a complete jqGrid.

Parameters:
- `grid_id` - Unique identifier for the grid
- `app_name` - Django app name
- `model_name` - Model name (lowercase)
- `grid_title` - Optional grid title
- `custom_formatters` - Dict of custom formatters
- `custom_buttons` - Dict of custom buttons
- `custom_bulk_actions` - List of bulk actions
- `include_import_export` - Show import/export buttons (default: True)

```django
{% jqgrid grid_id app_name model_name [grid_title] [**kwargs] %}
```

### JavaScript API

#### Grid Initialization
```javascript
$('#myGrid').jqGrid({
    url: '/api/myapp/mymodel/',
    datatype: 'json',
    colModel: [...],
    // ... other options
});
```

#### Custom Bulk Action Handler
```javascript
function myBulkAction(selectedIds, gridId) {
    $.ajax({
        url: '/api/bulk-action/',
        method: 'POST',
        data: {
            action: 'my_action',
            ids: selectedIds
        },
        success: function(response) {
            $('#' + gridId).trigger('reloadGrid');
            showNotification('Action completed successfully');
        }
    });
}
```

## Examples

### E-commerce Product Grid

```python
# views.py
class ProductGridView(JQGridMixin, TemplateView):
    template_name = 'shop/products.html'
    grid_model = Product
    grid_fields = ['sku', 'name', 'category', 'price', 'stock', 'status']
    readonly_fields = ['sku']
    
    custom_formatters = {
        'price': '''function(cellvalue) {
            return '$' + parseFloat(cellvalue).toFixed(2);
        }''',
        'stock': '''function(cellvalue) {
            if (cellvalue < 10) {
                return '<span class="text-danger">' + cellvalue + '</span>';
            }
            return cellvalue;
        }'''
    }
    
    custom_bulk_actions = [
        {
            'name': 'update_prices',
            'label': 'Update Prices',
            'icon': 'fa-tag',
            'handler': 'showPriceUpdateDialog'
        },
        {
            'name': 'generate_barcodes',
            'label': 'Generate Barcodes',
            'icon': 'fa-barcode',
            'handler': 'generateBarcodes'
        }
    ]
```

### User Management Grid

```python
# views.py
class UserManagementView(JQGridMixin, UserPassesTestMixin, TemplateView):
    template_name = 'admin/users.html'
    grid_model = User
    grid_fields = ['username', 'email', 'first_name', 'last_name', 
                   'is_active', 'date_joined', 'last_login']
    
    def test_func(self):
        return self.request.user.is_staff
    
    def configure_is_active(self):
        return {
            'formatter': 'checkbox',
            'align': 'center',
            'width': 80,
            'edittype': 'checkbox'
        }
    
    def configure_date_joined(self):
        return {
            'formatter': 'date',
            'formatoptions': {
                'srcformat': 'Y-m-d H:i:s',
                'newformat': 'm/d/Y'
            },
            'width': 100
        }
```

### Dynamic Report Grid

```python
# views.py
class ReportGridView(JQGridMixin, TemplateView):
    template_name = 'reports/grid.html'
    
    def get_model(self):
        report_type = self.request.GET.get('type', 'sales')
        if report_type == 'sales':
            return SalesReport
        elif report_type == 'inventory':
            return InventoryReport
        else:
            return CustomerReport
    
    def get_grid_config(self):
        config = super().get_grid_config()
        
        # Add export filename
        report_type = self.request.GET.get('type', 'sales')
        config['export_filename'] = f'{report_type}_report_{datetime.now():%Y%m%d}'
        
        return config
```

## Performance Tips

1. **Enable Caching**
   ```python
   JQGRID_CONFIG = {
       'ENABLE_CACHE': True,
       'CACHE_TIMEOUT': 600,  # 10 minutes
   }
   ```

2. **Use Query Optimization**
   ```python
   class OptimizedGridView(JQGridMixin, TemplateView):
       def get_optimized_queryset(self, queryset):
           return queryset.select_related('related_model').prefetch_related('many_related')
   ```

3. **Limit Page Size**
   ```python
   JQGRID_CONFIG = {
       'MAX_PAGE_SIZE': 500,  # Prevent loading too many records
   }
   ```

4. **Use Pagination**
   Always use server-side pagination for large datasets.

5. **Index Database Fields**
   Ensure fields used for sorting and filtering are indexed.

## Troubleshooting

### Common Issues

1. **Grid not loading**
   - Check browser console for JavaScript errors
   - Verify URLs are correctly configured
   - Ensure static files are served correctly

2. **No data displayed**
   - Check API endpoint returns data
   - Verify model permissions
   - Check for JavaScript errors

3. **Styling issues**
   - Ensure CSS files are loaded in correct order
   - Check for CSS conflicts with other libraries
   - Verify GUI_STYLE setting matches your framework

### Debug Mode

Enable debug mode for detailed logging:

```python
JQGRID_CONFIG = {
    'DEBUG': True,  # Enable debug logging
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone repository
git clone https://github.com/yourusername/django-jqgrid.git
cd django-jqgrid

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install development dependencies
pip install -e ".[dev]"

# Run tests
pytest

# Run linting
flake8
black --check .
```

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=django_jqgrid

# Run specific test
pytest tests/test_mixins.py::TestJQGridMixin
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes.

## Credits

- Built with [jqGrid](https://github.com/tonytomov/jqGrid)
- Inspired by Django admin's list display
- Thanks to all [contributors](https://github.com/yourusername/django-jqgrid/graphs/contributors)

## Support

- Documentation: [https://django-jqgrid.readthedocs.io](https://django-jqgrid.readthedocs.io)
- Issues: [GitHub Issues](https://github.com/yourusername/django-jqgrid/issues)
- Discussions: [GitHub Discussions](https://github.com/yourusername/django-jqgrid/discussions)
- Stack Overflow: Tag with `django-jqgrid`