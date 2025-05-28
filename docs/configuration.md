# Configuration

django-jqgrid provides extensive configuration options at both global and per-grid levels.

## Global Configuration

Set global defaults in your Django settings:

```python
# settings.py

JQGRID_CONFIG = {
    # Grid Display Settings
    'GRID_HEIGHT': 400,
    'GRID_WIDTH': 'auto',
    'ROW_NUM': 25,
    'ROW_LIST': [10, 25, 50, 100, 500, 1000],
    'MULTISELECT': True,
    'MULTIBOX_ONLY': True,
    
    # UI Settings
    'ICON_SET': 'fontAwesome',  # Options: 'fontAwesome', 'glyph', 'ui'
    'GUI_STYLE': 'bootstrap4',   # Options: 'bootstrap', 'bootstrap4', 'bootstrap5', 'jqueryui'
    'LOCALE': 'en',
    
    # Form Settings
    'FORM_COLUMNS': 4,
    'FORM_WIDTH': 800,
    'FORM_HEIGHT': 'auto',
    
    # Date/Time Formats
    'DATE_FORMAT': 'Y-m-d',
    'DATETIME_FORMAT': 'Y-m-d H:i:s',
    'TIME_FORMAT': 'H:i:s',
    
    # Performance Settings
    'ENABLE_CACHE': True,
    'CACHE_TIMEOUT': 300,  # 5 minutes
    'OPTIMIZE_QUERIES': True,
    'DEFAULT_PAGE_SIZE': 50,
    'MAX_PAGE_SIZE': 1000,
    
    # Security Settings
    'ENABLE_CSRF': True,
    'FIELD_LEVEL_PERMISSIONS': False,
    'AUDIT_CHANGES': False,
    
    # Plugin Settings
    'ENABLE_IMPORT_EXPORT': True,
    'ENABLE_FILTERS': True,
    'ENABLE_COLUMN_CHOOSER': True,
    'ENABLE_FREEZE_COLUMNS': False,
}
```

## Grid Configuration

### Basic Options

```python
jqgrid_config = {
    # Grid identification
    'grid_id': 'my_grid',
    'pager_id': 'my_pager',
    
    # Data source
    'url': '/api/jqgrid/mymodel/list/',
    'datatype': 'json',
    'mtype': 'GET',
    
    # Display settings
    'caption': 'My Data Grid',
    'height': 400,
    'width': 'auto',
    'shrinkToFit': True,
    'forceFit': False,
    'autowidth': True,
    
    # Row settings
    'rowNum': 25,
    'rowList': [10, 25, 50, 100],
    'rownumbers': True,
    'rownumWidth': 40,
    
    # Sorting
    'sortname': 'id',
    'sortorder': 'desc',
    'sortable': True,
    
    # Selection
    'multiselect': True,
    'multiboxonly': True,
    'multiselectWidth': 30,
    
    # Pagination
    'pager': True,
    'viewrecords': True,
    'recordpos': 'right',
    
    # Loading
    'loadonce': False,
    'loadui': 'enable',
    'loadtext': 'Loading...',
}
```

### Column Model (colModel)

Define columns with detailed options:

```python
'colModel': [
    {
        'name': 'id',           # Field name (required)
        'label': 'ID',          # Column header
        'index': 'id',          # Sort index
        'width': 60,            # Column width
        'align': 'center',      # Text alignment: 'left', 'center', 'right'
        'hidden': True,         # Hide column
        'key': True,            # Primary key column
        'sortable': True,       # Enable sorting
        'search': True,         # Enable searching
        'editable': False,      # Enable editing
        'resizable': True,      # Allow resize
        'fixed': False,         # Fixed width
        'frozen': False,        # Freeze column
    },
    {
        'name': 'name',
        'label': 'Name',
        'width': 200,
        'editable': True,
        'edittype': 'text',     # Edit control type
        'editoptions': {
            'size': 30,
            'maxlength': 100,
            'placeholder': 'Enter name'
        },
        'editrules': {
            'required': True,
            'edithidden': False
        },
        'formoptions': {
            'label': 'Product Name',
            'elmprefix': '*',
            'rowpos': 1,
            'colpos': 1
        },
        'searchoptions': {
            'sopt': ['cn', 'eq', 'ne', 'bw', 'ew'],
            'clearSearch': True
        }
    },
    {
        'name': 'price',
        'label': 'Price',
        'width': 100,
        'align': 'right',
        'formatter': 'currency',     # Built-in formatter
        'formatoptions': {
            'prefix': '$',
            'decimalPlaces': 2,
            'thousandsSeparator': ','
        },
        'editable': True,
        'edittype': 'text',
        'editrules': {
            'number': True,
            'minValue': 0,
            'maxValue': 99999
        }
    },
    {
        'name': 'category',
        'label': 'Category',
        'width': 150,
        'editable': True,
        'edittype': 'select',       # Dropdown
        'editoptions': {
            'value': 'electronics:Electronics;clothing:Clothing;food:Food'
        },
        'stype': 'select',          # Search type
        'searchoptions': {
            'sopt': ['eq', 'ne'],
            'value': ':All;electronics:Electronics;clothing:Clothing;food:Food'
        }
    },
    {
        'name': 'active',
        'label': 'Active',
        'width': 80,
        'align': 'center',
        'formatter': 'checkbox',     # Checkbox formatter
        'editable': True,
        'edittype': 'checkbox',
        'editoptions': {
            'value': '1:0'
        }
    },
    {
        'name': 'created_at',
        'label': 'Created',
        'width': 150,
        'formatter': 'date',         # Date formatter
        'formatoptions': {
            'srcformat': 'Y-m-d H:i:s',
            'newformat': 'm/d/Y h:i A'
        },
        'searchoptions': {
            'sopt': ['eq', 'ne', 'lt', 'le', 'gt', 'ge'],
            'dataInit': 'function(elem) { $(elem).datepicker(); }'
        }
    },
    {
        'name': 'actions',
        'label': 'Actions',
        'width': 100,
        'formatter': 'actions',      # Action buttons formatter
        'formatoptions': {
            'editformbutton': True,
            'delbutton': True,
            'editOptions': {},
            'delOptions': {}
        },
        'search': False,
        'sortable': False
    }
]
```

## Formatter Options

### Built-in Formatters

```python
# Integer formatter
{'formatter': 'integer', 'formatoptions': {'thousandsSeparator': ','}}

# Number formatter
{'formatter': 'number', 'formatoptions': {'decimalPlaces': 2}}

# Currency formatter
{'formatter': 'currency', 'formatoptions': {'prefix': '$', 'suffix': ' USD'}}

# Date formatter
{'formatter': 'date', 'formatoptions': {'srcformat': 'Y-m-d', 'newformat': 'd/m/Y'}}

# Email formatter
{'formatter': 'email'}

# Link formatter
{'formatter': 'link', 'formatoptions': {'target': '_blank'}}

# Checkbox formatter
{'formatter': 'checkbox', 'formatoptions': {'disabled': False}}

# Select formatter
{'formatter': 'select', 'editoptions': {'value': '1:Yes;0:No'}}
```

### Custom Formatter

```javascript
{
    'name': 'status',
    'formatter': 'function(cellvalue, options, rowObject) {
        var color = cellvalue === "active" ? "green" : "red";
        return "<span style=\"color:" + color + "\">" + cellvalue + "</span>";
    }',
    'unformat': 'function(cellvalue, options, cell) {
        return $(cell).text();
    }'
}
```

## Event Handlers

Configure grid events:

```python
jqgrid_config = {
    # ... other config ...
    'gridComplete': '''function() {
        console.log("Grid loaded");
    }''',
    'onSelectRow': '''function(rowid, status, e) {
        console.log("Row selected:", rowid);
    }''',
    'beforeRequest': '''function() {
        // Modify request before sending
    }''',
    'loadComplete': '''function(data) {
        // Process data after loading
    }''',
    'onCellSelect': '''function(rowid, iCol, cellcontent, e) {
        // Cell clicked
    }''',
    'beforeEditCell': '''function(rowid, cellname, value, iRow, iCol) {
        // Before cell edit
    }''',
    'afterEditCell': '''function(rowid, cellname, value, iRow, iCol) {
        // After cell edit
    }''',
}
```

## Navigation Options

```python
# Navigation bar configuration
'navOptions': {
    'edit': True,
    'add': True,
    'del': True,
    'search': True,
    'refresh': True,
    'view': True,
    'position': 'left',
    'cloneToTop': False
}

# Edit options
'editOptions': {
    'reloadAfterSubmit': True,
    'closeAfterEdit': True,
    'modal': True,
    'width': 500,
    'height': 'auto',
    'dataheight': 'auto',
    'top': 100,
    'left': 100,
    'beforeShowForm': 'function(formid) { /* customize form */ }'
}

# Add options
'addOptions': {
    'reloadAfterSubmit': True,
    'closeAfterAdd': True,
    'clearAfterAdd': True,
    'addedrow': 'first',
    'beforeShowForm': 'function(formid) { /* customize form */ }'
}

# Delete options
'delOptions': {
    'reloadAfterSubmit': True,
    'closeAfterDelete': True,
    'beforeShowForm': 'function(formid) { /* customize form */ }',
    'msg': 'Are you sure you want to delete selected records?'
}

# Search options
'searchOptions': {
    'multipleSearch': True,
    'multipleGroup': True,
    'showQuery': True,
    'caption': 'Advanced Search',
    'closeAfterSearch': True,
    'closeAfterReset': True,
    'sopt': ['eq', 'ne', 'cn', 'bw', 'ew', 'gt', 'ge', 'lt', 'le']
}
```

## Advanced Features

### Subgrid Configuration

```python
'subGrid': True,
'subGridUrl': '/api/jqgrid/subgrid/',
'subGridModel': [{
    'name': ['No', 'Item', 'Qty', 'Unit', 'Line Total'],
    'width': [55, 200, 80, 80, 100],
    'align': ['left', 'left', 'right', 'right', 'right']
}],
'subGridOptions': {
    'plusicon': 'fa fa-plus',
    'minusicon': 'fa fa-minus',
    'openicon': 'fa fa-caret-right'
}
```

### Grouping Configuration

```python
'grouping': True,
'groupingView': {
    'groupField': ['category'],
    'groupColumnShow': [True],
    'groupText': ['<b>{0} - {1} Item(s)</b>'],
    'groupCollapse': False,
    'groupOrder': ['asc'],
    'groupSummary': [True],
    'showSummaryOnHide': True,
    'groupDataSorted': True
}
```

### Tree Grid Configuration

```python
'treeGrid': True,
'treeGridModel': 'adjacency',
'ExpandColumn': 'name',
'treedatatype': 'json',
'treeReader': {
    'level_field': 'level',
    'parent_id_field': 'parent',
    'leaf_field': 'isLeaf',
    'expanded_field': 'expanded'
}
```

## Performance Optimization

```python
# Enable virtual scrolling for large datasets
'scroll': 1,
'scrollrows': True,
'scrollTimeout': 200,

# Lazy loading
'loadonce': False,
'forceClientSorting': False,

# Query optimization
'postData': {
    'optimize': True,
    'select_related': ['category', 'manufacturer'],
    'prefetch_related': ['tags']
}
```

## Security Configuration

```python
# CSRF protection
'ajaxGridOptions': {
    'headers': {
        'X-CSRFToken': '{{ csrf_token }}'
    }
}

# Field-level permissions
'colModel': [
    {
        'name': 'salary',
        'editable': '{% if user.has_perm("view_salary") %}true{% else %}false{% endif %}',
        'hidden': '{% if not user.has_perm("view_salary") %}true{% else %}false{% endif %}'
    }
]
```