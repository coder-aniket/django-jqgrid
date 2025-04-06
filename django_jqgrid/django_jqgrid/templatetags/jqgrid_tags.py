from django import template
from django.utils.safestring import mark_safe

register = template.Library()

@register.simple_tag
def jqgrid_css():
    """
    Includes the required CSS files for jqGrid.
    """
    css = [
        '<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">',
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqgrid/5.7.0/css/ui.jqgrid.min.css">',
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css">',
        '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">',
        '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.0/css/all.min.css">',
        '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastr@2.1.4/build/toastr.min.css">',
        '<link rel="stylesheet" href="/static/django_jqgrid/css/jqgrid-bootstrap.css">'
    ]
    return mark_safe('\n'.join(css))

@register.simple_tag
def jqgrid_js():
    """
    Includes the required JavaScript files for jqGrid.
    """
    js = [
        '<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>',
        '<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>',
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/jqgrid/5.7.0/js/jquery.jqGrid.min.js"></script>',
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/jqgrid/5.7.0/js/i18n/grid.locale-en.js"></script>',
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>',
        '<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>',
        '<script src="https://cdn.jsdelivr.net/npm/toastr@2.1.4/build/toastr.min.js"></script>',
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>',
        '<script src="/static/django_jqgrid/js/jqgrid-core.js"></script>',
        '<script src="/static/django_jqgrid/js/jqgrid-import-export.js"></script>',
        '<script src="/static/django_jqgrid/js/jqgrid-integration.js"></script>'
    ]
    return mark_safe('\n'.join(js))

@register.inclusion_tag('django_jqgrid/includes/grid_container.html')
def jqgrid_container(grid_id, app_name, model_name, title=None):
    """
    Renders the jqGrid container elements.
    
    Args:
        grid_id: Unique ID for the grid
        app_name: Django app name
        model_name: Model name
        title: Optional grid title
    """
    return {
        'grid_id': grid_id,
        'app_name': app_name,
        'model_name': model_name,
        'title': title or f"{model_name.replace('_', ' ').title()} Data"
    }

@register.inclusion_tag('django_jqgrid/includes/grid_scripts.html')
def jqgrid_init(grid_id, app_name, model_name, options=None):
    """
    Renders the JavaScript code to initialize a jqGrid.
    
    Args:
        grid_id: Unique ID for the grid
        app_name: Django app name
        model_name: Model name
        options: Optional dictionary of initialization options
    """
    return {
        'grid_id': grid_id,
        'app_name': app_name,
        'model_name': model_name,
        'options': options or {}
    }