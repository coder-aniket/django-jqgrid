from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class JqGridPagination(PageNumberPagination):
    """
    Custom pagination class for jqGrid compatibility.

    This class handles pagination parameters from jqGrid requests and formats
    the response in a way that jqGrid expects.

    Parameters:
    - page_query_param: The query parameter used for the page number (default: 'page')
    - page_size_query_param: The query parameter used for page size (default: 'rows')
    - page_size: Default page size to use if not specified (default: 25)
    - max_page_size: Maximum allowed page size (default: 1000)

    Returns:
    A response with the following structure:
    {
        'page': current_page,
        'total_pages': total_pages,
        'itemsCount': total_count_of_items,
        'data': serialized_data
    }
    """
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    page_size = 25
    max_page_size = 5000

    def get_paginated_response(self, data):
        """
        Format the paginated response in jqGrid compatible format.
        """
        return Response({
            'page': self.page.number,
            'total_pages': self.page.paginator.num_pages,
            'itemsCount': self.page.paginator.count,
            'userdata': {},
            'data': data
        })

    def get_paginated_response_schema(self, schema):
        """
        Define the schema for pagination responses.
        This is used for API documentation (OpenAPI schema).
        """
        return {
            'type': 'object',
            'properties': {
                'data': {
                    'type': 'object',
                    'properties': {
                        'page': {
                            'type': 'integer',
                            'example': 1,
                            'description': 'Current page number'
                        },
                        'total_pages': {
                            'type': 'integer',
                            'example': 10,
                            'description': 'Total number of pages'
                        },
                        'itemsCount': {
                            'type': 'integer',
                            'example': 250,
                            'description': 'Total number of items across all pages'
                        },
                        'data': schema,
                    }
                }
            }
        }