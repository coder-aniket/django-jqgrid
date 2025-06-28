"""
URL configuration for django-jqgrid example project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

urlpatterns = [
    # Admin site
    path('admin/', admin.site.urls),
    
    # Redirect root URL to examples
    path('', RedirectView.as_view(url='/examples/', permanent=False)),
    
    # Example app URLs
    path('examples/', include('example.urls')),
    
    # API endpoints for REST framework browsable API
    path('api-auth/', include('rest_framework.urls')),
]

# Serve static and media files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)