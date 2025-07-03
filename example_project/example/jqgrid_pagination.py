"""
Custom pagination for jqGrid compatibility
"""
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class JqGridPagination(PageNumberPagination):
    """
    Custom pagination class that returns data in jqGrid expected format.
    
    jqGrid expects:
    {
        "rows": [...],      # Array of data
        "page": 1,          # Current page
        "total": 10,        # Total pages
        "records": 100      # Total records
    }
    """
    page_size = 25
    page_size_query_param = 'rows'  # jqGrid sends 'rows' instead of 'page_size'
    page_query_param = 'page'
    max_page_size = 1000

    def get_paginated_response(self, data):
        """Return response in jqGrid format"""
        return Response({
            'rows': data,  # jqGrid expects 'rows' not 'results'
            'page': self.page.number,
            'total': self.page.paginator.num_pages,
            'records': self.page.paginator.count
        })