"""
URL configuration for the example app.
Demonstrates URL patterns for both template views and API endpoints.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router for API endpoints
router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'customers', views.CustomerViewSet)
router.register(r'orders', views.OrderViewSet)

app_name = 'example'

urlpatterns = [
    # Template views for displaying grids
    path('', views.index, name='index'),
    path('products/', views.products_grid, name='products'),
    path('customers/', views.customers_grid, name='customers'),
    path('orders/', views.orders_grid, name='orders'),
    path('categories/', views.categories_grid, name='categories'),
    path('advanced/', views.advanced_features, name='advanced'),
    
    # API endpoints for jqGrid data
    path('api/', include(router.urls)),
    
    # Utility endpoints
    path('api/create-sample-data/', views.create_sample_data, name='create_sample_data'),
]