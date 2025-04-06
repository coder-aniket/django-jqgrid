from rest_framework.filters import BaseFilterBackend
import json
from django.db.models import Q


class JqGridFilterBackend(BaseFilterBackend):
    """
    Custom filter backend for handling jqGrid filter requests.
    This enables advanced filtering directly from jqGrid filter toolbar and search dialog.
    """

    def filter_queryset(self, request, queryset, view):
        # Get filter parameters from request
        filters = request.query_params.get('filters', None)
        search = request.query_params.get('_search', 'false')

        # Skip if not searching
        if search != 'true' or not filters:
            return queryset

        try:
            # Parse the filters string into JSON
            filters_dict = json.loads(filters)

            # Build the filter Q object
            filter_q = self.build_filter_query(filters_dict, view)
            if filter_q:
                queryset = queryset.filter(filter_q)

        except json.JSONDecodeError:
            pass  # Ignore invalid JSON
        except Exception as e:
            print(f"JqGrid filter error: {str(e)}")

        return queryset

    def build_filter_query(self, filters_dict, view):
        """
        Build a Q object from filter dictionary.
        Supports both simple filters and complex grouping operations.
        """
        filter_q = Q()

        # Get filter mappings if available on the view
        filter_mappings = getattr(view, 'filter_mappings', {})

        # Handle complex grouping operations
        if 'groups' in filters_dict and filters_dict['groups']:
            groups = filters_dict['groups']
            group_op = filters_dict.get('groupOp', 'AND').upper()

            for group in groups:
                group_q = self.build_filter_query(group, view)
                if group_q:
                    if group_op == 'AND':
                        filter_q &= group_q
                    else:  # OR
                        filter_q |= group_q

        # Handle simple filter rules
        if 'rules' in filters_dict and filters_dict['rules']:
            rules = filters_dict['rules']
            group_op = filters_dict.get('groupOp', 'AND').upper()

            for rule in rules:
                field = rule.get('field', '')
                data = rule.get('data', '')
                op = rule.get('op', '')

                if not field or not op:
                    continue

                # Map jqGrid operator to Django filter
                filter_expr = self.map_operator(field, op, data, filter_mappings)
                if not filter_expr:
                    continue

                rule_q = Q()

                # Check if operator is negated
                if op in ['ne', 'nc', 'bn', 'en', 'ni', 'nn']:
                    # Handle negation operators
                    field_name, field_value = filter_expr
                    rule_q = ~Q(**{field_name: field_value})
                else:
                    # Handle normal operators
                    field_name, field_value = filter_expr
                    rule_q = Q(**{field_name: field_value})

                # Combine with existing query based on group operator
                if group_op == 'AND':
                    filter_q &= rule_q
                else:  # OR
                    filter_q |= rule_q

        return filter_q

    def map_operator(self, field, op, data, filter_mappings):
        """
        Map jqGrid operators to Django query expressions.
        Returns a tuple of (field_name, value) to be used in a Q object.
        """
        # Check if a custom mapping exists
        custom_key = f"{field}__jq_{op}"
        if custom_key in filter_mappings:
            mapped_field = filter_mappings[custom_key]
            return (mapped_field, data)

        # Standard operator mappings
        standard_mappings = {
            "eq": "",  # equals
            "ne": "",  # not equals
            "lt": "__lt",  # less than
            "le": "__lte",  # less than or equal
            "gt": "__gt",  # greater than
            "ge": "__gte",  # greater than or equal
            "cn": "__icontains",  # contains
            "nc": "__icontains",  # not contains
            "bw": "__istartswith",  # begins with
            "bn": "__istartswith",  # not begins with
            "ew": "__iendswith",  # ends with
            "en": "__iendswith",  # not ends with
            "in": "__in",  # is in
            "ni": "__in",  # is not in
            "nu": "__isnull",  # is null
            "nn": "__isnull"  # is not null
        }

        if op in standard_mappings:
            # Special handling for null/not null
            if op == 'nu':
                return (f"{field}{standard_mappings[op]}", True)
            elif op == 'nn':
                return (f"{field}{standard_mappings[op]}", False)
            # Special handling for in/not in
            elif op in ['in', 'ni']:
                values = [v.strip() for v in data.split(',')] if isinstance(data, str) else data
                return (f"{field}{standard_mappings[op]}", values)
            # Normal case
            else:
                return (f"{field}{standard_mappings[op]}", data)

        return None


class JqGridSortBackend(BaseFilterBackend):
    """
    Custom sort backend for handling jqGrid sorting requests.
    Supports multi-column sorting.
    """

    def filter_queryset(self, request, queryset, view):
        # Get sorting parameters
        sidx = request.query_params.get('sidx', '')
        sord = request.query_params.get('sord', 'asc')

        # Check if we need to sort
        if not sidx:
            return queryset

        # Handle multi-column sorting
        if ',' in sidx:
            # Multiple sort fields
            sort_fields = []
            field_list = sidx.split(',')
            for field_order in field_list:
                split = [x for x in field_order.split(' ') if x != '']
                field, order = split[0], split[1] if len(split) > 1 else sord
                # Add direction prefix for descending order
                if field != '':
                    if order.lower() == 'desc':
                        sort_fields.append(f"-{field}")
                    else:
                        sort_fields.append(field)
            # Apply ordering
            return queryset.order_by(*sort_fields)
        else:
            # Single field sorting
            if sord.lower() == 'desc':
                return queryset.order_by(f"-{sidx}")
            else:
                return queryset.order_by(sidx)

        return queryset