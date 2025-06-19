"""
Context processors for django-jqgrid
Provides security configuration and other context variables to templates
"""

from django.conf import settings


def jqgrid_security(request):
    """
    Provides jqGrid security configuration to templates
    """
    # Get security configuration from Django settings
    security_config = getattr(settings, 'JQGRID_SECURITY_CONFIG', {})
    
    # Default security configuration
    default_config = {
        'auth_method': 'session',
        'csrf_enabled': True,
        'csrf_token_name': 'csrftoken',
        'csrf_header_name': 'X-CSRFToken',
        'token_enabled': False,
        'token_type': 'Bearer',
        'token_header_name': 'Authorization',
        'token_key': 'auth_token',
        'token_storage': 'localStorage',
        'jwt_enabled': False,
        'jwt_header_name': 'Authorization',
        'jwt_token_key': 'jwt_token',
        'jwt_storage': 'localStorage',
        'jwt_refresh_key': 'refresh_token',
        'jwt_auto_refresh': True,
        'jwt_refresh_endpoint': '/api/auth/refresh/',
        'session_enabled': True,
        'session_check_endpoint': '/api/auth/check/',
        'login_redirect': '/login/',
        'session_auto_check': False,
        'session_check_interval': 300000,  # 5 minutes
    }
    
    # Merge with user configuration
    config = {**default_config, **security_config}
    
    # Auto-detect authentication method based on Django settings
    if config['auth_method'] == 'auto':
        if 'rest_framework_simplejwt' in settings.INSTALLED_APPS:
            config['auth_method'] = 'jwt'
            config['jwt_enabled'] = True
        elif 'rest_framework.authtoken' in settings.INSTALLED_APPS:
            config['auth_method'] = 'token'
            config['token_enabled'] = True
        else:
            config['auth_method'] = 'session'
    
    # Enable appropriate authentication method
    if config['auth_method'] == 'jwt':
        config['jwt_enabled'] = True
    elif config['auth_method'] == 'token':
        config['token_enabled'] = True
    
    return {
        'jqgrid_security': config
    }


def jqgrid_config(request):
    """
    Provides general jqGrid configuration to templates
    """
    jqgrid_config = getattr(settings, 'JQGRID_CONFIG', {})
    
    default_config = {
        'default_rows_per_page': 25,
        'enable_excel_export': True,
        'enable_csv_export': True,
        'enable_filtering': True,
        'enable_crud_operations': True,
        'theme': 'bootstrap4',
        'icon_set': 'fontawesome',
    }
    
    config = {**default_config, **jqgrid_config}
    
    return {
        'jqgrid_config': config
    }