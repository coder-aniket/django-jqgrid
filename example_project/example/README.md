# Django jqGrid Examples

This example app demonstrates the comprehensive capabilities of the `django-jqgrid` package through practical, real-world examples.

## Overview

The example app showcases various jqGrid features and implementation patterns including:

- **Multiple Grid Types**: Product, Customer, Order, and Category management grids
- **Advanced Features**: Filtering, sorting, pagination, and custom formatters
- **Django Integration**: Models, serializers, views, and templates working together
- **Responsive Design**: Mobile-friendly grid layouts
- **Custom Styling**: Enhanced UI with Bootstrap integration

## Models

### Category
- Simple model demonstrating basic grid functionality
- One-to-many relationship with products
- Boolean and text fields

### Product
- Comprehensive model showcasing various field types:
  - Text fields (CharField, TextField)
  - Numeric fields (DecimalField, IntegerField, FloatField)
  - Choice fields with display values
  - Boolean fields
  - Date/datetime fields
  - Foreign key relationships

### Customer
- User management demonstration
- Address handling
- Customer type categorization
- Registration tracking

### Order & OrderItem
- Complex relationships and financial data
- Status workflow management
- Calculated fields and aggregations
- Nested relationships (order items)

## Features Demonstrated

### 1. Grid Configuration
- Column definitions and formatting
- Sorting and filtering setup
- Pagination configuration
- Search toolbar integration

### 2. Data Serialization
- Multiple serializer patterns
- Related field handling
- Calculated fields
- Display value formatting

### 3. Custom Formatters
- Status badges with color coding
- Currency formatting
- Date formatting
- Boolean value display
- Custom icons and indicators

### 4. User Interface
- Bootstrap integration
- Responsive design
- Custom CSS styling
- Interactive elements
- Loading states and feedback

### 5. API Integration
- RESTful API endpoints
- Filtering and search
- Pagination handling
- Error management

## Quick Start

### 1. Add to Django Project

Add the example app to your `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    # ... your other apps
    'rest_framework',
    'django_jqgrid',
    'example',  # Add this line
]
```

### 2. Include URLs

Add example URLs to your project's URL configuration:

```python
# urls.py
from django.urls import path, include

urlpatterns = [
    # ... your other URLs
    path('examples/', include('example.urls')),
]
```

### 3. Run Migrations

Create and apply migrations for the example models:

```bash
python manage.py makemigrations example
python manage.py migrate
```

### 4. Create Sample Data

You can create sample data using the provided function:

```python
# In Django shell
from example.models import create_sample_data
create_sample_data()
```

Or via the admin interface after creating a superuser:

```bash
python manage.py createsuperuser
```

### 5. Access Examples

Start your development server and visit:
- Main examples page: `http://localhost:8000/examples/`
- Products grid: `http://localhost:8000/examples/products/`
- Customers grid: `http://localhost:8000/examples/customers/`
- Orders grid: `http://localhost:8000/examples/orders/`
- Categories grid: `http://localhost:8000/examples/categories/`

## Code Examples

### Basic Grid Setup

```html
<!-- Template -->
{% load jqgrid_tags %}
<table id="myGrid"></table>
<div id="myGridPager"></div>

<script>
$('#myGrid').jqGrid({
    url: '/api/example/products/',
    datatype: 'json',
    colNames: ['ID', 'Name', 'Price', 'Stock'],
    colModel: [
        {name: 'id', index: 'id', hidden: true, key: true},
        {name: 'name', index: 'name', width: 200},
        {name: 'formatted_price', index: 'price', width: 100, align: 'right'},
        {name: 'stock_quantity', index: 'stock_quantity', width: 80, align: 'center'}
    ],
    pager: '#myGridPager',
    rowNum: 25,
    autowidth: true,
    height: 400
});
</script>
```

### ViewSet Configuration

```python
# views.py
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category').all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'category', 'is_featured']
    search_fields = ['name', 'sku', 'description']
    ordering_fields = ['name', 'price', 'created_at']
```

### Custom Serializer

```python
# serializers.py
class ProductSerializer(serializers.ModelSerializer):
    formatted_price = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.name', read_only=True)
    stock_status = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'sku', 'formatted_price', 'stock_quantity', 
                 'stock_status', 'category_name', 'is_featured']
    
    def get_formatted_price(self, obj):
        return f"${obj.price:.2f}"
    
    def get_stock_status(self, obj):
        if obj.stock_quantity == 0:
            return 'Out of Stock'
        elif obj.stock_quantity < 10:
            return 'Low Stock'
        return 'In Stock'
```

## Customization

### Adding New Grids

1. **Create Model**: Define your Django model
2. **Create Serializer**: Add DRF serializer with any custom fields
3. **Create ViewSet**: Set up API endpoint with filtering/searching
4. **Create Template**: Add HTML template with jqGrid configuration
5. **Add URLs**: Include in URL patterns

### Custom Formatters

```javascript
// Custom formatter example
function statusFormatter(cellvalue, options, rowObject) {
    var badgeClass = 'secondary';
    if (cellvalue === 'Active') badgeClass = 'success';
    else if (cellvalue === 'Inactive') badgeClass = 'danger';
    return '<span class="badge bg-' + badgeClass + '">' + cellvalue + '</span>';
}

// Use in colModel
{name: 'status', formatter: statusFormatter}
```

### Conditional Formatting

```javascript
// Add row highlighting based on conditions
$(document).on('gridComplete.jqGrid', '#myGrid', function() {
    var rows = $(this).jqGrid('getDataIDs');
    rows.forEach(function(rowId) {
        var rowData = $(this).jqGrid('getRowData', rowId);
        if (parseInt(rowData.stock_quantity) === 0) {
            $(this).jqGrid('setRowData', rowId, {}, {background: '#ffe6e6'});
        }
    });
});
```

## File Structure

```
example/
├── __init__.py
├── apps.py
├── admin.py              # Django admin configuration
├── models.py             # Example models
├── serializers.py        # DRF serializers
├── views.py              # API views and template views
├── urls.py               # URL configuration
├── migrations/           # Database migrations
├── templates/example/    # HTML templates
│   ├── base.html
│   ├── index.html
│   ├── products_grid.html
│   ├── customers_grid.html
│   ├── orders_grid.html
│   ├── categories_grid.html
│   └── advanced_features.html
├── static/example/       # Static assets
│   ├── css/
│   │   └── example.css
│   └── js/
│       └── example.js
└── README.md            # This file
```

## Best Practices

### 1. Performance
- Use `select_related()` and `prefetch_related()` for foreign keys
- Implement proper pagination
- Add database indexes for frequently filtered/sorted fields
- Use appropriate serializers for list vs detail views

### 2. Security
- Implement proper permissions and authentication
- Validate input data
- Use Django's built-in protection mechanisms
- Sanitize user input in custom formatters

### 3. User Experience
- Provide loading indicators
- Show meaningful error messages
- Implement responsive design
- Add keyboard shortcuts for power users

### 4. Code Organization
- Separate concerns (models, serializers, views)
- Use consistent naming conventions
- Document complex logic
- Write reusable components

## Troubleshooting

### Common Issues

1. **Grid not loading data**
   - Check API endpoint URL
   - Verify CORS settings if needed
   - Check browser console for errors
   - Ensure proper serializer configuration

2. **Formatting not working**
   - Verify formatter function syntax
   - Check for JavaScript errors
   - Ensure proper column name mapping

3. **Search/filtering not working**
   - Verify filter backend configuration
   - Check filterset_fields and search_fields
   - Ensure proper URL parameter handling

4. **Styling issues**
   - Check CSS file loading
   - Verify Bootstrap version compatibility
   - Check for CSS conflicts

### Debug Mode

Enable debug mode in your Django settings for detailed error information:

```python
DEBUG = True
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },
    },
}
```

## Contributing

To contribute to the examples:

1. Fork the repository
2. Create a feature branch
3. Add your example
4. Update documentation
5. Submit a pull request

## Support

- GitHub Issues: [Report bugs or request features](https://github.com/coder-aniket/django-jqgrid/issues)
- Documentation: [Full documentation](https://django-jqgrid.readthedocs.io)
- Examples: This example app serves as the primary reference

## License

This example app is included with django-jqgrid and is licensed under the MIT License.