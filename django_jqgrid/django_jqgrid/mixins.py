from django.contrib.contenttypes.models import ContentType
from django.db.models import AutoField
from rest_framework.decorators import action
from rest_framework.response import Response


class JqGridConfigMixin:
    """Enhanced mixin for jqGrid configuration with advanced features"""
    additional_data = {}

    # Field type mapping definitions
    FIELD_TYPE_CONFIGS = {
        "UpperCharField": {'stype': 'text', 'search_ops': ["eq", "ne", "cn", "nc", "bw", "bn", "ew", "en"]},
        "EmailField": {'stype': 'email', 'formatter': 'email',
                       'search_ops': ["eq", "ne", "cn", "nc", "bw", "bn", "ew", "en"]},
        "ImageField": {'stype': 'text', 'formatter': 'image',
                       'search_ops': ["eq", "ne", "cn", "nc", "bw", "bn", "ew", "en"]},
        "FileField": {'stype': 'text', 'formatter': 'file',
                      'search_ops': ["eq", "ne", "cn", "nc", "bw", "bn", "ew", "en"]},
        "URLField": {'stype': 'text', 'formatter': 'link',
                     'search_ops': ["eq", "ne", "cn", "nc", "bw", "bn", "ew", "en"]},
        "MobileNumberField": {'stype': 'text', 'formatter': 'mobile',
                              'search_ops': ["eq", "ne", "cn", "nc", "bw", "bn", "ew", "en"]},
        'CharField': {'stype': 'text', 'search_ops': ["eq", "ne", "cn", "nc", "bw", "bn", "ew", "en"]},
        'TextField': {'stype': 'text', 'search_ops': ["eq", "ne", "cn", "nc", "bw", "bn", "ew", "en"]},
        'JSONField': {'stype': 'textarea', 'formatter': 'json', 'search_ops': ["eq", "ne", "cn", "nc", "bw", "bn", "ew", "en"]},
        'IntegerField': {'stype': 'integer', 'align': 'right', 'formatter': 'integer',
                         'search_ops': ["eq", "ne", "lt", "le", "gt", "ge"]},
        'PositiveIntegerField': {'stype': 'integer', 'align': 'right', 'formatter': 'integer',
                                 'search_ops': ["eq", "ne", "lt", "le", "gt", "ge"]},
        'FloatField': {'stype': 'number', 'align': 'right', 'formatter': 'number',
                       'search_ops': ["eq", "ne", "lt", "le", "gt", "ge"]},
        'DecimalField': {'stype': 'number', 'align': 'right', 'formatter': 'number',
                         'search_ops': ["eq", "ne", "lt", "le", "gt", "ge"], 'needs_decimal_places': True},
        'BooleanField': {'stype': 'checkbox', 'align': 'center', 'formatter': 'checkbox', 'edittype': 'checkbox',
                         'editoptions': {"value": "1:0"}, 'search_ops': ["eq", "ne"]},
        'DateField': {
            'stype': 'date', 'align': 'center', 'formatter': 'date',
            'formatoptions': {"srcformat": "ISO8601Short", "newformat": "Y-m-d"},
            'editoptions': {"dataInit": "initDatepicker", "datepicker": {"dateFormat": "yy-mm-dd"}},
            'search_ops': ["eq", "ne", "lt", "le", "gt", "ge"],
            'search_init': {"dataInit": "initDatepicker", "datepicker": {"dateFormat": "yy-mm-dd"}}
        },
        'DateTimeField': {
            'stype': 'datetime-local', 'align': 'center', 'formatter': 'datetimeLocal', 'edittype': 'datetime-local',
            'formatoptions': {"srcformat": "ISO8601", "newformat": "Y-m-d H:i:s"},
            'editoptions': {"dataInit": "initDatetimepicker",
                            "datetimepicker": {"dateFormat": "yy-mm-dd", "timeFormat": "HH:mm:ss"}},
            'search_ops': ["eq", "ne", "lt", "le", "gt", "ge"],
            'search_init': {"dataInit": "initDatetimepicker",
                            "datetimepicker": {"dateFormat": "yy-mm-dd", "timeFormat": "HH:mm:ss"}}
        },
        'ForeignKey': {'stype': 'text', 'formatter': 'select', 'search_ops': ["eq", "ne"]}
    }
    infinite_scroll = False
    bulk_action_config = {}

    def initgrid(self):
        # Validate requirements
        if not hasattr(self, 'serializer_class'):
            raise ValueError("JqGridConfigMixin requires 'serializer_class' to be defined")

        # Set default key field
        if not hasattr(self, 'key_field'):
            self.key_field = 'id'

        # Initialize base components
        self.colmodel = [{
            "label": "Edit Actions", "name": "actions", "width": 100,
            "formatter": "actions", "frozen": True,
            "searchable": False, "sortable": False,
            "align": "center",
            "editoptions": {"dataInit": "initActions"},
            "formatoptions": {"keys": True}
        }]
        self.colnames = ['actions']

        # Get serializer fields and model metadata
        self.visible_columns = getattr(self, 'visible_columns', list(self.serializer_class().get_fields().keys()))
        self.search_fields = getattr(self, 'search_fields', list(self.serializer_class().get_fields().keys()))
        self.ordering_fields = getattr(self, 'ordering_fields', list(self.serializer_class().get_fields().keys()))
        self.header_titles = getattr(self, 'header_titles', {
            x.name: x.verbose_name.replace('_', ' ').capitalize() if x != AutoField() else x.get('verbose_name', '')
            for x in self.serializer_class.Meta.model._meta.get_fields()
            if hasattr(x, 'verbose_name')
        })

        # Initialize enhanced features
        self.groupable_fields = getattr(self, 'groupable_fields', [])
        self.aggregation_fields = getattr(self, 'aggregation_fields', {})
        self.allowed_batch_actions = getattr(self, 'allowed_batch_actions', ['delete', 'set_active', 'set_inactive'])
        self.frozen_columns = getattr(self, 'frozen_columns', [])
        self.linked_fields = getattr(self, 'linked_fields', {})
        self.conditional_formatting = getattr(self, 'conditional_formatting', {})
        self.highlight_rules = getattr(self, 'highlight_rules', {})

        # Ensure key field is in visible columns
        if self.key_field not in self.visible_columns:
            self.visible_columns.append(self.key_field)

        # Initialize grid configuration
        model = getattr(self.serializer_class.Meta, "model", None)
        model_name = model.__name__ if model else ""
        self.model_name = ''.join(['-' + c.lower() if c.isupper() else c for c in model_name]).lstrip('-')
        self.app_label = model._meta.app_label if model else ""
        self.initialize_columns()
        self.filter_mappings = self.generate_filter_mappings()
        self.configure_grid_options()

        # Configure enhanced features
        self._configure_frozen_columns()
        self._configure_linked_fields()
        self._configure_conditional_formatting()
        self._configure_highlight_rules()

        # Update grid options with feature flags
        self.jqgrid_options.update({
            'has_batch_actions': True,
            'has_frozen_columns': bool(self.frozen_columns),
            'has_grouping': bool(self.groupable_fields),
            'has_conditional_formatting': bool(self.conditional_formatting),
            'has_highlight_rules': bool(self.highlight_rules)
        })

        # Add import/export configurations if available
        if hasattr(self, 'import_config'):
            self.additional_data['import_config'] = self.import_config
        if hasattr(self, 'export_config'):
            self.additional_data['export_config'] = self.export_config

        if hasattr(self, 'additional_data'):
            self.additional_data.update({'key_field': self.key_field})

        if hasattr(self, 'bulk_action_config'):
            self.additional_data.update({'bulk_action_config': self.bulk_action_config})

        self.configure_bulk_actions()

    def _configure_frozen_columns(self):
        """Configure frozen columns"""
        if not self.frozen_columns:
            return
        for col in self.colmodel:
            if col.get('name') in self.frozen_columns:
                col['frozen'] = True

    def _configure_linked_fields(self):
        """Configure linked fields with dependencies"""
        if self.linked_fields:
            self.additional_data['linked_fields'] = self.linked_fields

    def _configure_conditional_formatting(self):
        """Configure conditional formatting rules"""
        if self.conditional_formatting:
            self.additional_data['conditional_formatting'] = self.conditional_formatting

    def _configure_highlight_rules(self):
        """Configure row highlighting rules"""
        if self.highlight_rules:
            self.additional_data['highlight_rules'] = self.highlight_rules

    def initialize_columns(self):
        """Initialize column model from serializer fields"""
        model = getattr(self.serializer_class.Meta, "model", None)
        serializer_fields = self.serializer_class().get_fields()
        form_elements = 0

        # Ensure key field is the first column after actions
        if self.key_field and self.key_field in self.visible_columns:
            self.visible_columns.remove(self.key_field)
            self.visible_columns.insert(1, self.key_field)

        for field_name in self.visible_columns:
            # Base column configuration
            col_config = {
                "name": field_name.replace('__', '.'),
                "index": field_name,
                "sortable": field_name in self.ordering_fields,
                "editable": True,
                "search": field_name in self.search_fields,
                "autoResizable": True
            }

            # Mark key field
            if field_name == self.key_field:
                col_config["key"] = True
                # col_config["hidden"] = True
                col_config['stype'] = 'text'
                col_config['formatter'] = 'text'

            # Get field information from serializer
            field = serializer_fields.get(field_name)
            if field:
                # Set read-only status
                if getattr(field, 'read_only', False):
                    col_config["editable"] = False
                # Set label/title
                if hasattr(field, 'label') and field.label:
                    col_config["label"] = field.label
                    self.colnames.append(field.label)
                elif field_name in self.header_titles:
                    col_config["label"] = self.header_titles[field_name]
                    self.colnames.append(self.header_titles[field_name])
                else:
                    self.colnames.append(field_name.replace('_', ' ').capitalize())

                # Set required validation
                if getattr(field, 'required', False):
                    col_config["editrules"] = {"required": True}

            # Process model metadata if available
            if model:
                try:
                    model_field = model._meta.get_field(field_name)
                    self.configure_field_by_type(col_config, model_field)
                except Exception:
                    pass  # Field might be a property or method

            if col_config["editable"]:
                col_config["formoptions"] = {
                    "colpos": form_elements % 4 + 1,
                    "rowpos": form_elements // 4 + 1
                }
                form_elements += 1

            # Add the column to our model
            self.colmodel.append(col_config)

        return model

    def configure_field_by_type(self, col_config, model_field):
        """Configure column based on field type"""
        from django.db import models
        field_name = model_field.name
        field_type = model_field.__class__.__name__

        # Set field title from verbose_name if available
        verbose_name = getattr(model_field, "verbose_name", "")
        if verbose_name and "label" not in col_config:
            col_config["label"] = verbose_name.capitalize()
            # Update colnames if already added with default name
            if len(self.colnames) > len(self.colmodel):
                self.colnames[-1] = verbose_name.capitalize()
            # Update header_titles
            self.header_titles[field_name] = verbose_name.capitalize()

        if col_config['search']:
            # Apply configurations from FIELD_TYPE_CONFIGS if available
            if field_type in self.FIELD_TYPE_CONFIGS:
                field_config = self.FIELD_TYPE_CONFIGS[field_type].copy()
            else:
                field_config = {'stype': 'text', 'search_ops': ["eq", "ne", "cn", "nc", "bw", "bn", "ew", "en"]}
            col_config.update({k: v for k, v in field_config.items()
                               if k not in ['search_ops', 'search_init', 'needs_decimal_places', 'actions']})

        # Handle DecimalField special case
        if field_config.get('needs_decimal_places', False) and isinstance(model_field, models.DecimalField):
            decimal_places = getattr(model_field, "decimal_places", 2)
            col_config["formatoptions"] = {"decimalPlaces": decimal_places}

        # Configure searchable fields with options
        if field_name in self.search_fields and 'search_ops' in field_config:
            search_options = {"sopt": field_config['search_ops']}
            if 'search_init' in field_config:
                search_options.update(field_config['search_init'])
            col_config["searchoptions"] = search_options

        # Handle foreign key for dataUrl configuration
        if isinstance(model_field, models.ForeignKey):
            col_config["stype"] = "text"
            col_config["formatter"] = "text"
            col_config["edittype"] = "select"
            col_config['editoptions'] = {
                "dataUrl": f'/api/{self.app_label}/{self.model_name}/dropdown/?field_name={field_name}&format=json',
                "dataUrlTemp": f'/api/{self.app_label}/{self.model_name}/<id>/dropdown_pk/?field_name={field_name}&all=true&format=json',
                "dataType": "application/json"
            }

            col_config['addoptions'] = {
                "dataUrl": f'/api/{self.app_label}/{self.model_name}/dropdown/?field_name={field_name}&format=json',
                "dataUrlTemp": f'/api/{self.app_label}/{self.model_name}/<id>/dropdown_pk/?field_name={field_name}&all=true&format=json',
                "dataType": "application/json"
            }

            # Configure search options
            if field_name in self.search_fields:
                col_config['searchoptions'] = {
                    "dataUrl": f'/api/{self.app_label}/{self.model_name}/dropdown/?field_name={field_name}&format=json',
                    'dataUrlTemp': f'/api/{self.app_label}/{self.model_name}/<id>/dropdown-pk/?field_name={field_name}&all=true&format=json',
                    "dataType": "application/json"
                }

        # Handle ManyToManyField for dataUrl configuration
        if isinstance(model_field, models.ManyToManyField):
            col_config["stype"] = "select"
            col_config["formatter"] = "select"
            col_config["edittype"] = "select"
            col_config['editoptions'] = {
                "dataUrl": f'/api/{self.app_label}/{self.model_name}/dropdown/?field_name={field_name}&format=json'
            }

            # Configure search options
            if field_name in self.search_fields:
                col_config['searchoptions'] = {'dataUrl': f'/api/{self.app_label}/{self.model_name}/dropdown/?field_name={field_name}&format=json&multiple=true'}
        # Handle choices
        choices = getattr(model_field, "choices", None)
        if choices:
            self._configure_choices_field(col_config, choices)

        # Add groupable field setting
        if field_name in self.groupable_fields:
            col_config["groupable"] = True

        # Set non-editable for auto/pk fields
        if isinstance(model_field, models.AutoField) or getattr(model_field, "primary_key", False) or field_name == 'id':
            col_config["editable"] = False
            col_config["frozen"] = True
            col_config['formatter'] = 'open_button'
            col_config['formatteroptions']['baseLinkUrl'] = f"/crud/{self.app_label}/{self.model_name}/<id>/"

        return col_config

    def _configure_choices_field(self, col_config, choices):
        """Configure a field with choices"""
        choice_dict = {str(k): str(v) for k, v in choices}
        choice_str = ":All;"+";".join([f"{k}:{v}" for k, v in choice_dict.items()])

        # Set up as a select field
        col_config["stype"] = "select"
        col_config["formatter"] = "select"
        col_config["edittype"] = "select"
        col_config["editoptions"] = {"value": choice_str}

        # Configure search options
        if col_config.get("search", False):
            col_config["searchoptions"] = {
                "sopt": self.field_type_search_ops["select"] if hasattr(self, 'field_type_search_ops') else ["eq", "ne"],
                "value": ":All;"+";".join([f"{k}:{v}" for k, v in choice_dict.items()])
            }

        return col_config

    def configure_grid_options(self):
        """Configure jqGrid options"""
        # Core grid constructor options
        col_names = [x.get('label', None) or x.get('name', None) for x in self.colmodel]
        self.jqgrid_options = {
            "datatype": "json",
            "mtype": "GET",
            "url": f"/api/{self.app_label}/{self.model_name}/",
            "colModel": self.colmodel,
            "colNames": [x.replace('.', ' ').replace('_', ' ').capitalize() for x in col_names],
            "headertitles": True,
            "styleUI": 'Bootstrap4',
            "iconSet": 'fontAwesome',
            "responsive": True,
            "rowNum": 25,
            "rowList": [25, 50, 100, 500, 1000, 2000, 5000],
            "sortname": self.key_field,
            "sortorder": "asc",
            "viewrecords": True,
            "gridview": True,
            "autoencode": True,
            "height": 400,
            "shrinkToFit": len(self.colmodel)<7,
            "autowidth": True,
            "forceFit": False,
            "autoresizeOnLoad": True,
            "pager": "#jqGridPager",
            "footerrow": True,
            "menubar": True,
            "userDataOnFooter": True,
            "caption": "{} Data".format(self.model_name.replace('_', ' ').capitalize()),
            "jsonReader": {
                "root": "data.data",
                "page": "data.page",
                "total": "data.total_pages",
                "records": "data.itemsCount",
                "id": self.key_field,
                "repeatitems": False
            },
            "prmNames": {
                "page": "page",
                "rows": "page_size",
                "id": self.key_field,
                "order": "sord"
            },
            # Enhanced UI features
            "altRows": True,
            "hoverrows": True,
            "multiSort": True,
            "rownumbers": True,
            "colMenu": True,
            "multiselect": True,
            "editurl": f"/api/{self.app_label}/{self.model_name}/crud/",
            "toolbar": [True, "both"],
            "sortable": True,
            "toppager": True,
        }

        # Add custom options for infinite scroll
        if self.infinite_scroll:
            self.jqgrid_options.update({"scroll": 1, "scrollrows": True, "scrollOffset": 0, "scrollTimeout": 100})

        # Configure method options
        self.nav_options = {
            "edit": True, "add": True, "del": True, "search": True, "refresh": True, "view": True,
            "position": "left", "closeOnEscape": True, "cloneToTop": True
        }

        self.edit_options = {
            "closeOnEscape": True, "editCaption": f"Edit {self.model_name.replace('_', ' ').capitalize()}",
            "recreateForm": True, "closeAfterEdit": True, "modal": True,
            "afterSubmit": "handleFormResponse",
            "errorTextFormat": "handleSubmitError", "reloadAfterSubmit": True,
        }

        self.add_options = {
            "closeOnEscape": True, "recreateForm": True, "closeAfterAdd": True,
            "modal": True, "afterSubmit": "handleFormResponse",
            "errorTextFormat": "handleSubmitError", "reloadAfterSubmit": True, "mtype": "POST",
        }

        self.del_options = {
            "reloadAfterSubmit": True, "closeOnEscape": True, "modal": True,
        }

        self.search_options = {
            "closeOnEscape": True, "multipleSearch": True, "multipleGroup": True,
            "showQuery": True, "closeAfterSearch": True, "recreateFilter": True,
            **self.get_tmplgilters()
        }

        self.view_options = {
            "closeOnEscape": True, "width": 800, "modal": True, "top": 100, "left": 300
        }

        self.filter_toolbar_options = {
            "stringResult": True, "defaultSearch": "cn", "searchOperators": True, "autosearch": True,
            "searchOnEnter": False
        }

        # Optional group header configuration
        self.group_header_options = None
        if hasattr(self, 'column_groups') and self.column_groups:
            self.group_header_options = {"useColSpanStyle": True, "groupHeaders": self.column_groups}

        # Frozen columns configuration
        self.frozen_columns_enabled = bool(self.frozen_columns)

        # Grouping options configuration
        self.grouping_options = None
        if self.groupable_fields:
            default_group_field = self.groupable_fields[0]
            self.grouping_options = {
                "groupField": default_group_field, "groupColumnShow": [True], "groupText": ["<b>{0}</b>"],
                "groupOrder": ["asc"], "groupSummary": [True], "showSummaryOnHide": True
            }

        # Add method options to additional_response_data
        self.additional_data.update({
            "navOptions": self.nav_options,
            "editOptions": self.edit_options,
            "addOptions": self.add_options,
            "delOptions": self.del_options,
            "searchOptions": self.search_options,
            "viewOptions": self.view_options,
            "filterToolbar": self.filter_toolbar_options
        })

        # Add conditional options
        if self.group_header_options:
            self.additional_data["groupHeaders"] = self.group_header_options
        if self.frozen_columns_enabled:
            self.additional_data["hasFrozenColumns"] = True
        if self.grouping_options:
            self.additional_data["groupingOptions"] = self.grouping_options

        # Update additional_data with jqGrid configuration
        self.additional_data.update({
            "jqgrid_options": self.jqgrid_options,
            "header_titles": self.header_titles
        })

    def generate_filter_mappings(self):
        """Generate filter mappings for jqGrid search toolbox"""
        filter_mappings = {}
        standard_mappings = {
            "eq": "", "ne": "__ne", "lt": "__lt", "le": "__lte", "gt": "__gt", "ge": "__gte",
            "cn": "__icontains", "nc": "__icontains", "bw": "__istartswith", "bn": "__istartswith",
            "ew": "__iendswith", "en": "__iendswith", "in": "__in", "ni": "__in",
            "nu": "__isnull", "nn": "__isnull"
        }

        # Create mappings for each field and operator
        for field_name in self.search_fields:
            for op, lookup in standard_mappings.items():
                filter_mappings[f"{field_name}__jq_{op}"] = f"{field_name}{lookup}"

        return filter_mappings

    def get_tmplgilters(self):
        try:
            data = ContentType.objects.filter(
                key='tmplFilters', 
                table=ContentType.objects.get_for_model(self.queryset.model),
                created_by=self.request.user
            ).values('id', 'name', 'value')
            tmplNames = []
            tmplIds = []
            tmplFilters = []
            for i in data:
                tmplIds.append(i['id'])
                tmplNames.append(i['name'])
                tmplFilters.append(i['value'])
            return {"tmplNames": tmplNames, "tmplFilters": tmplFilters, "tmplIds": tmplIds}
        except:
            return {}

    @action(methods=['get'], detail=False)
    def jqgrid_config(self, request, *args, **kwargs):
        """Return jqGrid configuration"""
        self.initgrid()
        response_data = {
            'jqgrid_options': self.jqgrid_options,
            'method_options': {
                'navGrid': {
                    'selector': '#jqGridPager',
                    'options': self.nav_options,
                    'editOptions': self.edit_options,
                    'addOptions': self.add_options,
                    'delOptions': self.del_options,
                    'searchOptions': self.search_options,
                    'viewOptions': self.view_options
                },
                'filterToolbar': {'options': self.filter_toolbar_options}
            },
            'bulk_action_config': self.bulk_action_config
        }

        # Add conditional method options
        if self.group_header_options:
            response_data['method_options']['setGroupHeaders'] = {'options': self.group_header_options}
        if self.frozen_columns_enabled:
            response_data['method_options']['setFrozenColumns'] = {'enabled': True}
        if self.grouping_options:
            response_data['method_options']['groupingGroupBy'] = {'options': self.grouping_options}

        # Add additional data
        if hasattr(self, 'additional_data'):
            for key, value in self.additional_data.items():
                if key not in response_data:
                    response_data[key] = value

        return Response(response_data)

    @action(methods=['post'], detail=False, url_path='crud')
    def crud(self, request, *args, **kwargs):
        """ Dynamically change request method based on 'oper' field """
        oper = request.data.get("oper")  # Get the operation type
        record_id = request.data.get("id")  # Get ID for edit/delete

        if oper == "add":
            request.method = "POST"
            return self.create(request, *args, **kwargs)

        elif oper == "edit":
            if not record_id:
                return Response({"success": False, "message": "ID is required for edit operation"}, status=400)

            request.method = "PUT"
            self.kwargs["pk"] = record_id
            return self.update(request, *args, **kwargs)

        elif oper == "del":
            if not record_id:
                return Response({"success": False, "message": "ID is required for delete operation"}, status=400)

            request.method = "DELETE"
            self.kwargs["pk"] = record_id
            return self.destroy(request, *args, **kwargs)

        return Response({"success": False, "message": "Invalid operation"}, status=400)

    def configure_bulk_actions(self):
        """Configure bulk actions and updatable fields for the grid"""
        # Define which fields can be bulk updated
        # By default, use visible columns except for id and non-editable fields
        self.bulk_updateable_fields = getattr(self, 'bulk_updateable_fields', [])

        # If no specific fields are defined, auto-generate from column model
        if not self.bulk_updateable_fields:
            model = getattr(self.serializer_class.Meta, "model", None)
            serializer_fields = self.serializer_class().get_fields()

            for field_name in self.visible_columns:
                # Skip id and non-editable fields like actions
                if field_name in ['id', 'actions', 'cb', 'rn']:
                    continue

                # Check if field is editable in serializer
                field = serializer_fields.get(field_name)
                if field and not getattr(field, 'read_only', False):
                    # Just add the field name to bulk_updateable_fields
                    self.bulk_updateable_fields.append(field_name)

        # Define allowed bulk actions
        self.bulk_actions = getattr(self, 'bulk_actions', [
            {
                'id': 'bulk-delete',
                'label': 'Delete Selected',
                'icon': 'fa-trash',
                'class': 'btn-danger'
            },
            {
                'id': 'bulk-update',
                'label': 'Update Selected',
                'icon': 'fa-edit',
                'class': 'btn-primary'
            }
        ])

        # Add bulk action configuration to additional response data
        self.bulk_action_config = {
            'actions': self.bulk_actions,
            'updateableFields': self.bulk_updateable_fields
        }
        
        
from rest_framework import status
from rest_framework.decorators import action
from django.db import transaction
from django.core.exceptions import ValidationError
import logging

# Set up logger
logger = logging.getLogger(__name__)


class JqGridBulkActionMixin:
    """
    Enhanced BulkActionMixin for jqGrid integration.
    Extends the existing BulkActionMixin with jqGrid-specific functionality.
    """

    def validate_bulk_data(self, data):
        """
        Validate the incoming bulk action data with jqGrid-specific checks
        """
        if not isinstance(data, dict):
            raise ValidationError("Invalid data format")

        if 'ids' not in data:
            raise ValidationError("No IDs provided")

        if not isinstance(data['ids'], list):
            raise ValidationError("IDs must be a list")

        if len(data['ids']) == 0:
            raise ValidationError("No valid IDs provided")

        if 'action' not in data:
            raise ValidationError("No action provided")

        if not isinstance(data['action'], dict):
            raise ValidationError("Action must be a dictionary")

        # Special check for _delete action
        if '_delete' in data['action'] and data['action'].get('_delete') is True:
            # This is a delete operation, no need to validate other fields
            return

    def get_bulk_queryset(self, ids):
        """
        Get queryset for bulk operation with proper ID handling for jqGrid
        """
        # Look up by string or integer IDs
        queryset = self.get_queryset()

        # Handle both string and integer IDs
        valid_ids = []
        for id_value in ids:
            try:
                # Try to convert to int if possible
                if isinstance(id_value, str) and id_value.isdigit():
                    valid_ids.append(int(id_value))
                else:
                    valid_ids.append(id_value)
            except (ValueError, TypeError):
                # Skip invalid IDs
                logger.warning(f"Invalid ID format: {id_value}")

        return queryset.filter(id__in=valid_ids)

    def process_bulk_update(self, objs, same_object, related_obj):
        """
        Process the bulk update operation with enhanced handling
        """
        # Special handling for delete operation
        if '_delete' in same_object and same_object.get('_delete') is True:
            # Perform delete operation
            deleted_count = 0
            for obj in objs:
                try:
                    obj.delete()
                    deleted_count += 1
                except Exception as e:
                    logger.error(f"Error deleting object {obj.id}: {str(e)}")

            # Return without further processing
            return {"deleted": deleted_count}

        # Remove any special action fields
        if '_delete' in same_object:
            del same_object['_delete']

        # Process normal update
        return super().process_bulk_update(objs, same_object, related_obj)

    @action(methods=['post'], detail=False)
    def bulk_action(self, request):
        """
        Perform bulk actions on multiple objects with enhanced jqGrid support

        Expected request data format:
        {
            "ids": [1, 2, 3],
            "action": {
                "field1": "value1",
                "related_model__field2": {"subfield": "value2"}
            }
        }

        For delete operations:
        {
            "ids": [1, 2, 3],
            "action": {
                "_delete": true
            }
        }
        """
        try:
            # Validate request data
            self.validate_bulk_data(request.data)

            # Check if this is a delete operation
            is_delete = (
                    '_delete' in request.data['action'] and
                    request.data['action'].get('_delete') is True
            )

            if not is_delete:
                # Get allowed fields
                allowed_fields = self.get_allowed_fields()

                # Split action into direct and related updates
                same_object = {}
                related_obj = {}

                for k, v in request.data['action'].items():
                    if '__' not in k:
                        if k not in allowed_fields['direct_fields'] and k != '_delete':
                            raise ValidationError(f"Field {k} is not allowed for bulk update")
                        same_object[k] = v
                    else:
                        related_field = k.split('__')[0]
                        if related_field not in allowed_fields['related_fields']:
                            raise ValidationError(f"Related field {related_field} is not allowed for bulk update")
                        related_obj[k] = v
            else:
                # For delete operations, just set _delete flag
                same_object = {'_delete': True}
                related_obj = {}

            # Get queryset with optimized loading
            objs = self.get_bulk_queryset(request.data['ids'])

            if objs.count() == 0:
                return Response({
                    'status': 'error',
                    'message': 'No valid objects found with the provided IDs'
                }, status=status.HTTP_404_NOT_FOUND)

            # Perform updates in transaction
            results = {}
            with transaction.atomic():
                results = self.process_bulk_update(objs, same_object, related_obj)

            # Prepare response message
            if is_delete:
                message = f'Successfully deleted {results.get("deleted", 0)} objects'
            else:
                message = f'Successfully updated {objs.count()} objects'

            return Response({
                'status': 'success',
                'message': message,
                'updated_ids': request.data['ids'],
                'results': results
            }, status=status.HTTP_200_OK)

        except ValidationError as e:
            logger.error(f"Validation error in bulk action: {str(e)}")
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.error(f"Error in bulk action: {str(e)}")
            return Response({
                'status': 'error',
                'message': 'An error occurred while processing the bulk action'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_allowed_fields_for_bulk_update(self):
        """
        Get the list of fields allowed for bulk update
        Override this method to customize which fields can be bulk updated
        """
        # If bulk_updateable_fields is defined, use it
        if hasattr(self, 'bulk_updateable_fields'):
            return [field['name'] if isinstance(field, dict) else field
                    for field in self.bulk_updateable_fields]

        # Otherwise use the default allowed_fields from BulkActionMixin
        return self.get_allowed_fields()['direct_fields']