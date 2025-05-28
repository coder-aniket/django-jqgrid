# Quick Start Guide

This guide will help you create your first data grid using django-jqgrid in just a few minutes.

## Step 1: Create a Model

First, let's create a simple model to display in our grid:

```python
# models.py
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    category = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name
```

## Step 2: Create a Grid View

Create a view that uses the `JqGridMixin`:

```python
# views.py
from django.views.generic import TemplateView
from django_jqgrid.mixins import JqGridMixin
from .models import Product

class ProductGridView(JqGridMixin, TemplateView):
    template_name = 'products/grid.html'
    model = Product
    
    # Basic grid configuration
    jqgrid_config = {
        'caption': 'Product Inventory',
        'colModel': [
            {
                'name': 'id',
                'label': 'ID',
                'width': 60,
                'key': True,
                'hidden': True
            },
            {
                'name': 'name',
                'label': 'Product Name',
                'width': 200,
                'editable': True,
                'searchoptions': {'sopt': ['cn', 'eq', 'ne']}
            },
            {
                'name': 'category',
                'label': 'Category',
                'width': 150,
                'editable': True,
                'stype': 'select',
                'searchoptions': {
                    'sopt': ['eq', 'ne'],
                    'value': ':All;Electronics:Electronics;Clothing:Clothing;Food:Food'
                }
            },
            {
                'name': 'price',
                'label': 'Price',
                'width': 100,
                'align': 'right',
                'formatter': 'currency',
                'editable': True,
                'editrules': {'number': True, 'minValue': 0}
            },
            {
                'name': 'stock',
                'label': 'Stock',
                'width': 80,
                'align': 'center',
                'editable': True,
                'editrules': {'integer': True, 'minValue': 0}
            },
            {
                'name': 'created_at',
                'label': 'Created',
                'width': 150,
                'formatter': 'date',
                'formatoptions': {'srcformat': 'Y-m-d H:i:s', 'newformat': 'm/d/Y'}
            }
        ],
        'sortname': 'name',
        'sortorder': 'asc',
        'viewrecords': True,
        'height': 'auto',
        'width': 'auto',
        'rowNum': 25,
        'rowList': [10, 25, 50, 100],
        'pager': True,
        'multiselect': True,
        'multiboxonly': True,
    }
```

## Step 3: Create the Template

Create a template to render the grid:

```html
<!-- templates/products/grid.html -->
{% extends "base.html" %}
{% load static %}
{% load jqgrid_tags %}

{% block title %}Product Inventory{% endblock %}

{% block extra_css %}
    <!-- jQuery UI CSS -->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    
    <!-- jqGrid CSS -->
    <link rel="stylesheet" href="{% static 'django_jqgrid/plugins/jqGrid/css/ui.jqgrid-bootstrap4.css' %}">
    <link rel="stylesheet" href="{% static 'django_jqgrid/css/jqgrid-bootstrap.css' %}">
{% endblock %}

{% block content %}
    <div class="container-fluid mt-4">
        <h1>Product Inventory</h1>
        
        <!-- Grid Container -->
        <div class="jqgrid-container mt-3">
            {% render_jqgrid "product_grid" %}
        </div>
        
        <!-- Action Buttons -->
        <div class="mt-3">
            <button class="btn btn-primary" id="add-product">Add Product</button>
            <button class="btn btn-danger" id="delete-selected">Delete Selected</button>
            <button class="btn btn-success" id="export-grid">Export to Excel</button>
        </div>
    </div>
{% endblock %}

{% block extra_js %}
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    
    <!-- jqGrid Scripts -->
    <script src="{% static 'django_jqgrid/plugins/jqGrid/js/i18n/grid.locale-en.js' %}"></script>
    <script src="{% static 'django_jqgrid/plugins/jqGrid/js/jquery.jqGrid.min.js' %}"></script>
    
    <!-- django-jqgrid Scripts -->
    <script src="{% static 'django_jqgrid/js/jqgrid-core.js' %}"></script>
    <script src="{% static 'django_jqgrid/js/jqgrid-config.js' %}"></script>
    
    <script>
        $(document).ready(function() {
            // Initialize the grid
            var gridConfig = {{ jqgrid_config|safe }};
            $("#product_grid").jqGrid(gridConfig);
            
            // Add button handler
            $("#add-product").click(function() {
                $("#product_grid").jqGrid('editGridRow', 'new', {
                    reloadAfterSubmit: true,
                    closeAfterAdd: true
                });
            });
            
            // Delete button handler
            $("#delete-selected").click(function() {
                var selectedRows = $("#product_grid").jqGrid('getGridParam', 'selarrrow');
                if (selectedRows.length > 0) {
                    if (confirm('Delete selected products?')) {
                        // Implement delete logic
                    }
                }
            });
        });
    </script>
{% endblock %}
```

## Step 4: Configure URLs

Add the view to your URL configuration:

```python
# urls.py
from django.urls import path
from .views import ProductGridView

urlpatterns = [
    path('products/', ProductGridView.as_view(), name='product_grid'),
]
```

## Step 5: Create Sample Data (Optional)

Create a management command to generate sample data:

```python
# management/commands/create_sample_products.py
from django.core.management.base import BaseCommand
from myapp.models import Product
import random

class Command(BaseCommand):
    help = 'Creates sample product data'
    
    def handle(self, *args, **options):
        categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys']
        
        for i in range(100):
            Product.objects.create(
                name=f'Product {i+1}',
                description=f'Description for product {i+1}',
                price=random.uniform(10, 1000),
                stock=random.randint(0, 100),
                category=random.choice(categories)
            )
        
        self.stdout.write(self.style.SUCCESS('Successfully created 100 products'))
```

Run the command:
```bash
python manage.py create_sample_products
```

## Step 6: Test Your Grid

1. Start the development server:
   ```bash
   python manage.py runserver
   ```

2. Navigate to `http://localhost:8000/products/`

3. You should see:
   - A data grid displaying your products
   - Pagination controls
   - Sorting capabilities (click column headers)
   - Search functionality
   - Multi-select checkboxes

## Advanced Features

### Enable Inline Editing

Add these options to your `jqgrid_config`:

```python
'cellEdit': True,
'cellsubmit': 'remote',
'cellurl': '/api/jqgrid/product/update/',
```

### Add Custom Toolbar Buttons

```javascript
$("#product_grid").jqGrid('navGrid', '#product_grid_pager', 
    {edit: true, add: true, del: true, search: true, refresh: true},
    {}, // edit options
    {}, // add options
    {}, // delete options
    {multipleSearch: true} // search options
);
```

### Enable Import/Export

```javascript
// Add to your template
<script src="{% static 'django_jqgrid/js/jqgrid-import-export.js' %}"></script>

// Initialize import/export
$("#product_grid").jqGridImportExport({
    exportUrl: '/api/jqgrid/product/export/',
    importUrl: '/api/jqgrid/product/import/'
});
```

## Next Steps

- Explore [Configuration Options](configuration.md) for more customization
- Learn about [API Integration](api/index.rst) for CRUD operations
- Check out [Examples](examples.md) for complex use cases
- Read about [Performance Optimization](performance.md) for large datasets