"""
Admin configuration for example models.
Demonstrates Django admin integration alongside jqGrid usage.
"""

from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, Customer, Order, OrderItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin interface for Category model."""
    
    list_display = ['name', 'product_count', 'active', 'created_at']
    list_filter = ['active', 'created_at']
    search_fields = ['name', 'description']
    list_editable = ['active']
    ordering = ['name']
    
    def product_count(self, obj):
        """Display number of products in this category."""
        count = obj.products.count()
        return format_html('<span class="badge">{}</span>', count)
    product_count.short_description = 'Products'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """Admin interface for Product model."""
    
    list_display = [
        'name', 'sku', 'formatted_price', 'stock_quantity', 
        'stock_status_badge', 'status', 'category', 'is_featured'
    ]
    list_filter = ['status', 'category', 'is_featured', 'is_digital', 'created_at']
    search_fields = ['name', 'sku', 'description']
    list_editable = ['price', 'stock_quantity', 'status', 'is_featured']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'description', 'sku', 'category')
        }),
        ('Pricing & Inventory', {
            'fields': ('price', 'stock_quantity', 'weight')
        }),
        ('Status & Settings', {
            'fields': ('status', 'priority', 'is_featured', 'is_digital', 'requires_shipping')
        }),
        ('Dates', {
            'fields': ('launch_date', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_by',),
            'classes': ('collapse',)
        })
    )
    
    def formatted_price(self, obj):
        """Display formatted price."""
        return f"${obj.price:.2f}"
    formatted_price.short_description = 'Price'
    formatted_price.admin_order_field = 'price'
    
    def stock_status_badge(self, obj):
        """Display stock status with color coding."""
        if obj.stock_quantity == 0:
            color = 'red'
            status = 'Out of Stock'
        elif obj.stock_quantity < 10:
            color = 'orange'
            status = 'Low Stock'
        else:
            color = 'green'
            status = 'In Stock'
        
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            color, status
        )
    stock_status_badge.short_description = 'Stock Status'


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    """Admin interface for Customer model."""
    
    list_display = [
        'full_name', 'email', 'phone', 'city', 'state', 
        'customer_type', 'is_active', 'order_count', 'registration_date'
    ]
    list_filter = ['customer_type', 'is_active', 'city', 'state', 'registration_date']
    search_fields = ['first_name', 'last_name', 'email', 'phone']
    list_editable = ['is_active']
    ordering = ['last_name', 'first_name']
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('first_name', 'last_name', 'email', 'phone')
        }),
        ('Address', {
            'fields': ('address', 'city', 'state', 'zip_code', 'country')
        }),
        ('Customer Details', {
            'fields': ('customer_type', 'is_active', 'credit_limit')
        }),
        ('Timestamps', {
            'fields': ('registration_date', 'last_login'),
            'classes': ('collapse',)
        })
    )
    
    def order_count(self, obj):
        """Display number of orders for this customer."""
        count = obj.orders.count()
        return format_html('<span class="badge">{}</span>', count)
    order_count.short_description = 'Orders'


class OrderItemInline(admin.TabularInline):
    """Inline admin for order items."""
    model = OrderItem
    extra = 0
    readonly_fields = ['total_price']
    
    def get_readonly_fields(self, request, obj=None):
        """Make total_price readonly."""
        return self.readonly_fields


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """Admin interface for Order model."""
    
    list_display = [
        'order_number', 'customer', 'status_badge', 'order_date', 
        'formatted_total', 'item_count'
    ]
    list_filter = ['status', 'order_date', 'shipped_date']
    search_fields = ['order_number', 'customer__first_name', 'customer__last_name', 'tracking_number']
    list_editable = ['status']
    ordering = ['-order_date']
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Order Information', {
            'fields': ('order_number', 'customer', 'status')
        }),
        ('Financial Details', {
            'fields': ('subtotal', 'tax_amount', 'shipping_cost', 'total_amount')
        }),
        ('Dates', {
            'fields': ('order_date', 'shipped_date', 'delivery_date')
        }),
        ('Additional Information', {
            'fields': ('notes', 'tracking_number'),
            'classes': ('collapse',)
        })
    )
    
    def status_badge(self, obj):
        """Display status with color coding."""
        colors = {
            'pending': 'blue',
            'processing': 'orange',
            'shipped': 'purple',
            'delivered': 'green',
            'cancelled': 'red'
        }
        color = colors.get(obj.status, 'gray')
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            color, obj.get_status_display()
        )
    status_badge.short_description = 'Status'
    status_badge.admin_order_field = 'status'
    
    def formatted_total(self, obj):
        """Display formatted total amount."""
        return f"${obj.total_amount:.2f}"
    formatted_total.short_description = 'Total'
    formatted_total.admin_order_field = 'total_amount'
    
    def item_count(self, obj):
        """Display number of items in this order."""
        count = obj.items.count()
        return format_html('<span class="badge">{}</span>', count)
    item_count.short_description = 'Items'


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    """Admin interface for Order Items."""
    
    list_display = ['order', 'product', 'quantity', 'unit_price', 'total_price']
    list_filter = ['order__status', 'order__order_date']
    search_fields = ['order__order_number', 'product__name', 'product__sku']
    readonly_fields = ['total_price']
    ordering = ['-order__order_date']


# Admin site customization
admin.site.site_header = "Django jqGrid Example Admin"
admin.site.site_title = "Example Admin"
admin.site.index_title = "Welcome to Django jqGrid Examples"