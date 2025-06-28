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

from .models import Category, Product, Customer, Order, OrderItem
from .serializers import (
    CategorySerializer, ProductSerializer, ProductListSerializer,
    CustomerSerializer, CustomerListSerializer, 
    OrderSerializer, OrderListSerializer
)


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
            }
        ]
    }
    return render(request, 'example/index.html', context)


def products_grid(request):
    """Products grid page."""
    context = {
        'title': 'Products Grid Example',
        'description': 'Comprehensive product management grid showcasing various field types and features.',
        'grid_id': 'productsGrid',
        'api_url': '/api/example/products/',
        'features': [
            'Multi-column sorting',
            'Advanced filtering',
            'Custom formatters',
            'Boolean field handling',
            'Foreign key relationships',
            'Status indicators'
        ]
    }
    return render(request, 'example/products_grid.html', context)


def customers_grid(request):
    """Customers grid page."""
    context = {
        'title': 'Customers Grid Example',
        'description': 'Customer management grid with search and relationship display.',
        'grid_id': 'customersGrid',
        'api_url': '/api/example/customers/',
        'features': [
            'Full-text search',
            'Address handling',
            'Customer type filtering',
            'Registration date sorting',
            'Order count display'
        ]
    }
    return render(request, 'example/customers_grid.html', context)


def orders_grid(request):
    """Orders grid page."""
    context = {
        'title': 'Orders Grid Example',
        'description': 'Order tracking grid with financial data and status management.',
        'grid_id': 'ordersGrid',
        'api_url': '/api/example/orders/',
        'features': [
            'Financial data formatting',
            'Status workflow',
            'Date range filtering',
            'Customer information',
            'Order tracking'
        ]
    }
    return render(request, 'example/orders_grid.html', context)


def categories_grid(request):
    """Categories grid page."""
    context = {
        'title': 'Categories Grid Example',
        'description': 'Simple category management grid demonstrating basic CRUD operations.',
        'grid_id': 'categoriesGrid',
        'api_url': '/api/example/categories/',
        'features': [
            'Basic CRUD operations',
            'Simple filtering',
            'Count relationships',
            'Active/inactive toggle'
        ]
    }
    return render(request, 'example/categories_grid.html', context)


def advanced_features(request):
    """Advanced features demonstration page."""
    context = {
        'title': 'Advanced jqGrid Features',
        'description': 'Demonstration of advanced jqGrid features and customizations.',
        'features': [
            'Custom button actions',
            'Conditional formatting',
            'Row highlighting',
            'Custom cell renderers',
            'Event handling',
            'Dynamic configuration'
        ]
    }
    return render(request, 'example/advanced_features.html', context)


# API ViewSets for jqGrid data
class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Category model demonstrating basic jqGrid integration.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['active']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']
    
    @action(detail=False, methods=['get'])
    def grid_config(self, request):
        """Return grid configuration for jqGrid."""
        config = {
            'caption': 'Categories',
            'colModel': [
                {
                    'name': 'id',
                    'index': 'id',
                    'width': 60,
                    'sortable': True,
                    'hidden': True,
                    'key': True
                },
                {
                    'name': 'name',
                    'index': 'name',
                    'width': 200,
                    'sortable': True,
                    'editable': True,
                    'editrules': {'required': True}
                },
                {
                    'name': 'description',
                    'index': 'description', 
                    'width': 300,
                    'sortable': False,
                    'editable': True,
                    'edittype': 'textarea'
                },
                {
                    'name': 'active',
                    'index': 'active',
                    'width': 80,
                    'sortable': True,
                    'editable': True,
                    'edittype': 'checkbox',
                    'formatter': 'checkbox'
                },
                {
                    'name': 'product_count',
                    'index': 'product_count',
                    'width': 100,
                    'sortable': False,
                    'editable': False,
                    'align': 'center'
                },
                {
                    'name': 'created_at',
                    'index': 'created_at',
                    'width': 120,
                    'sortable': True,
                    'editable': False,
                    'formatter': 'date',
                    'formatoptions': {'newformat': 'Y-m-d'}
                }
            ],
            'pager': True,
            'rowNum': 25,
            'sortname': 'name',
            'sortorder': 'asc',
            'viewrecords': True,
            'autowidth': True,
            'height': 400
        }
        return Response(config)


class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Product model demonstrating comprehensive jqGrid features.
    """
    queryset = Product.objects.select_related('category', 'created_by').all()
    
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
        """Return grid configuration for products jqGrid."""
        config = {
            'caption': 'Products',
            'colModel': [
                {
                    'name': 'id',
                    'index': 'id',
                    'width': 60,
                    'sortable': True,
                    'hidden': True,
                    'key': True
                },
                {
                    'name': 'name',
                    'index': 'name',
                    'width': 200,
                    'sortable': True,
                    'editable': True,
                    'editrules': {'required': True}
                },
                {
                    'name': 'sku',
                    'index': 'sku',
                    'width': 100,
                    'sortable': True,
                    'editable': True,
                    'editrules': {'required': True, 'unique': True}
                },
                {
                    'name': 'formatted_price',
                    'index': 'price',
                    'width': 100,
                    'sortable': True,
                    'align': 'right',
                    'editable': False
                },
                {
                    'name': 'stock_quantity',
                    'index': 'stock_quantity',
                    'width': 100,
                    'sortable': True,
                    'align': 'center',
                    'editable': True,
                    'editrules': {'number': True, 'minValue': 0}
                },
                {
                    'name': 'stock_status',
                    'index': 'stock_status',
                    'width': 100,
                    'sortable': False,
                    'align': 'center',
                    'editable': False,
                    'formatter': 'select',
                    'formatoptions': {
                        'value': 'Out of Stock:danger;Low Stock:warning;In Stock:success'
                    }
                },
                {
                    'name': 'status_display',
                    'index': 'status',
                    'width': 100,
                    'sortable': True,
                    'align': 'center',
                    'editable': False
                },
                {
                    'name': 'category_name',
                    'index': 'category__name',
                    'width': 120,
                    'sortable': True,
                    'editable': False
                },
                {
                    'name': 'is_featured',
                    'index': 'is_featured',
                    'width': 80,
                    'sortable': True,
                    'editable': True,
                    'edittype': 'checkbox',
                    'formatter': 'checkbox',
                    'align': 'center'
                }
            ],
            'pager': True,
            'rowNum': 25,
            'sortname': 'created_at',
            'sortorder': 'desc',
            'viewrecords': True,
            'autowidth': True,
            'height': 500,
            'multiselect': True,
            'rownumbers': True
        }
        return Response(config)


class CustomerViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Customer model demonstrating user management features.
    """
    queryset = Customer.objects.all()
    
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
        """Return grid configuration for customers jqGrid."""
        config = {
            'caption': 'Customers',
            'colModel': [
                {
                    'name': 'id',
                    'index': 'id',
                    'width': 60,
                    'sortable': True,
                    'hidden': True,
                    'key': True
                },
                {
                    'name': 'full_name',
                    'index': 'last_name',
                    'width': 150,
                    'sortable': True,
                    'editable': False
                },
                {
                    'name': 'email',
                    'index': 'email',
                    'width': 200,
                    'sortable': True,
                    'editable': True,
                    'editrules': {'required': True, 'email': True}
                },
                {
                    'name': 'phone',
                    'index': 'phone',
                    'width': 120,
                    'sortable': False,
                    'editable': True
                },
                {
                    'name': 'city',
                    'index': 'city',
                    'width': 100,
                    'sortable': True,
                    'editable': True
                },
                {
                    'name': 'state',
                    'index': 'state',
                    'width': 80,
                    'sortable': True,
                    'editable': True
                },
                {
                    'name': 'customer_type_display',
                    'index': 'customer_type',
                    'width': 100,
                    'sortable': True,
                    'align': 'center',
                    'editable': False
                },
                {
                    'name': 'is_active',
                    'index': 'is_active',
                    'width': 80,
                    'sortable': True,
                    'editable': True,
                    'edittype': 'checkbox',
                    'formatter': 'checkbox',
                    'align': 'center'
                },
                {
                    'name': 'order_count',
                    'index': 'order_count',
                    'width': 100,
                    'sortable': False,
                    'align': 'center',
                    'editable': False
                },
                {
                    'name': 'registration_date',
                    'index': 'registration_date',
                    'width': 120,
                    'sortable': True,
                    'editable': False,
                    'formatter': 'date',
                    'formatoptions': {'newformat': 'Y-m-d'}
                }
            ],
            'pager': True,
            'rowNum': 25,
            'sortname': 'last_name',
            'sortorder': 'asc',
            'viewrecords': True,
            'autowidth': True,
            'height': 450,
            'multiselect': True
        }
        return Response(config)


class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Order model demonstrating financial data and relationships.
    """
    queryset = Order.objects.select_related('customer').all()
    
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
        """Return grid configuration for orders jqGrid."""
        config = {
            'caption': 'Orders',
            'colModel': [
                {
                    'name': 'id',
                    'index': 'id',
                    'width': 60,
                    'sortable': True,
                    'hidden': True,
                    'key': True
                },
                {
                    'name': 'order_number',
                    'index': 'order_number',
                    'width': 120,
                    'sortable': True,
                    'editable': True,
                    'editrules': {'required': True}
                },
                {
                    'name': 'customer_name',
                    'index': 'customer__last_name',
                    'width': 150,
                    'sortable': True,
                    'editable': False
                },
                {
                    'name': 'status_display',
                    'index': 'status',
                    'width': 100,
                    'sortable': True,
                    'align': 'center',
                    'editable': False,
                    'formatter': 'select',
                    'formatoptions': {
                        'value': 'Pending:info;Processing:warning;Shipped:primary;Delivered:success;Cancelled:danger'
                    }
                },
                {
                    'name': 'order_date',
                    'index': 'order_date',
                    'width': 120,
                    'sortable': True,
                    'editable': False,
                    'formatter': 'date',
                    'formatoptions': {'newformat': 'Y-m-d H:i'}
                },
                {
                    'name': 'formatted_total',
                    'index': 'total_amount',
                    'width': 100,
                    'sortable': True,
                    'align': 'right',
                    'editable': False
                },
                {
                    'name': 'tracking_number',
                    'index': 'tracking_number',
                    'width': 150,
                    'sortable': False,
                    'editable': True
                }
            ],
            'pager': True,
            'rowNum': 25,
            'sortname': 'order_date',
            'sortorder': 'desc',
            'viewrecords': True,
            'autowidth': True,
            'height': 400,
            'multiselect': True
        }
        return Response(config)
    
    @action(detail=False, methods=['get'])
    def status_summary(self, request):
        """Get order status summary for dashboard."""
        from django.db.models import Count, Sum
        
        summary = Order.objects.values('status').annotate(
            count=Count('id'),
            total_value=Sum('total_amount')
        )
        
        return Response(list(summary))


# Utility views for demonstration
@action(detail=False, methods=['post'])
def create_sample_data(request):
    """Create sample data for demonstration."""
    try:
        from .models import create_sample_data
        create_sample_data()
        return JsonResponse({'success': True, 'message': 'Sample data created successfully'})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)