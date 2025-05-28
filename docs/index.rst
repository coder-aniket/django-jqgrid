.. django-jqgrid documentation master file

Welcome to django-jqgrid documentation!
=======================================

django-jqgrid is a Django application that simplifies the integration of jqGrid into Django projects. It provides a set of tools, mixins, and utilities to create powerful data grids with minimal configuration.

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   introduction
   installation
   quickstart
   configuration
   api/index
   examples
   changelog

Features
--------

* **Easy Integration**: Simple integration with Django models and views
* **REST API Support**: Built-in REST API endpoints using Django REST Framework
* **Flexible Configuration**: Highly customizable grid options
* **Performance Optimized**: Built-in query optimization and caching
* **Import/Export**: Support for data import and export in various formats
* **Advanced Filtering**: Powerful filtering and search capabilities
* **Responsive Design**: Mobile-friendly grid layouts

Quick Example
-------------

.. code-block:: python

    from django_jqgrid.mixins import JqGridMixin
    from django.views.generic import ListView
    from .models import Product

    class ProductGridView(JqGridMixin, ListView):
        model = Product
        template_name = 'products/grid.html'
        
        jqgrid_config = {
            'colModel': [
                {'name': 'id', 'label': 'ID', 'width': 50},
                {'name': 'name', 'label': 'Product Name'},
                {'name': 'price', 'label': 'Price', 'formatter': 'currency'},
                {'name': 'stock', 'label': 'Stock', 'align': 'center'},
            ],
            'sortname': 'name',
            'caption': 'Product Inventory',
        }

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`