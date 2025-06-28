"""
Example models demonstrating django_jqgrid functionality.
These models showcase various field types, relationships, and data patterns
commonly used with jqGrid.
"""

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone


class Category(models.Model):
    """Example category model for demonstrating foreign key relationships."""
    
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Product(models.Model):
    """
    Example product model showcasing various field types and features:
    - Text fields (CharField, TextField)
    - Numeric fields (DecimalField, IntegerField)  
    - Date fields (DateTimeField, DateField)
    - Boolean fields
    - Foreign key relationships
    - Choices
    """
    
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('discontinued', 'Discontinued'),
    ]
    
    PRIORITY_CHOICES = [
        (1, 'Low'),
        (2, 'Medium'), 
        (3, 'High'),
        (4, 'Critical'),
    ]
    
    # Basic fields
    name = models.CharField(max_length=200, help_text="Product name")
    description = models.TextField(blank=True, help_text="Product description")
    sku = models.CharField(max_length=50, unique=True, help_text="Stock Keeping Unit")
    
    # Numeric fields
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text="Product price"
    )
    stock_quantity = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)],
        help_text="Current stock quantity"
    )
    weight = models.FloatField(
        null=True, 
        blank=True,
        validators=[MinValueValidator(0)],
        help_text="Product weight in kg"
    )
    
    # Choice fields
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='draft',
        help_text="Product status"
    )
    priority = models.IntegerField(
        choices=PRIORITY_CHOICES, 
        default=2,
        help_text="Product priority level"
    )
    
    # Boolean fields
    is_featured = models.BooleanField(default=False, help_text="Featured product")
    is_digital = models.BooleanField(default=False, help_text="Digital product")
    requires_shipping = models.BooleanField(default=True, help_text="Requires shipping")
    
    # Date fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    launch_date = models.DateField(null=True, blank=True, help_text="Product launch date")
    
    # Relationships
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        related_name='products',
        help_text="Product category"
    )
    created_by = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='created_products',
        help_text="User who created this product"
    )
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['sku']),
            models.Index(fields=['status', 'category']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.name} ({self.sku})"
    
    @property
    def is_in_stock(self):
        """Helper property for grid display."""
        return self.stock_quantity > 0
    
    @property
    def status_display(self):
        """Helper property for better grid display."""
        return self.get_status_display()
    
    @property
    def priority_display(self):
        """Helper property for better grid display."""
        return self.get_priority_display()


class Customer(models.Model):
    """Example customer model for demonstrating user-related grids."""
    
    CUSTOMER_TYPE_CHOICES = [
        ('individual', 'Individual'),
        ('business', 'Business'),
    ]
    
    # Basic information
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    
    # Address information
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    zip_code = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, default='USA')
    
    # Customer details
    customer_type = models.CharField(
        max_length=20, 
        choices=CUSTOMER_TYPE_CHOICES, 
        default='individual'
    )
    is_active = models.BooleanField(default=True)
    registration_date = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    
    # Financial information
    credit_limit = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=0,
        validators=[MinValueValidator(0)]
    )
    
    class Meta:
        ordering = ['last_name', 'first_name']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['last_name', 'first_name']),
        ]
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    @property
    def full_name(self):
        """Helper property for grid display."""
        return f"{self.first_name} {self.last_name}"
    
    @property
    def full_address(self):
        """Helper property for grid display."""
        parts = [self.address, self.city, self.state, self.zip_code]
        return ", ".join(part for part in parts if part)


class Order(models.Model):
    """Example order model demonstrating complex relationships and calculations."""
    
    ORDER_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    # Order identification
    order_number = models.CharField(max_length=50, unique=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    
    # Order details
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='pending')
    order_date = models.DateTimeField(default=timezone.now)
    shipped_date = models.DateTimeField(null=True, blank=True)
    delivery_date = models.DateTimeField(null=True, blank=True)
    
    # Financial fields
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Additional information
    notes = models.TextField(blank=True)
    tracking_number = models.CharField(max_length=100, blank=True)
    
    class Meta:
        ordering = ['-order_date']
        indexes = [
            models.Index(fields=['order_number']),
            models.Index(fields=['status', 'order_date']),
        ]
    
    def __str__(self):
        return f"Order {self.order_number}"
    
    @property
    def status_display(self):
        """Helper property for better grid display."""
        return self.get_status_display()
    
    @property
    def customer_name(self):
        """Helper property for grid display."""
        return self.customer.full_name if self.customer else ""


class OrderItem(models.Model):
    """Example order item model for demonstrating nested relationships."""
    
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        unique_together = ['order', 'product']
        indexes = [
            models.Index(fields=['order', 'product']),
        ]
    
    def __str__(self):
        return f"{self.product.name} x {self.quantity}"
    
    def save(self, *args, **kwargs):
        """Auto-calculate total price."""
        self.total_price = self.quantity * self.unit_price
        super().save(*args, **kwargs)


# Sample data creation helper
def create_sample_data():
    """
    Helper function to create sample data for demonstration.
    This can be called from Django management commands or admin.
    """
    from django.contrib.auth.models import User
    import random
    from decimal import Decimal
    
    # Create categories
    categories_data = [
        {'name': 'Electronics', 'description': 'Electronic devices and accessories'},
        {'name': 'Clothing', 'description': 'Apparel and fashion items'},
        {'name': 'Books', 'description': 'Books and educational materials'},
        {'name': 'Home & Garden', 'description': 'Home improvement and gardening'},
        {'name': 'Sports', 'description': 'Sports equipment and accessories'},
    ]
    
    categories = []
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            name=cat_data['name'],
            defaults={'description': cat_data['description']}
        )
        categories.append(category)
    
    # Create a sample user if none exists
    user, created = User.objects.get_or_create(
        username='demo_user',
        defaults={
            'first_name': 'Demo',
            'last_name': 'User',
            'email': 'demo@example.com'
        }
    )
    
    # Create sample products
    product_names = [
        'Wireless Headphones', 'Cotton T-Shirt', 'Python Programming Book',
        'Garden Hose', 'Tennis Racket', 'Smartphone', 'Jeans', 'Cookbook',
        'Plant Pot', 'Basketball', 'Laptop', 'Dress', 'Novel',
        'Lawn Mower', 'Soccer Ball'
    ]
    
    for i, name in enumerate(product_names):
        Product.objects.get_or_create(
            sku=f'SKU{i+1:03d}',
            defaults={
                'name': name,
                'description': f'High quality {name.lower()}',
                'price': Decimal(str(random.randint(10, 500))),
                'stock_quantity': random.randint(0, 100),
                'weight': random.uniform(0.1, 10.0),
                'status': random.choice(['draft', 'active', 'discontinued']),
                'priority': random.randint(1, 4),
                'is_featured': random.choice([True, False]),
                'is_digital': random.choice([True, False]),
                'category': random.choice(categories),
                'created_by': user,
            }
        )
    
    # Create sample customers
    customer_data = [
        {'first_name': 'John', 'last_name': 'Doe', 'email': 'john.doe@example.com'},
        {'first_name': 'Jane', 'last_name': 'Smith', 'email': 'jane.smith@example.com'},
        {'first_name': 'Bob', 'last_name': 'Johnson', 'email': 'bob.johnson@example.com'},
        {'first_name': 'Alice', 'last_name': 'Brown', 'email': 'alice.brown@example.com'},
        {'first_name': 'Charlie', 'last_name': 'Davis', 'email': 'charlie.davis@example.com'},
    ]
    
    customers = []
    for cust_data in customer_data:
        customer, created = Customer.objects.get_or_create(
            email=cust_data['email'],
            defaults={
                **cust_data,
                'phone': f'+1-555-{random.randint(100, 999)}-{random.randint(1000, 9999)}',
                'address': f'{random.randint(100, 999)} Main St',
                'city': random.choice(['New York', 'Los Angeles', 'Chicago', 'Houston']),
                'state': random.choice(['NY', 'CA', 'IL', 'TX']),
                'zip_code': f'{random.randint(10000, 99999)}',
                'customer_type': random.choice(['individual', 'business']),
                'credit_limit': Decimal(str(random.randint(1000, 10000))),
            }
        )
        customers.append(customer)
    
    print(f"Created sample data: {len(categories)} categories, {Product.objects.count()} products, {len(customers)} customers")