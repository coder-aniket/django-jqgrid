"""
Management command to load sample data for django-jqgrid examples.
"""
from django.core.management.base import BaseCommand
from django.db import transaction
from example.models import create_sample_data


class Command(BaseCommand):
    help = 'Load sample data for django-jqgrid example project'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before loading new sample data',
        )

    def handle(self, *args, **options):
        try:
            with transaction.atomic():
                if options['clear']:
                    self.stdout.write('Clearing existing data...')
                    self._clear_data()
                
                self.stdout.write('Loading sample data...')
                create_sample_data()
                
                # Display summary
                self._display_summary()
                
                self.stdout.write(
                    self.style.SUCCESS('Sample data loaded successfully!')
                )
                
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error loading sample data: {e}')
            )
            raise

    def _clear_data(self):
        """Clear existing data from the database."""
        from example.models import OrderItem, Order, Product, Customer, Category
        
        # Delete in correct order due to foreign keys
        OrderItem.objects.all().delete()
        Order.objects.all().delete()
        Product.objects.all().delete()
        Customer.objects.all().delete()
        Category.objects.all().delete()
        
        self.stdout.write('Existing data cleared.')

    def _display_summary(self):
        """Display summary of loaded data."""
        from example.models import Product, Customer, Order, Category
        
        self.stdout.write('\nData Summary:')
        self.stdout.write(f'  Categories: {Category.objects.count()}')
        self.stdout.write(f'  Products: {Product.objects.count()}')
        self.stdout.write(f'  Customers: {Customer.objects.count()}')
        self.stdout.write(f'  Orders: {Order.objects.count()}')