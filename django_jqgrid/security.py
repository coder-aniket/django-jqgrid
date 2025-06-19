"""
Security utilities and settings for django-jqgrid
Provides security configuration and authentication helpers
"""

from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.permissions import BasePermission
import logging

logger = logging.getLogger(__name__)

User = get_user_model()


class JQGridSecurityConfig:
    """
    Security configuration class for JQGrid
    Provides centralized security settings and utilities
    """
    
    def __init__(self):
        self.config = self.get_security_config()
    
    def get_security_config(self):
        """Get security configuration from Django settings"""
        return getattr(settings, 'JQGRID_SECURITY_CONFIG', {
            # Authentication method: 'session', 'token', 'jwt', 'auto'
            'auth_method': 'session',
            
            # CSRF protection settings
            'csrf_enabled': True,
            'csrf_token_name': 'csrftoken',
            'csrf_header_name': 'X-CSRFToken',
            
            # Token authentication settings
            'token_enabled': False,
            'token_type': 'Bearer',  # 'Bearer', 'Token', 'API-Key'
            'token_header_name': 'Authorization',
            'token_key': 'auth_token',
            'token_storage': 'localStorage',  # 'localStorage', 'sessionStorage', 'cookie'
            
            # JWT settings
            'jwt_enabled': False,
            'jwt_header_name': 'Authorization',
            'jwt_token_key': 'jwt_token',
            'jwt_storage': 'localStorage',
            'jwt_refresh_key': 'refresh_token',
            'jwt_auto_refresh': True,
            'jwt_refresh_endpoint': '/api/auth/refresh/',
            
            # Session management
            'session_enabled': True,
            'session_check_endpoint': '/api/auth/check/',
            'login_redirect': '/login/',
            'session_auto_check': False,
            'session_check_interval': 300000,  # 5 minutes
            
            # Security features
            'require_authentication': True,
            'field_level_permissions': True,
            'audit_log_enabled': False,
            'rate_limiting_enabled': False,
            
            # Custom headers
            'custom_headers': {
                'X-API-Version': '1.0',
                'X-Client-Type': 'jqgrid'
            }
        })
    
    def get_auth_method(self):
        """Get the authentication method, auto-detecting if needed"""
        auth_method = self.config.get('auth_method', 'session')
        
        if auth_method == 'auto':
            # Auto-detect based on installed apps
            if 'rest_framework_simplejwt' in settings.INSTALLED_APPS:
                return 'jwt'
            elif 'rest_framework.authtoken' in settings.INSTALLED_APPS:
                return 'token'
            else:
                return 'session'
        
        return auth_method
    
    def is_csrf_enabled(self):
        """Check if CSRF protection is enabled"""
        return self.config.get('csrf_enabled', True)
    
    def is_token_auth_enabled(self):
        """Check if token authentication is enabled"""
        auth_method = self.get_auth_method()
        return auth_method in ['token', 'jwt'] or self.config.get('token_enabled', False)
    
    def get_token_header_name(self):
        """Get the token header name"""
        return self.config.get('token_header_name', 'Authorization')
    
    def get_custom_headers(self):
        """Get custom headers to include in requests"""
        return self.config.get('custom_headers', {})


class JQGridPermission(BasePermission):
    """
    Custom permission class for JQGrid operations
    """
    
    def has_permission(self, request, view):
        """Check if user has permission to access the grid"""
        security_config = JQGridSecurityConfig()
        
        # If authentication not required, allow access
        if not security_config.config.get('require_authentication', True):
            return True
        
        # Check if user is authenticated
        if not request.user.is_authenticated:
            return False
        
        # Additional permission checks can be added here
        return True
    
    def has_object_permission(self, request, view, obj):
        """Check if user has permission to access specific object"""
        # Basic permission check
        if not request.user.is_authenticated:
            return False
        
        # Add custom object-level permission logic here
        return True


class JQGridFieldPermission:
    """
    Field-level permission checker for JQGrid
    """
    
    def __init__(self, user, model):
        self.user = user
        self.model = model
        self.app_label = model._meta.app_label
        self.model_name = model._meta.model_name
    
    def can_view_field(self, field_name):
        """Check if user can view a specific field"""
        permission_name = f"{self.app_label}.view_{self.model_name}_{field_name}"
        
        # Check for specific field permission
        if self.user.has_perm(permission_name):
            return True
        
        # Check for general view permission
        general_permission = f"{self.app_label}.view_{self.model_name}"
        return self.user.has_perm(general_permission)
    
    def can_edit_field(self, field_name):
        """Check if user can edit a specific field"""
        permission_name = f"{self.app_label}.change_{self.model_name}_{field_name}"
        
        # Check for specific field permission
        if self.user.has_perm(permission_name):
            return True
        
        # Check for general change permission
        general_permission = f"{self.app_label}.change_{self.model_name}"
        return self.user.has_perm(general_permission)
    
    def get_visible_fields(self, field_list):
        """Filter field list to only include visible fields"""
        return [field for field in field_list if self.can_view_field(field)]
    
    def get_editable_fields(self, field_list):
        """Filter field list to only include editable fields"""
        return [field for field in field_list if self.can_edit_field(field)]


def get_user_token(user):
    """Get or create authentication token for user"""
    try:
        token, created = Token.objects.get_or_create(user=user)
        return token.key
    except Exception as e:
        logger.error(f"Error getting token for user {user}: {e}")
        return None


def validate_security_headers(request):
    """Validate security headers in request"""
    security_config = JQGridSecurityConfig()
    errors = []
    
    # Check CSRF token if enabled
    if security_config.is_csrf_enabled():
        csrf_header = security_config.config.get('csrf_header_name', 'X-CSRFToken')
        if csrf_header not in request.headers:
            errors.append(f"Missing CSRF header: {csrf_header}")
    
    # Check authentication token if enabled
    if security_config.is_token_auth_enabled():
        token_header = security_config.get_token_header_name()
        if token_header not in request.headers:
            errors.append(f"Missing authentication header: {token_header}")
    
    return errors


def log_security_event(user, action, details=None):
    """Log security-related events"""
    security_config = JQGridSecurityConfig()
    
    if not security_config.config.get('audit_log_enabled', False):
        return
    
    logger.info(
        f"Security Event - User: {user}, Action: {action}, Details: {details}"
    )


# Default security configuration for common scenarios
SECURITY_PROFILES = {
    'session_only': {
        'auth_method': 'session',
        'csrf_enabled': True,
        'token_enabled': False,
        'jwt_enabled': False,
        'require_authentication': True,
    },
    
    'token_auth': {
        'auth_method': 'token',
        'csrf_enabled': False,
        'token_enabled': True,
        'jwt_enabled': False,
        'require_authentication': True,
        'token_type': 'Bearer',
    },
    
    'jwt_auth': {
        'auth_method': 'jwt',
        'csrf_enabled': False,
        'token_enabled': False,
        'jwt_enabled': True,
        'require_authentication': True,
        'jwt_auto_refresh': True,
    },
    
    'public_access': {
        'auth_method': 'session',
        'csrf_enabled': True,
        'token_enabled': False,
        'jwt_enabled': False,
        'require_authentication': False,
    },
    
    'high_security': {
        'auth_method': 'jwt',
        'csrf_enabled': True,
        'token_enabled': False,
        'jwt_enabled': True,
        'require_authentication': True,
        'field_level_permissions': True,
        'audit_log_enabled': True,
        'rate_limiting_enabled': True,
        'session_auto_check': True,
        'session_check_interval': 60000,  # 1 minute
    }
}


def apply_security_profile(profile_name):
    """Apply a predefined security profile"""
    if profile_name not in SECURITY_PROFILES:
        raise ValueError(f"Unknown security profile: {profile_name}")
    
    profile = SECURITY_PROFILES[profile_name]
    
    # Update Django settings
    if not hasattr(settings, 'JQGRID_SECURITY_CONFIG'):
        settings.JQGRID_SECURITY_CONFIG = {}
    
    settings.JQGRID_SECURITY_CONFIG.update(profile)
    
    logger.info(f"Applied security profile: {profile_name}")
    return profile