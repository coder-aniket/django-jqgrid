"""
Example serializers demonstrating django_jqgrid integration with DRF.
These serializers showcase various field types and relationships.
"""

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Product, Customer, Order, OrderItem


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model - demonstrates basic serialization."""
    
    product_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'active', 'created_at', 'product_count']
        read_only_fields = ['created_at', 'product_count']
    
    def get_product_count(self, obj):
        """Calculate number of products in this category."""
        return obj.products.count()


class UserSerializer(serializers.ModelSerializer):
    """Simple user serializer for foreign key relationships."""
    
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'full_name']
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username


class ProductSerializer(serializers.ModelSerializer):
    """
    Comprehensive product serializer demonstrating various field types:
    - Basic fields
    - Choice fields with display values
    - Foreign key relationships
    - Calculated fields
    - Custom formatting
    """
    
    # Display values for choice fields
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    priority_display = serializers.CharField(source='get_priority_display', read_only=True)
    
    # Related field representations
    category_name = serializers.CharField(source='category.name', read_only=True)
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)
    
    # Calculated fields
    is_in_stock = serializers.BooleanField(read_only=True)
    stock_status = serializers.SerializerMethodField()
    formatted_price = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'sku', 'price', 'formatted_price',
            'stock_quantity', 'weight', 'status', 'status_display', 
            'priority', 'priority_display', 'is_featured', 'is_digital', 
            'requires_shipping', 'created_at', 'updated_at', 'launch_date',
            'category', 'category_name', 'created_by', 'created_by_name',
            'is_in_stock', 'stock_status'
        ]
        read_only_fields = ['created_at', 'updated_at', 'is_in_stock', 'stock_status']
    
    def get_stock_status(self, obj):
        """Calculate stock status for display."""
        if obj.stock_quantity == 0:
            return 'Out of Stock'
        elif obj.stock_quantity < 10:
            return 'Low Stock'
        else:
            return 'In Stock'
    
    def get_formatted_price(self, obj):
        """Format price for display."""
        return f"${obj.price:.2f}"


class CustomerSerializer(serializers.ModelSerializer):
    """
    Customer serializer demonstrating user-related data and address handling.
    """
    
    full_name = serializers.CharField(read_only=True)
    full_address = serializers.CharField(read_only=True)
    customer_type_display = serializers.CharField(source='get_customer_type_display', read_only=True)
    order_count = serializers.SerializerMethodField()
    formatted_credit_limit = serializers.SerializerMethodField()
    days_since_registration = serializers.SerializerMethodField()
    
    class Meta:
        model = Customer
        fields = [
            'id', 'first_name', 'last_name', 'full_name', 'email', 'phone',
            'address', 'city', 'state', 'zip_code', 'country', 'full_address',
            'customer_type', 'customer_type_display', 'is_active', 
            'registration_date', 'last_login', 'credit_limit', 'formatted_credit_limit',
            'order_count', 'days_since_registration'
        ]
        read_only_fields = ['registration_date', 'full_name', 'full_address', 'order_count']
    
    def get_order_count(self, obj):
        """Calculate number of orders for this customer."""
        return obj.orders.count()
    
    def get_formatted_credit_limit(self, obj):
        """Format credit limit for display."""
        return f"${obj.credit_limit:.2f}"
    
    def get_days_since_registration(self, obj):
        """Calculate days since registration."""
        from django.utils import timezone
        delta = timezone.now() - obj.registration_date
        return delta.days


class OrderItemSerializer(serializers.ModelSerializer):
    """Serializer for order items (nested in orders)."""
    
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_sku = serializers.CharField(source='product.sku', read_only=True)
    formatted_unit_price = serializers.SerializerMethodField()
    formatted_total_price = serializers.SerializerMethodField()
    
    class Meta:
        model = OrderItem
        fields = [
            'id', 'product', 'product_name', 'product_sku', 
            'quantity', 'unit_price', 'formatted_unit_price',
            'total_price', 'formatted_total_price'
        ]
        read_only_fields = ['total_price']
    
    def get_formatted_unit_price(self, obj):
        return f"${obj.unit_price:.2f}"
    
    def get_formatted_total_price(self, obj):
        return f"${obj.total_price:.2f}"


class OrderSerializer(serializers.ModelSerializer):
    """
    Comprehensive order serializer demonstrating:
    - Complex relationships
    - Nested serializers
    - Financial calculations
    - Date field handling
    """
    
    # Display values
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    customer_name = serializers.CharField(read_only=True)
    customer_email = serializers.CharField(source='customer.email', read_only=True)
    
    # Formatted financial fields
    formatted_subtotal = serializers.SerializerMethodField()
    formatted_tax_amount = serializers.SerializerMethodField()
    formatted_shipping_cost = serializers.SerializerMethodField()
    formatted_total_amount = serializers.SerializerMethodField()
    
    # Calculated fields
    item_count = serializers.SerializerMethodField()
    days_since_order = serializers.SerializerMethodField()
    
    # Nested items (optional - for detailed view)
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'customer', 'customer_name', 'customer_email',
            'status', 'status_display', 'order_date', 'shipped_date', 'delivery_date',
            'subtotal', 'formatted_subtotal', 'tax_amount', 'formatted_tax_amount',
            'shipping_cost', 'formatted_shipping_cost', 'total_amount', 'formatted_total_amount',
            'notes', 'tracking_number', 'item_count', 'days_since_order', 'items'
        ]
        read_only_fields = ['customer_name', 'item_count', 'days_since_order']
    
    def get_formatted_subtotal(self, obj):
        return f"${obj.subtotal:.2f}"
    
    def get_formatted_tax_amount(self, obj):
        return f"${obj.tax_amount:.2f}"
    
    def get_formatted_shipping_cost(self, obj):
        return f"${obj.shipping_cost:.2f}"
    
    def get_formatted_total_amount(self, obj):
        return f"${obj.total_amount:.2f}"
    
    def get_item_count(self, obj):
        """Calculate number of items in this order."""
        return obj.items.count()
    
    def get_days_since_order(self, obj):
        """Calculate days since order was placed."""
        from django.utils import timezone
        delta = timezone.now() - obj.order_date
        return delta.days


# Simplified serializers for basic grids (without nested data)
class ProductListSerializer(serializers.ModelSerializer):
    """Simplified product serializer for list views."""
    
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    formatted_price = serializers.SerializerMethodField()
    stock_status = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'sku', 'formatted_price', 'stock_quantity', 
            'stock_status', 'status_display', 'category_name', 'is_featured'
        ]
    
    def get_formatted_price(self, obj):
        return f"${obj.price:.2f}"
    
    def get_stock_status(self, obj):
        if obj.stock_quantity == 0:
            return 'Out of Stock'
        elif obj.stock_quantity < 10:
            return 'Low Stock'
        return 'In Stock'


class CustomerListSerializer(serializers.ModelSerializer):
    """Simplified customer serializer for list views."""
    
    full_name = serializers.CharField(read_only=True)
    customer_type_display = serializers.CharField(source='get_customer_type_display', read_only=True)
    order_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Customer
        fields = [
            'id', 'full_name', 'email', 'phone', 'city', 'state',
            'customer_type_display', 'is_active', 'registration_date', 'order_count'
        ]
    
    def get_order_count(self, obj):
        return obj.orders.count()


class OrderListSerializer(serializers.ModelSerializer):
    """Simplified order serializer for list views."""
    
    customer_name = serializers.CharField(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    formatted_total = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'customer_name', 'status_display',
            'order_date', 'formatted_total', 'tracking_number'
        ]
    
    def get_formatted_total(self, obj):
        return f"${obj.total_amount:.2f}"