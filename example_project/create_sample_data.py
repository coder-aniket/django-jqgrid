#!/usr/bin/env python
"""
Create sample data for the django-jqgrid example project.
Run this script to populate the database with test data.
"""

import os
import sys
import django
from datetime import datetime, timedelta
from decimal import Decimal
import random

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'example_project.settings')
django.setup()

from django.contrib.auth.models import User
from example.models import Category, Product, Customer, Order, OrderItem


def create_users():
    """Create admin and sample users."""
    print("Creating users...")
    
    # Create superuser if it doesn't exist
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='admin123',
            first_name='Admin',
            last_name='User'
        )
        print("Created admin user (username: admin, password: admin123)")
    
    # Create sample staff users
    staff_users = [
        ('john.doe', 'John', 'Doe', 'john@example.com'),
        ('jane.smith', 'Jane', 'Smith', 'jane@example.com'),
        ('bob.wilson', 'Bob', 'Wilson', 'bob@example.com'),
    ]
    
    for username, first_name, last_name, email in staff_users:
        if not User.objects.filter(username=username).exists():
            User.objects.create_user(
                username=username,
                email=email,
                password='password123',
                first_name=first_name,
                last_name=last_name,
                is_staff=True
            )
    
    print(f"Created {len(staff_users)} staff users")


def create_categories():
    """Create sample categories."""
    print("Creating categories...")
    
    categories_data = [
        {
            'name': 'Electronics',
            'description': 'Electronic devices, gadgets, and accessories',
            'active': True
        },
        {
            'name': 'Computers & Laptops',
            'description': 'Desktop computers, laptops, and computer accessories',
            'active': True
        },
        {
            'name': 'Smartphones & Tablets',
            'description': 'Mobile phones, tablets, and mobile accessories',
            'active': True
        },
        {
            'name': 'Books',
            'description': 'Physical and digital books, educational materials',
            'active': True
        },
        {
            'name': 'Programming Books',
            'description': 'Programming, software development, and technical books',
            'active': True
        },
        {
            'name': 'Fiction Books',
            'description': 'Novels, stories, and fictional literature',
            'active': True
        },
        {
            'name': 'Clothing',
            'description': 'Apparel, fashion items, and accessories',
            'active': True
        },
        {
            'name': 'Men\'s Clothing',
            'description': 'Clothing and accessories for men',
            'active': True
        },
        {
            'name': 'Women\'s Clothing',
            'description': 'Clothing and accessories for women',
            'active': True
        },
        {
            'name': 'Home & Garden',
            'description': 'Home improvement, furniture, and garden supplies',
            'active': False  # Inactive category for testing
        }
    ]
    
    created_categories = []
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            name=cat_data['name'],
            defaults=cat_data
        )
        if created:
            created_categories.append(category)
    
    print(f"Created {len(created_categories)} categories")
    return Category.objects.all()


def create_products(categories):
    """Create sample products."""
    print("Creating products...")
    
    # Get a user for created_by field
    user = User.objects.first()
    
    electronics = categories.filter(name='Electronics').first()
    computers = categories.filter(name='Computers & Laptops').first()
    smartphones = categories.filter(name='Smartphones & Tablets').first()
    books = categories.filter(name='Books').first()
    programming_books = categories.filter(name='Programming Books').first()
    fiction_books = categories.filter(name='Fiction Books').first()
    clothing = categories.filter(name='Clothing').first()
    mens_clothing = categories.filter(name='Men\'s Clothing').first()
    womens_clothing = categories.filter(name='Women\'s Clothing').first()
    
    products_data = [
        # Electronics
        {
            'name': 'MacBook Pro 16-inch',
            'sku': 'MBP-16-001',
            'description': 'High-performance laptop for professionals',
            'price': Decimal('2499.99'),
            'stock_quantity': 25,
            'category': computers,
            'status': 'active',
            'is_featured': True,
            'is_digital': False,
            'created_by': user
        },
        {
            'name': 'Dell XPS 13',
            'sku': 'XPS-13-002',
            'description': 'Ultrabook with premium design',
            'price': Decimal('1299.99'),
            'stock_quantity': 40,
            'category': computers,
            'status': 'active',
            'is_featured': True,
            'is_digital': False,
            'created_by': user
        },
        {
            'name': 'iPhone 15 Pro',
            'sku': 'IPH-15P-003',
            'description': 'Latest flagship smartphone from Apple',
            'price': Decimal('999.99'),
            'stock_quantity': 60,
            'category': smartphones,
            'status': 'active',
            'is_featured': True,
            'is_digital': False,
            'created_by': user
        },
        {
            'name': 'Samsung Galaxy S24',
            'sku': 'SGS-24-004',
            'description': 'Premium Android smartphone',
            'price': Decimal('899.99'),
            'stock_quantity': 35,
            'category': smartphones,
            'status': 'active',
            'is_featured': False,
            'is_digital': False,
            'created_by': user
        },
        {
            'name': 'Wireless Mouse',
            'sku': 'WMS-001',
            'description': 'Ergonomic wireless mouse',
            'price': Decimal('29.99'),
            'stock_quantity': 150,
            'category': electronics,
            'status': 'active',
            'is_featured': False,
            'is_digital': False,
            'created_by': user
        },
        {
            'name': 'Mechanical Keyboard',
            'sku': 'MKB-002',
            'description': 'RGB mechanical gaming keyboard',
            'price': Decimal('129.99'),
            'stock_quantity': 75,
            'category': electronics,
            'status': 'active',
            'is_featured': False,
            'is_digital': False,
            'created_by': user
        },
        
        # Books
        {
            'name': 'Python Programming Cookbook',
            'sku': 'PYC-001',
            'description': 'Comprehensive guide to Python programming',
            'price': Decimal('49.99'),
            'stock_quantity': 100,
            'category': programming_books,
            'status': 'active',
            'is_featured': True,
            'is_digital': True,
            'created_by': user
        },
        {
            'name': 'JavaScript: The Good Parts',
            'sku': 'JSG-002',
            'description': 'Essential JavaScript programming concepts',
            'price': Decimal('39.99'),
            'stock_quantity': 80,
            'category': programming_books,
            'status': 'active',
            'is_featured': False,
            'is_digital': True,
            'created_by': user
        },
        {
            'name': 'Clean Code',
            'sku': 'CCO-003',
            'description': 'A handbook of agile software craftsmanship',
            'price': Decimal('45.99'),
            'stock_quantity': 90,
            'category': programming_books,
            'status': 'active',
            'is_featured': True,
            'is_digital': False,
            'created_by': user
        },
        {
            'name': 'The Great Gatsby',
            'sku': 'TGG-004',
            'description': 'Classic American novel',
            'price': Decimal('12.99'),
            'stock_quantity': 200,
            'category': fiction_books,
            'status': 'active',
            'is_featured': False,
            'is_digital': True,
            'created_by': user
        },
        {
            'name': '1984',
            'sku': '1984-005',
            'description': 'Dystopian social science fiction novel',
            'price': Decimal('14.99'),
            'stock_quantity': 180,
            'category': fiction_books,
            'status': 'active',
            'is_featured': True,
            'is_digital': False,
            'created_by': user
        },
        
        # Clothing
        {
            'name': 'Premium Cotton T-Shirt',
            'sku': 'PCT-001',
            'description': '100% organic cotton comfortable t-shirt',
            'price': Decimal('24.99'),
            'stock_quantity': 0,  # Out of stock for testing
            'category': mens_clothing,
            'status': 'active',
            'is_featured': False,
            'is_digital': False,
            'created_by': user
        },
        {
            'name': 'Classic Jeans',
            'sku': 'CJE-002',
            'description': 'Classic fit denim jeans',
            'price': Decimal('79.99'),
            'stock_quantity': 5,  # Low stock for testing
            'category': mens_clothing,
            'status': 'active',
            'is_featured': False,
            'is_digital': False,
            'created_by': user
        },
        {
            'name': 'Summer Dress',
            'sku': 'SUD-003',
            'description': 'Light and comfortable summer dress',
            'price': Decimal('59.99'),
            'stock_quantity': 30,
            'category': womens_clothing,
            'status': 'active',
            'is_featured': True,
            'is_digital': False,
            'created_by': user
        },
        {
            'name': 'Winter Jacket',
            'sku': 'WJA-004',
            'description': 'Warm winter jacket for cold weather',
            'price': Decimal('149.99'),
            'stock_quantity': 20,
            'category': clothing,
            'status': 'inactive',  # Inactive for testing
            'is_featured': False,
            'is_digital': False,
            'created_by': user
        },
        {
            'name': 'Draft Product',
            'sku': 'DRA-005',
            'description': 'This is a draft product for testing',
            'price': Decimal('99.99'),
            'stock_quantity': 0,
            'category': electronics,
            'status': 'draft',  # Draft status for testing
            'is_featured': False,
            'is_digital': False,
            'created_by': user
        }
    ]
    
    created_products = []
    for prod_data in products_data:
        product, created = Product.objects.get_or_create(
            sku=prod_data['sku'],
            defaults=prod_data
        )
        if created:
            created_products.append(product)
    
    print(f"Created {len(created_products)} products")
    return Product.objects.all()


def create_customers():
    """Create sample customers."""
    print("Creating customers...")
    
    customers_data = [
        {
            'first_name': 'Alice',
            'last_name': 'Johnson',
            'email': 'alice.johnson@email.com',
            'phone': '+1-555-0101',
            'customer_type': 'individual',
            'is_active': True,
            'credit_limit': Decimal('5000.00'),
            'address': '123 Main St',
            'city': 'New York',
            'state': 'NY',
            'zip_code': '10001',
            'country': 'US'
        },
        {
            'first_name': 'Bob',
            'last_name': 'Smith',
            'email': 'bob.smith@email.com',
            'phone': '+1-555-0102',
            'customer_type': 'business',
            'is_active': True,
            'credit_limit': Decimal('25000.00'),
            'address': '456 Business Ave',
            'city': 'Los Angeles',
            'state': 'CA',
            'zip_code': '90210',
            'country': 'US'
        },
        {
            'first_name': 'Carol',
            'last_name': 'Davis',
            'email': 'carol.davis@email.com',
            'phone': '+1-555-0103',
            'customer_type': 'vip',
            'is_active': True,
            'credit_limit': Decimal('10000.00'),
            'address': '789 VIP Lane',
            'city': 'Miami',
            'state': 'FL',
            'zip_code': '33101',
            'country': 'US'
        },
        {
            'first_name': 'David',
            'last_name': 'Wilson',
            'email': 'david.wilson@email.com',
            'phone': '+1-555-0104',
            'customer_type': 'individual',
            'is_active': False,  # Inactive for testing
            'credit_limit': Decimal('2000.00'),
            'address': '321 Inactive St',
            'city': 'Chicago',
            'state': 'IL',
            'zip_code': '60601',
            'country': 'US'
        },
        {
            'first_name': 'Emma',
            'last_name': 'Brown',
            'email': 'emma.brown@email.com',
            'phone': '+1-555-0105',
            'customer_type': 'individual',
            'is_active': True,
            'credit_limit': Decimal('3000.00'),
            'address': '654 Customer Rd',
            'city': 'Seattle',
            'state': 'WA',
            'zip_code': '98101',
            'country': 'US'
        },
        {
            'first_name': 'Frank',
            'last_name': 'Miller',
            'email': 'frank.miller@email.com',
            'phone': '+1-555-0106',
            'customer_type': 'business',
            'is_active': True,
            'credit_limit': Decimal('15000.00'),
            'address': '987 Corporate Blvd',
            'city': 'Austin',
            'state': 'TX',
            'zip_code': '73301',
            'country': 'US'
        }
    ]
    
    created_customers = []
    for cust_data in customers_data:
        customer, created = Customer.objects.get_or_create(
            email=cust_data['email'],
            defaults=cust_data
        )
        if created:
            created_customers.append(customer)
    
    print(f"Created {len(created_customers)} customers")
    return Customer.objects.all()


def create_orders(customers, products):
    """Create sample orders."""
    print("Creating orders...")
    
    orders_data = []
    order_statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    payment_methods = ['credit_card', 'paypal', 'bank_transfer']
    payment_statuses = ['pending', 'paid', 'failed']
    
    # Create orders for each customer
    for i, customer in enumerate(customers[:5]):  # Create orders for first 5 customers
        num_orders = random.randint(1, 4)
        
        for j in range(num_orders):
            order_date = datetime.now() - timedelta(days=random.randint(1, 365))
            status = random.choice(order_statuses)
            
            # Shipped and delivered orders should have shipped_date
            shipped_date = None
            if status in ['shipped', 'delivered']:
                shipped_date = order_date + timedelta(days=random.randint(1, 7))
            
            order_data = {
                'order_number': f'ORD-{2024}-{str(i*100 + j + 1).zfill(6)}',
                'customer': customer,
                'order_date': order_date,
                'status': status,
                'tracking_number': f'TRK{random.randint(100000, 999999)}' if status in ['shipped', 'delivered'] else '',
                'shipped_date': shipped_date,
                'notes': f'Order for {customer.first_name} {customer.last_name}'
            }
            orders_data.append(order_data)
    
    created_orders = []
    for order_data in orders_data:
        order, created = Order.objects.get_or_create(
            order_number=order_data['order_number'],
            defaults=order_data
        )
        if created:
            created_orders.append(order)
    
    # Create order items for each order
    for order in created_orders:
        num_items = random.randint(1, 5)
        selected_products = random.sample(list(products[:10]), min(num_items, 10))
        
        subtotal = Decimal('0.00')
        
        for product in selected_products:
            quantity = random.randint(1, 3)
            unit_price = product.price
            line_total = unit_price * quantity
            
            OrderItem.objects.get_or_create(
                order=order,
                product=product,
                defaults={
                    'quantity': quantity,
                    'unit_price': unit_price,
                    'total_price': line_total
                }
            )
            
            subtotal += line_total
        
        # Update order totals
        tax_rate = Decimal('0.08')  # 8% tax
        shipping_cost = Decimal('9.99') if subtotal < 100 else Decimal('0.00')  # Free shipping over $100
        
        order.subtotal = subtotal
        order.tax_amount = subtotal * tax_rate
        order.shipping_cost = shipping_cost
        order.total_amount = subtotal + order.tax_amount + shipping_cost
        order.save()
    
    print(f"Created {len(created_orders)} orders")
    return Order.objects.all()


def update_customer_statistics(customers):
    """Update customer statistics based on orders."""
    print("Updating customer statistics...")
    
    for customer in customers:
        orders = Order.objects.filter(customer=customer)
        
        if orders.exists():
            customer.last_order_date = orders.latest('order_date').order_date
            customer.order_count = orders.count()
            customer.save()


def main():
    """Main function to create all sample data."""
    print("Creating sample data for django-jqgrid example project...")
    print("=" * 60)
    
    try:
        # Create data in order of dependencies
        create_users()
        categories = create_categories()
        products = create_products(categories)
        customers = create_customers()
        orders = create_orders(customers, products)
        update_customer_statistics(customers)
        
        print("=" * 60)
        print("Sample data creation completed successfully!")
        print(f"Created:")
        print(f"  - {User.objects.count()} users")
        print(f"  - {Category.objects.count()} categories")
        print(f"  - {Product.objects.count()} products")
        print(f"  - {Customer.objects.count()} customers")
        print(f"  - {Order.objects.count()} orders")
        print(f"  - {OrderItem.objects.count()} order items")
        print()
        print("You can now access the admin interface with:")
        print("  Username: admin")
        print("  Password: admin123")
        
    except Exception as e:
        print(f"Error creating sample data: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()