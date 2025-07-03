"""
Example views demonstrating django_jqgrid integration.
These views showcase various jqGrid features and configurations.
"""

from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from django.core.paginator import Paginator
from django.db.models import Q, Count
from django.db import models

from .models import Category, Product, Customer, Order, OrderItem
from .serializers import (
    CategorySerializer, ProductSerializer, ProductListSerializer,
    CustomerSerializer, CustomerListSerializer, 
    OrderSerializer, OrderListSerializer
)
from .grid_config import (
    get_products_grid_config, get_customers_grid_config,
    get_orders_grid_config, get_categories_grid_config
)
from .jqgrid_pagination import JqGridPagination


# Template views for displaying jqGrid examples
def index(request):
    """Main example page with links to all demonstrations."""
    context = {
        'title': 'Django jqGrid Examples',
        'examples': [
            {
                'name': 'Products Grid',
                'url': 'products',
                'description': 'Comprehensive product grid with filtering, sorting, and custom formatters'
            },
            {
                'name': 'Customers Grid', 
                'url': 'customers',
                'description': 'Customer management grid with search and pagination'
            },
            {
                'name': 'Orders Grid',
                'url': 'orders', 
                'description': 'Order tracking grid with status indicators and financial data'
            },
            {
                'name': 'Categories Grid',
                'url': 'categories',
                'description': 'Simple category management grid'
            },
            {
                'name': 'Advanced Features',
                'url': 'advanced',
                'description': 'Advanced jqGrid features and customizations'
            },
            {
                'name': 'All Features Demo',
                'url': 'all_features',
                'description': 'Complete demonstration with every jqGrid feature enabled'
            }
        ]
    }
    return render(request, 'example/index.html', context)


def products_grid(request):
    """Products grid page with advanced features."""
    context = {
        'title': 'Products',
        'description': 'Comprehensive product management grid with all advanced features enabled.',
        'grid_id': 'productsGrid',
        'api_url': '/examples/api/products/',
        'config_url': '/examples/api/products/grid_config/',
        'features': [
            'Multi-column sorting',
            'Advanced filtering', 
            'Bulk operations',
            'Export/Import',
            'Conditional formatting',
            'Inline editing',
            'Custom formatters',
            'Column management'
        ]
    }
    return render(request, 'example/advanced_grid.html', context)


def customers_grid(request):
    """Customers grid page with advanced features."""
    context = {
        'title': 'Customers',
        'description': 'Advanced customer management grid with comprehensive features.',
        'grid_id': 'customersGrid',
        'api_url': '/examples/api/customers/',
        'config_url': '/examples/api/customers/grid_config/',
        'features': [
            'Full-text search',
            'Address handling',
            'Customer type filtering',
            'Bulk email operations',
            'Contact management',
            'Registration tracking',
            'Order history',
            'Export contacts'
        ]
    }
    return render(request, 'example/advanced_grid.html', context)


def orders_grid(request):
    """Orders grid page with advanced features."""
    context = {
        'title': 'Orders',
        'description': 'Advanced order management grid with comprehensive tracking and processing features.',
        'grid_id': 'ordersGrid',
        'api_url': '/examples/api/orders/',
        'config_url': '/examples/api/orders/grid_config/',
        'features': [
            'Financial data formatting',
            'Status workflow management',
            'Bulk order processing',
            'Invoice generation',
            'Shipping management',
            'Payment tracking',
            'Order analytics',
            'Export capabilities'
        ]
    }
    return render(request, 'example/advanced_grid.html', context)


def categories_grid(request):
    """Categories grid page with advanced features."""
    context = {
        'title': 'Categories',
        'description': 'Advanced category management grid with hierarchical organization and bulk operations.',
        'grid_id': 'categoriesGrid',
        'api_url': '/examples/api/categories/',
        'config_url': '/examples/api/categories/grid_config/',
        'features': [
            'Hierarchical categories',
            'Bulk operations',
            'Sort ordering',
            'Active/inactive toggle',
            'Product count tracking',
            'URL slug management',
            'Drag & drop reordering',
            'Category statistics'
        ]
    }
    return render(request, 'example/advanced_grid.html', context)


def advanced_features(request):
    """Advanced features demonstration page."""
    context = {
        'title': 'Advanced jqGrid Features',
        'description': 'Comprehensive demonstration of advanced jqGrid features, customizations, and interactive grid builder.',
        'features': [
            {
                'name': 'Interactive Grid Builder',
                'description': 'Design and configure jqGrid with live preview and code generation',
                'icon': 'fas fa-tools',
                'color': 'primary'
            },
            {
                'name': 'Inline Editing',
                'description': 'Edit grid data directly within cells with validation and save functionality',
                'icon': 'fas fa-edit',
                'color': 'success'
            },
            {
                'name': 'Custom Formatters',
                'description': 'Create custom cell renderers for progress bars, status indicators, and action buttons',
                'icon': 'fas fa-paint-brush',
                'color': 'info'
            },
            {
                'name': 'Dynamic Configuration',
                'description': 'Change grid behavior, themes, and features dynamically at runtime',
                'icon': 'fas fa-sliders-h',
                'color': 'warning'
            },
            {
                'name': 'Event Handling',
                'description': 'Capture and respond to user interactions with comprehensive event logging',
                'icon': 'fas fa-bolt',
                'color': 'danger'
            },
            {
                'name': 'Form Integration',
                'description': 'Seamlessly integrate jqGrid with Django forms and model validation',
                'icon': 'fas fa-clipboard-list',
                'color': 'secondary'
            }
        ],
        'demo_sections': [
            {
                'id': 'grid-builder',
                'title': 'Interactive Grid Builder',
                'description': 'Design your grid configuration with real-time preview'
            },
            {
                'id': 'inline-editing',
                'title': 'Inline Editing Demo',
                'description': 'Demonstrate inline editing capabilities with validation'
            },
            {
                'id': 'custom-formatters',
                'title': 'Custom Formatters',
                'description': 'Show various custom cell formatting options'
            },
            {
                'id': 'dynamic-config',
                'title': 'Dynamic Configuration',
                'description': 'Change grid settings and appearance on the fly'
            },
            {
                'id': 'event-handling',
                'title': 'Event Handling',
                'description': 'Capture and log user interactions with the grid'
            }
        ]
    }
    return render(request, 'example/advanced_features.html', context)


def all_features(request):
    """All features enabled demonstration page."""
    context = {
        'title': 'All Features Enabled',
        'description': 'Complete jqGrid demonstration with every feature and flag enabled.'
    }
    return render(request, 'example/all_features.html', context)


# API ViewSets for jqGrid data
class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Category model demonstrating basic jqGrid integration.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = JqGridPagination  # Use jqGrid-compatible pagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['active']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']
    
    @action(detail=False, methods=['get'])
    def grid_config(self, request):
        """Return comprehensive grid configuration for jqGrid."""
        return Response(get_categories_grid_config())
    
    @action(detail=False, methods=['get'])
    def dropdown(self, request):
        """Return dropdown options for select fields."""
        categories = self.get_queryset().filter(active=True)
        options = [{"value": "", "text": "Select Category"}]
        for category in categories:
            options.append({"value": str(category.id), "text": category.name})
        return Response(options)
    
    @action(detail=False, methods=['post'])
    def bulk_update(self, request):
        """Bulk update multiple records."""
        try:
            ids = request.data.get('ids', [])
            update_data = request.data.get('data', {})
            
            if not ids:
                return Response({'error': 'No IDs provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Remove empty values
            update_data = {k: v for k, v in update_data.items() if v not in ['', None]}
            
            if not update_data:
                return Response({'error': 'No update data provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            updated_count = self.get_queryset().filter(id__in=ids).update(**update_data)
            
            return Response({
                'success': True,
                'updated_count': updated_count,
                'message': f'Successfully updated {updated_count} records'
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['post'])
    def bulk_delete(self, request):
        """Bulk delete multiple records."""
        try:
            ids = request.data.get('ids', [])
            
            if not ids:
                return Response({'error': 'No IDs provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            deleted_count, _ = self.get_queryset().filter(id__in=ids).delete()
            
            return Response({
                'success': True,
                'deleted_count': deleted_count,
                'message': f'Successfully deleted {deleted_count} records'
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['get'])
    def export(self, request):
        """Export data in various formats."""
        try:
            format_type = request.GET.get('format', 'csv')
            ids = request.GET.get('ids', '').split(',') if request.GET.get('ids') else None
            
            queryset = self.get_queryset()
            if ids and ids[0]:  # Check if ids is not empty
                queryset = queryset.filter(id__in=ids)
            
            # Apply filters if provided
            filters = request.GET.get('filters')
            if filters:
                # Apply search filters (simplified implementation)
                import json
                try:
                    filter_data = json.loads(filters)
                    # Implement filter logic based on your needs
                except json.JSONDecodeError:
                    pass
            
            # Generate export based on format
            if format_type == 'csv':
                return self._export_csv(queryset)
            elif format_type == 'xlsx':
                return self._export_excel(queryset)
            elif format_type == 'json':
                return self._export_json(queryset)
            else:
                return Response({'error': 'Unsupported format'}, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def _export_csv(self, queryset):
        """Export queryset as CSV."""
        import csv
        from django.http import HttpResponse
        
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="categories.csv"'
        
        writer = csv.writer(response)
        writer.writerow(['ID', 'Name', 'Description', 'Active', 'Created At'])
        
        for obj in queryset:
            writer.writerow([
                obj.id,
                obj.name,
                obj.description or '',
                'Yes' if obj.active else 'No',
                obj.created_at.strftime('%Y-%m-%d %H:%M:%S') if obj.created_at else ''
            ])
        
        return response
    
    def _export_excel(self, queryset):
        """Export queryset as Excel."""
        from django.http import HttpResponse
        try:
            import openpyxl
            from openpyxl import Workbook
            
            wb = Workbook()
            ws = wb.active
            ws.title = "Categories"
            
            # Headers
            headers = ['ID', 'Name', 'Description', 'Active', 'Created At']
            ws.append(headers)
            
            # Data
            for obj in queryset:
                ws.append([
                    obj.id,
                    obj.name,
                    obj.description or '',
                    'Yes' if obj.active else 'No',
                    obj.created_at.strftime('%Y-%m-%d %H:%M:%S') if obj.created_at else ''
                ])
            
            response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = 'attachment; filename="categories.xlsx"'
            wb.save(response)
            return response
            
        except ImportError:
            return Response({'error': 'Excel export not available (openpyxl required)'}, status=status.HTTP_501_NOT_IMPLEMENTED)
    
    def _export_json(self, queryset):
        """Export queryset as JSON."""
        from django.http import JsonResponse
        
        data = []
        for obj in queryset:
            data.append({
                'id': obj.id,
                'name': obj.name,
                'description': obj.description,
                'active': obj.active,
                'created_at': obj.created_at.isoformat() if obj.created_at else None
            })
        
        response = JsonResponse(data, safe=False)
        response['Content-Disposition'] = 'attachment; filename="categories.json"'
        return response
    
    @action(detail=False, methods=['get'])
    def export_data(self, request):
        """Export data endpoint compatible with jqgrid-import-export.js"""
        try:
            format_type = request.GET.get('ext', 'csv')
            ids = request.GET.get('ids', '').split(',') if request.GET.get('ids') else None
            columns = request.GET.get('columns', 'all')
            
            queryset = self.get_queryset()
            if ids and ids[0]:
                queryset = queryset.filter(id__in=ids)
            
            # Generate export based on format
            if format_type == 'csv':
                return self._export_csv(queryset)
            elif format_type in ['xlsx', 'xls']:
                return self._export_excel(queryset)
            elif format_type == 'json':
                return self._export_json(queryset)
            else:
                return Response({'error': 'Unsupported format'}, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['post'])
    def import_data(self, request):
        """Import data endpoint compatible with jqgrid-import-export.js"""
        try:
            import_file = request.FILES.get('import_file')
            if not import_file:
                return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Get mapping configuration
            mapped_columns = request.POST.get('mapped_columns', '{}')
            default_values = request.POST.get('default_values', '{}')
            
            try:
                import json
                mapped_columns = json.loads(mapped_columns)
                default_values = json.loads(default_values)
            except json.JSONDecodeError:
                return Response({'error': 'Invalid mapping configuration'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Process the file (this is a simplified implementation)
            # In a real implementation, you would parse CSV/Excel and create records
            imported_count = 0
            
            # Example: Parse CSV file
            if import_file.name.endswith('.csv'):
                import csv
                import io
                
                # Read file content
                file_content = import_file.read().decode('utf-8')
                csv_reader = csv.DictReader(io.StringIO(file_content))
                
                for row in csv_reader:
                    try:
                        # Create category data based on mapping
                        category_data = {}
                        
                        # Apply mapped columns
                        for field_name, header_name in mapped_columns.items():
                            if header_name and header_name in row:
                                value = row[header_name].strip()
                                # Handle boolean conversion for active field
                                if field_name == 'active':
                                    category_data[field_name] = value.lower() in ['true', '1', 'yes', 'on']
                                else:
                                    category_data[field_name] = value
                        
                        # Apply default values
                        for field_name, default_value in default_values.items():
                            if default_value and field_name not in category_data:
                                if field_name == 'active':
                                    category_data[field_name] = default_value.lower() in ['true', '1', 'yes', 'on']
                                else:
                                    category_data[field_name] = default_value
                        
                        # Create category if we have required fields
                        if 'name' in category_data and category_data['name']:
                            Category.objects.create(**category_data)
                            imported_count += 1
                            
                    except Exception as e:
                        # Log error but continue processing
                        print(f"Error importing row: {e}")
                        continue
            
            return Response({
                'status': True,
                'message': f'Successfully imported {imported_count} categories',
                'imported_count': imported_count
            })
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Product model demonstrating comprehensive jqGrid features.
    """
    queryset = Product.objects.select_related('category', 'created_by').all()
    pagination_class = JqGridPagination  # Use jqGrid-compatible pagination
    
    def get_serializer_class(self):
        """Use different serializers for list vs detail views."""
        if self.action == 'list':
            return ProductListSerializer
        return ProductSerializer
    
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'category', 'is_featured', 'is_digital']
    search_fields = ['name', 'description', 'sku']
    ordering_fields = ['name', 'price', 'stock_quantity', 'created_at']
    ordering = ['-created_at']
    
    @action(detail=False, methods=['get'])
    def grid_config(self, request):
        """Return comprehensive grid configuration for products jqGrid."""
        return Response(get_products_grid_config())
    
    @action(detail=False, methods=['get'])
    def dropdown(self, request):
        """Return dropdown options for select fields."""
        products = self.get_queryset().filter(status='active')
        options = [{"value": "", "text": "Select Product"}]
        for product in products:
            options.append({"value": str(product.id), "text": f"{product.name} ({product.sku})"})
        return Response(options)
    
    @action(detail=False, methods=['get'])
    def export_data(self, request):
        """Export data endpoint compatible with jqgrid-import-export.js"""
        try:
            format_type = request.GET.get('ext', 'csv')
            ids = request.GET.get('ids', '').split(',') if request.GET.get('ids') else None
            
            queryset = self.get_queryset()
            if ids and ids[0]:
                queryset = queryset.filter(id__in=ids)
            
            # Generate CSV export for products
            if format_type == 'csv':
                import csv
                from django.http import HttpResponse
                
                response = HttpResponse(content_type='text/csv')
                response['Content-Disposition'] = 'attachment; filename="products.csv"'
                
                writer = csv.writer(response)
                writer.writerow(['ID', 'Name', 'SKU', 'Price', 'Stock Quantity', 'Status', 'Category', 'Created At'])
                
                for obj in queryset:
                    writer.writerow([
                        obj.id,
                        obj.name,
                        obj.sku,
                        str(obj.price),
                        obj.stock_quantity,
                        obj.status,
                        obj.category.name if obj.category else '',
                        obj.created_at.strftime('%Y-%m-%d %H:%M:%S') if obj.created_at else ''
                    ])
                return response
            else:
                return Response({'error': 'Only CSV format supported for products'}, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['post'])
    def import_data(self, request):
        """Import data endpoint compatible with jqgrid-import-export.js"""
        try:
            import_file = request.FILES.get('import_file')
            if not import_file:
                return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Get mapping configuration
            mapped_columns = request.POST.get('mapped_columns', '{}')
            default_values = request.POST.get('default_values', '{}')
            
            try:
                import json
                mapped_columns = json.loads(mapped_columns)
                default_values = json.loads(default_values)
            except json.JSONDecodeError:
                return Response({'error': 'Invalid mapping configuration'}, status=status.HTTP_400_BAD_REQUEST)
            
            imported_count = 0
            
            # Parse CSV file
            if import_file.name.endswith('.csv'):
                import csv
                import io
                from decimal import Decimal
                
                file_content = import_file.read().decode('utf-8')
                csv_reader = csv.DictReader(io.StringIO(file_content))
                
                for row in csv_reader:
                    try:
                        product_data = {}
                        
                        # Apply mapped columns
                        for field_name, header_name in mapped_columns.items():
                            if header_name and header_name in row:
                                value = row[header_name]
                                # Handle specific field types
                                if field_name == 'price' and value:
                                    product_data[field_name] = Decimal(str(value))
                                elif field_name == 'stock_quantity' and value:
                                    product_data[field_name] = int(value)
                                elif field_name == 'category' and value:
                                    # Try to find category by name
                                    try:
                                        category = Category.objects.get(name=value)
                                        product_data['category_id'] = category.id
                                    except Category.DoesNotExist:
                                        pass
                                else:
                                    product_data[field_name] = value
                        
                        # Apply default values
                        for field_name, default_value in default_values.items():
                            if default_value and field_name not in product_data:
                                if field_name == 'price':
                                    product_data[field_name] = Decimal(str(default_value))
                                elif field_name == 'stock_quantity':
                                    product_data[field_name] = int(default_value)
                                else:
                                    product_data[field_name] = default_value
                        
                        # Set default category if not provided
                        if 'category_id' not in product_data and 'category' not in product_data:
                            default_category = Category.objects.first()
                            if default_category:
                                product_data['category_id'] = default_category.id
                        
                        # Create product if we have required fields
                        if 'name' in product_data and 'sku' in product_data:
                            Product.objects.create(**product_data)
                            imported_count += 1
                            
                    except Exception as e:
                        print(f"Error importing product row: {e}")
                        continue
            
            return Response({
                'status': True,
                'message': f'Successfully imported {imported_count} products',
                'imported_count': imported_count
            })
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CustomerViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Customer model demonstrating user management features.
    """
    queryset = Customer.objects.all()
    pagination_class = JqGridPagination  # Use jqGrid-compatible pagination
    
    def get_serializer_class(self):
        if self.action == 'list':
            return CustomerListSerializer
        return CustomerSerializer
    
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['customer_type', 'is_active', 'city', 'state']
    search_fields = ['first_name', 'last_name', 'email', 'phone']
    ordering_fields = ['last_name', 'registration_date', 'credit_limit']
    ordering = ['last_name', 'first_name']
    
    @action(detail=False, methods=['get'])
    def grid_config(self, request):
        """Return comprehensive grid configuration for customers jqGrid."""
        return Response(get_customers_grid_config())
    
    @action(detail=False, methods=['get'])
    def dropdown(self, request):
        """Return dropdown options for select fields."""
        customers = self.get_queryset().filter(is_active=True)
        options = [{"value": "", "text": "Select Customer"}]
        for customer in customers:
            options.append({"value": str(customer.id), "text": f"{customer.first_name} {customer.last_name}"})
        return Response(options)
    
    @action(detail=False, methods=['get'])
    def export_data(self, request):
        """Export data endpoint compatible with jqgrid-import-export.js"""
        try:
            format_type = request.GET.get('ext', 'csv')
            ids = request.GET.get('ids', '').split(',') if request.GET.get('ids') else None
            
            queryset = self.get_queryset()
            if ids and ids[0]:
                queryset = queryset.filter(id__in=ids)
            
            if format_type == 'csv':
                import csv
                from django.http import HttpResponse
                
                response = HttpResponse(content_type='text/csv')
                response['Content-Disposition'] = 'attachment; filename="customers.csv"'
                
                writer = csv.writer(response)
                writer.writerow(['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Customer Type', 'Active', 'City', 'State', 'Registration Date'])
                
                for obj in queryset:
                    writer.writerow([
                        obj.id,
                        obj.first_name,
                        obj.last_name,
                        obj.email,
                        obj.phone or '',
                        obj.customer_type,
                        'Yes' if obj.is_active else 'No',
                        obj.city or '',
                        obj.state or '',
                        obj.registration_date.strftime('%Y-%m-%d') if obj.registration_date else ''
                    ])
                return response
            else:
                return Response({'error': 'Only CSV format supported for customers'}, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['post'])
    def import_data(self, request):
        """Import data endpoint compatible with jqgrid-import-export.js"""
        try:
            import_file = request.FILES.get('import_file')
            if not import_file:
                return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Get mapping configuration
            mapped_columns = request.POST.get('mapped_columns', '{}')
            default_values = request.POST.get('default_values', '{}')
            
            try:
                import json
                mapped_columns = json.loads(mapped_columns)
                default_values = json.loads(default_values)
            except json.JSONDecodeError:
                return Response({'error': 'Invalid mapping configuration'}, status=status.HTTP_400_BAD_REQUEST)
            
            imported_count = 0
            
            # Parse CSV file
            if import_file.name.endswith('.csv'):
                import csv
                import io
                from decimal import Decimal
                
                file_content = import_file.read().decode('utf-8')
                csv_reader = csv.DictReader(io.StringIO(file_content))
                
                for row in csv_reader:
                    try:
                        customer_data = {}
                        
                        # Apply mapped columns
                        for field_name, header_name in mapped_columns.items():
                            if header_name and header_name in row:
                                value = row[header_name].strip()
                                # Handle specific field types
                                if field_name == 'is_active':
                                    customer_data[field_name] = value.lower() in ['true', '1', 'yes', 'active']
                                elif field_name == 'credit_limit' and value:
                                    customer_data[field_name] = Decimal(str(value))
                                else:
                                    customer_data[field_name] = value
                        
                        # Apply default values
                        for field_name, default_value in default_values.items():
                            if default_value and field_name not in customer_data:
                                if field_name == 'is_active':
                                    customer_data[field_name] = default_value.lower() in ['true', '1', 'yes', 'active']
                                elif field_name == 'credit_limit':
                                    customer_data[field_name] = Decimal(str(default_value))
                                else:
                                    customer_data[field_name] = default_value
                        
                        # Create customer if we have required fields
                        if all(field in customer_data for field in ['first_name', 'last_name', 'email']):
                            Customer.objects.create(**customer_data)
                            imported_count += 1
                            
                    except Exception as e:
                        print(f"Error importing customer row: {e}")
                        continue
            
            return Response({
                'status': True,
                'message': f'Successfully imported {imported_count} customers',
                'imported_count': imported_count
            })
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Order model demonstrating financial data and relationships.
    """
    queryset = Order.objects.select_related('customer').all()
    pagination_class = JqGridPagination  # Use jqGrid-compatible pagination
    
    def get_serializer_class(self):
        if self.action == 'list':
            return OrderListSerializer
        return OrderSerializer
    
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'customer']
    search_fields = ['order_number', 'customer__first_name', 'customer__last_name', 'tracking_number']
    ordering_fields = ['order_date', 'total_amount', 'status']
    ordering = ['-order_date']
    
    @action(detail=False, methods=['get'])
    def grid_config(self, request):
        """Return comprehensive grid configuration for orders jqGrid."""
        return Response(get_orders_grid_config())
    
    @action(detail=False, methods=['get'])
    def dropdown(self, request):
        """Return dropdown options for select fields."""
        orders = self.get_queryset()
        options = [{"value": "", "text": "Select Order"}]
        for order in orders:
            options.append({"value": str(order.id), "text": f"{order.order_number} - {order.customer_name}"})
        return Response(options)
    
    @action(detail=False, methods=['get'])
    def status_summary(self, request):
        """Get order status summary for dashboard."""
        from django.db.models import Count, Sum
        
        summary = Order.objects.values('status').annotate(
            count=Count('id'),
            total_value=Sum('total_amount')
        )
        
        return Response(list(summary))
    
    @action(detail=False, methods=['get'])
    def export_data(self, request):
        """Export data endpoint compatible with jqgrid-import-export.js"""
        try:
            format_type = request.GET.get('ext', 'csv')
            ids = request.GET.get('ids', '').split(',') if request.GET.get('ids') else None
            
            queryset = self.get_queryset()
            if ids and ids[0]:
                queryset = queryset.filter(id__in=ids)
            
            if format_type == 'csv':
                import csv
                from django.http import HttpResponse
                
                response = HttpResponse(content_type='text/csv')
                response['Content-Disposition'] = 'attachment; filename="orders.csv"'
                
                writer = csv.writer(response)
                writer.writerow(['ID', 'Order Number', 'Customer', 'Order Date', 'Status', 'Subtotal', 'Tax Amount', 'Shipping Cost', 'Total Amount', 'Tracking Number'])
                
                for obj in queryset:
                    writer.writerow([
                        obj.id,
                        obj.order_number,
                        f"{obj.customer.first_name} {obj.customer.last_name}" if obj.customer else '',
                        obj.order_date.strftime('%Y-%m-%d') if obj.order_date else '',
                        obj.status,
                        str(obj.subtotal),
                        str(obj.tax_amount),
                        str(obj.shipping_cost),
                        str(obj.total_amount),
                        obj.tracking_number or ''
                    ])
                return response
            else:
                return Response({'error': 'Only CSV format supported for orders'}, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['post'])
    def import_data(self, request):
        """Import data endpoint compatible with jqgrid-import-export.js"""
        try:
            import_file = request.FILES.get('import_file')
            if not import_file:
                return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Get mapping configuration
            mapped_columns = request.POST.get('mapped_columns', '{}')
            default_values = request.POST.get('default_values', '{}')
            
            try:
                import json
                mapped_columns = json.loads(mapped_columns)
                default_values = json.loads(default_values)
            except json.JSONDecodeError:
                return Response({'error': 'Invalid mapping configuration'}, status=status.HTTP_400_BAD_REQUEST)
            
            imported_count = 0
            
            # Parse CSV file
            if import_file.name.endswith('.csv'):
                import csv
                import io
                from decimal import Decimal
                from django.utils import timezone
                from datetime import datetime
                
                file_content = import_file.read().decode('utf-8')
                csv_reader = csv.DictReader(io.StringIO(file_content))
                
                for row in csv_reader:
                    try:
                        order_data = {}
                        
                        # Apply mapped columns
                        for field_name, header_name in mapped_columns.items():
                            if header_name and header_name in row:
                                value = row[header_name].strip()
                                # Handle specific field types
                                if field_name in ['subtotal', 'tax_amount', 'shipping_cost', 'total_amount'] and value:
                                    order_data[field_name] = Decimal(str(value))
                                elif field_name == 'order_date' and value:
                                    try:
                                        order_data[field_name] = datetime.strptime(value, '%Y-%m-%d')
                                    except ValueError:
                                        # Try different date formats
                                        try:
                                            order_data[field_name] = datetime.strptime(value, '%m/%d/%Y')
                                        except ValueError:
                                            order_data[field_name] = timezone.now()
                                elif field_name == 'customer' and value:
                                    # Try to find customer by email or name
                                    try:
                                        customer = Customer.objects.filter(
                                            models.Q(email=value) | 
                                            models.Q(first_name__icontains=value.split()[0]) if ' ' in value else models.Q()
                                        ).first()
                                        if customer:
                                            order_data['customer_id'] = customer.id
                                    except Exception:
                                        pass
                                else:
                                    order_data[field_name] = value
                        
                        # Apply default values
                        for field_name, default_value in default_values.items():
                            if default_value and field_name not in order_data:
                                if field_name in ['subtotal', 'tax_amount', 'shipping_cost', 'total_amount']:
                                    order_data[field_name] = Decimal(str(default_value))
                                elif field_name == 'order_date':
                                    order_data[field_name] = timezone.now()
                                else:
                                    order_data[field_name] = default_value
                        
                        # Set default customer if not provided
                        if 'customer_id' not in order_data:
                            default_customer = Customer.objects.first()
                            if default_customer:
                                order_data['customer_id'] = default_customer.id
                        
                        # Generate order number if not provided
                        if 'order_number' not in order_data:
                            import uuid
                            order_data['order_number'] = f'ORD-{uuid.uuid4().hex[:8].upper()}'
                        
                        # Create order if we have required fields
                        if 'customer_id' in order_data and 'order_number' in order_data:
                            Order.objects.create(**order_data)
                            imported_count += 1
                            
                    except Exception as e:
                        print(f"Error importing order row: {e}")
                        continue
            
            return Response({
                'status': True,
                'message': f'Successfully imported {imported_count} orders',
                'imported_count': imported_count
            })
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Utility views for demonstration
def create_sample_data(request):
    """Create sample data for demonstration."""
    try:
        from django.contrib.auth.models import User
        
        # Create sample categories
        categories_data = [
            {'name': 'Electronics', 'description': 'Electronic devices and accessories', 'active': True},
            {'name': 'Books', 'description': 'Books and educational materials', 'active': True},
            {'name': 'Clothing', 'description': 'Apparel and fashion items', 'active': True},
            {'name': 'Home & Garden', 'description': 'Home improvement and garden supplies', 'active': False},
        ]
        
        for cat_data in categories_data:
            Category.objects.get_or_create(name=cat_data['name'], defaults=cat_data)
        
        # Create sample products
        electronics = Category.objects.get(name='Electronics')
        books = Category.objects.get(name='Books')
        clothing = Category.objects.get(name='Clothing')
        
        # Get or create a user for created_by field
        user, created = User.objects.get_or_create(username='demo_user', defaults={
            'email': 'demo@example.com',
            'first_name': 'Demo',
            'last_name': 'User'
        })
        
        products_data = [
            {'name': 'Laptop Pro', 'sku': 'LPT-001', 'price': 1299.99, 'stock_quantity': 50, 'category': electronics, 'status': 'active', 'is_featured': True, 'created_by': user},
            {'name': 'Wireless Mouse', 'sku': 'WMS-002', 'price': 29.99, 'stock_quantity': 200, 'category': electronics, 'status': 'active', 'is_featured': False, 'created_by': user},
            {'name': 'Programming Guide', 'sku': 'PGD-003', 'price': 49.99, 'stock_quantity': 75, 'category': books, 'status': 'active', 'is_featured': True, 'created_by': user},
            {'name': 'T-Shirt Blue', 'sku': 'TSB-004', 'price': 19.99, 'stock_quantity': 0, 'category': clothing, 'status': 'inactive', 'is_featured': False, 'created_by': user},
            {'name': 'Smartphone', 'sku': 'SPH-005', 'price': 699.99, 'stock_quantity': 25, 'category': electronics, 'status': 'active', 'is_featured': True, 'created_by': user},
        ]
        
        for prod_data in products_data:
            Product.objects.get_or_create(sku=prod_data['sku'], defaults=prod_data)
        
        return JsonResponse({'success': True, 'message': 'Sample data created successfully'})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


def advanced_demo_data(request):
    """Return demo data for advanced features grids."""
    demo_data = [
        {
            'id': 1,
            'name': 'Product Alpha',
            'price': 29.99,
            'stock': 150,
            'status': 'active',
            'category': 'Electronics',
            'progress': 85,
            'description': 'High-quality electronic device',
            'created_date': '2024-01-15'
        },
        {
            'id': 2,
            'name': 'Product Beta',
            'price': 19.50,
            'stock': 75,
            'status': 'inactive',
            'category': 'Books',
            'progress': 60,
            'description': 'Educational material',
            'created_date': '2024-01-20'
        },
        {
            'id': 3,
            'name': 'Product Gamma',
            'price': 45.00,
            'stock': 0,
            'status': 'pending',
            'category': 'Clothing',
            'progress': 30,
            'description': 'Fashion item',
            'created_date': '2024-01-25'
        },
        {
            'id': 4,
            'name': 'Product Delta',
            'price': 12.99,
            'stock': 200,
            'status': 'active',
            'category': 'Electronics',
            'progress': 95,
            'description': 'Accessories and parts',
            'created_date': '2024-02-01'
        },
        {
            'id': 5,
            'name': 'Product Epsilon',
            'price': 8.75,
            'stock': 25,
            'status': 'active',
            'category': 'Books',
            'progress': 70,
            'description': 'Reference material',
            'created_date': '2024-02-05'
        }
    ]
    
    # Handle jqGrid parameters
    page = int(request.GET.get('page', 1))
    rows = int(request.GET.get('rows', 10))
    sort_field = request.GET.get('sidx', 'id')
    sort_order = request.GET.get('sord', 'asc')
    
    # Simple sorting
    reverse = sort_order == 'desc'
    demo_data.sort(key=lambda x: x.get(sort_field, 0), reverse=reverse)
    
    # Pagination
    total_records = len(demo_data)
    total_pages = (total_records + rows - 1) // rows
    start = (page - 1) * rows
    end = start + rows
    page_data = demo_data[start:end]
    
    response = {
        'page': page,
        'total': total_pages,
        'records': total_records,
        'rows': page_data
    }
    
    return JsonResponse(response)