from django.apps import AppConfig


class ExampleConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'example'
    verbose_name = 'Django jqGrid Example'
    
    def ready(self):
        """App initialization code."""
        pass