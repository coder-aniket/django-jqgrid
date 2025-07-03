"""
Grid configuration builder for django-jqgrid example project.
Provides comprehensive grid configurations with all advanced features.
"""

from typing import Dict, List, Any, Optional
from django.urls import reverse


class GridConfigBuilder:
    """Builder class for creating comprehensive jqGrid configurations."""
    
    def __init__(self, model_name: str, api_url: str):
        self.model_name = model_name
        self.api_url = api_url
        self.config = {
            "status": True,
            "status_code": 200,
            "message": "SUCCESS",
            "data": {
                "jqgrid_options": self._get_default_options(),
                "method_options": self._get_default_method_options(),
                "bulk_action_config": self._get_default_bulk_actions(),
                "header_titles": {},
                "import_config": {},
                "export_config": {},
                "key_field": "id",
                "conditional_formatting": {}
            }
        }
    
    def _get_default_options(self) -> Dict[str, Any]:
        """Get default jqGrid options with all features enabled."""
        return {
            "datatype": "json",
            "mtype": "GET",
            "headertitles": True,
            "styleUI": "Bootstrap5",
            "iconSet": "fontAwesome",
            "responsive": True,
            "rowNum": 25,
            "rowList": [10, 25, 50, 100, 500, 1000],
            "viewrecords": True,
            "gridview": True,
            "height": 500,
            "autowidth": True,
            "multiselect": True,
            "rownumbers": True,
            "altRows": True,
            "hoverrows": True,
            "sortable": True,
            "toolbar": [True, "both"],
            "forceFit": False,
            "autoresizeOnLoad": True,
            "footerrow": True,
            "userDataOnFooter": True,
            "toppager": True,
            "autoencode": True,
            "prmNames": {
                "page": "page",
                "rows": "page_size",
                "sort": "sidx",
                "order": "sord",
                "search": "_search",
                "nd": "nd",
                "id": "id"
            },
            "jsonReader": {
                "root": "rows",
                "page": "page",
                "total": "total",
                "records": "records",
                "id": "id",
                "repeatitems": False
            },
            "url": self.api_url,
            "editurl": f"{self.api_url}edit/",
            "colModel": [],
            "colNames": [],
            "sortname": "id",
            "sortorder": "desc",
            "multiSort": True,
            "shrinkToFit": False,
            "caption": f"{self.model_name} Management",
            "has_batch_actions": True,
            "has_frozen_columns": True,
            "has_grouping": True,
            "has_conditional_formatting": True,
            "has_highlight_rules": True,
            "cellEdit": False,
            "cellsubmit": "remote",
            "cellurl": f"{self.api_url}cell/",
            "inlineEdit": True,
            "editParams": {
                "successfunc": None,
                "url": None,
                "extraparam": {},
                "aftersavefunc": None,
                "errorfunc": None,
                "afterrestorefunc": None,
                "restoreAfterError": True,
                "mtype": "POST"
            }
        }
    
    def _get_default_method_options(self) -> Dict[str, Any]:
        """Get default method options for navigation and toolbar."""
        return {
            "navGrid": {
                "selector": "#jqGridPager",
                "options": {
                    "edit": True,
                    "add": True,
                    "del": True,
                    "search": True,
                    "refresh": True,
                    "view": True,
                    "position": "left",
                    "closeOnEscape": True,
                    "cloneToTop": True
                },
                "editOptions": {
                    "closeOnEscape": True,
                    "editCaption": f"Edit {self.model_name}",
                    "recreateForm": True,
                    "closeAfterEdit": True,
                    "modal": True,
                    "reloadAfterSubmit": True,
                    "width": 600,
                    "height": "auto",
                    "beforeShowForm": "centerDialog",
                    "afterSubmit": "handleFormResponse",
                    "errorTextFormat": "handleSubmitError"
                },
                "addOptions": {
                    "closeOnEscape": True,
                    "addCaption": f"Add New {self.model_name}",
                    "recreateForm": True,
                    "closeAfterAdd": True,
                    "modal": True,
                    "reloadAfterSubmit": True,
                    "width": 600,
                    "height": "auto",
                    "beforeShowForm": "centerDialog",
                    "afterSubmit": "handleFormResponse",
                    "errorTextFormat": "handleSubmitError",
                    "clearAfterAdd": True
                },
                "delOptions": {
                    "reloadAfterSubmit": True,
                    "closeOnEscape": True,
                    "modal": True,
                    "msg": f"Are you sure you want to delete the selected {self.model_name.lower()}(s)?",
                    "caption": f"Delete {self.model_name}",
                    "beforeShowForm": "centerDialog"
                },
                "searchOptions": {
                    "closeOnEscape": True,
                    "multipleSearch": True,
                    "multipleGroup": True,
                    "showQuery": True,
                    "closeAfterSearch": False,
                    "recreateFilter": True,
                    "width": 700,
                    "caption": "Advanced Search",
                    "Find": "Search",
                    "Reset": "Clear",
                    "searchOnEnter": False,
                    "tmplNames": ["Equals", "Not Equals", "Contains", "Starts With", "Ends With"],
                    "tmplFilters": []
                },
                "viewOptions": {
                    "closeOnEscape": True,
                    "width": 600,
                    "modal": True,
                    "caption": f"View {self.model_name} Details",
                    "beforeShowForm": "centerDialog"
                }
            },
            "filterToolbar": {
                "options": {
                    "stringResult": True,
                    "defaultSearch": "cn",
                    "searchOperators": True,
                    "autosearch": True,
                    "searchOnEnter": False,
                    "enableClear": True
                }
            },
            "navButtonAdd": [
                {
                    "selector": "#jqGridPager",
                    "options": {
                        "caption": "Columns",
                        "title": "Choose columns to display",
                        "buttonicon": "fa fa-columns",
                        "onClickButton": "showColumnChooser",
                        "position": "last"
                    }
                },
                {
                    "selector": "#jqGridPager",
                    "options": {
                        "caption": "Export",
                        "title": "Export data",
                        "buttonicon": "fa fa-download",
                        "onClickButton": "showExportDialog",
                        "position": "last"
                    }
                },
                {
                    "selector": "#jqGridPager",
                    "options": {
                        "caption": "Import",
                        "title": "Import data",
                        "buttonicon": "fa fa-upload",
                        "onClickButton": "showImportDialog",
                        "position": "last"
                    }
                }
            ]
        }
    
    def _get_default_bulk_actions(self) -> Dict[str, Any]:
        """Get default bulk action configuration."""
        return {
            "actions": [
                {
                    "id": "bulk-update",
                    "label": "Update Selected",
                    "icon": "fa-edit",
                    "class": "btn-primary",
                    "handler": "bulkUpdate"
                },
                {
                    "id": "bulk-delete",
                    "label": "Delete Selected",
                    "icon": "fa-trash",
                    "class": "btn-danger",
                    "handler": "bulkDelete",
                    "confirm": True,
                    "confirmMessage": "Are you sure you want to delete the selected records?"
                },
                {
                    "id": "bulk-export",
                    "label": "Export Selected",
                    "icon": "fa-file-export",
                    "class": "btn-info",
                    "handler": "bulkExport"
                }
            ],
            "updateableFields": []
        }
    
    def add_action_column(self) -> 'GridConfigBuilder':
        """Add an actions column with edit, view, delete buttons."""
        action_col = {
            "label": "Actions",
            "name": "actions",
            "formatter": "actions",
            "search": False,
            "sortable": False,
            "align": "center",
            "frozen": True,
            "width": 120,
            "formatoptions": {
                "keys": True,
                "editformbutton": False,
                "delbutton": True,
                "editbutton": True,
                "viewbutton": True,
                "editOptions": {
                    "recreateForm": True,
                    "beforeShowForm": "centerDialog"
                },
                "delOptions": {
                    "recreateForm": True,
                    "beforeShowForm": "centerDialog"
                }
            }
        }
        self.config["data"]["jqgrid_options"]["colModel"].insert(0, action_col)
        self.config["data"]["jqgrid_options"]["colNames"].insert(0, "Actions")
        return self
    
    def add_column(self, name: str, label: str, **kwargs) -> 'GridConfigBuilder':
        """Add a column to the grid configuration."""
        col_config = {
            "name": name,
            "index": name,
            "label": label,
            "editable": kwargs.get("editable", True),
            "required": kwargs.get("required", False),
            "search": kwargs.get("search", True),
            "sortable": kwargs.get("sortable", True),
            "autoResizable": kwargs.get("autoResizable", True),
            "width": kwargs.get("width", 120)
        }
        
        # Add search options
        if col_config["search"]:
            col_config["search_ops"] = kwargs.get("search_ops", ["eq", "ne", "cn", "nc", "bw", "bn", "ew", "en"])
            col_config["stype"] = kwargs.get("stype", "text")
            col_config["searchoptions"] = {
                "sopt": col_config["search_ops"]
            }
        
        # Add additional options
        for key, value in kwargs.items():
            if key not in ["editable", "required", "search", "sortable", "autoResizable", "width", "search_ops", "stype"]:
                col_config[key] = value
        
        self.config["data"]["jqgrid_options"]["colModel"].append(col_config)
        self.config["data"]["jqgrid_options"]["colNames"].append(label)
        self.config["data"]["header_titles"][name] = label
        
        return self
    
    def set_caption(self, caption: str) -> 'GridConfigBuilder':
        """Set the grid caption."""
        self.config["data"]["jqgrid_options"]["caption"] = caption
        return self
    
    def set_sort(self, sort_field: str, sort_order: str = "asc") -> 'GridConfigBuilder':
        """Set default sort field and order."""
        self.config["data"]["jqgrid_options"]["sortname"] = sort_field
        self.config["data"]["jqgrid_options"]["sortorder"] = sort_order
        return self
    
    def add_conditional_formatting(self, field: str, rules: Dict[str, Dict[str, str]]) -> 'GridConfigBuilder':
        """Add conditional formatting rules for a field."""
        self.config["data"]["conditional_formatting"][field] = rules
        return self
    
    def set_grouping(self, group_field: str, **kwargs) -> 'GridConfigBuilder':
        """Configure grouping options."""
        if "groupingGroupBy" not in self.config["data"]["method_options"]:
            self.config["data"]["method_options"]["groupingGroupBy"] = {"options": {}}
        
        group_options = {
            "groupField": [group_field],
            "groupColumnShow": kwargs.get("groupColumnShow", [True]),
            "groupText": kwargs.get("groupText", ["<b>{0} - {1} Item(s)</b>"]),
            "groupOrder": kwargs.get("groupOrder", ["asc"]),
            "groupSummary": kwargs.get("groupSummary", [True]),
            "showSummaryOnHide": kwargs.get("showSummaryOnHide", True),
            "groupCollapse": kwargs.get("groupCollapse", False),
            "groupDataSorted": kwargs.get("groupDataSorted", True)
        }
        
        self.config["data"]["method_options"]["groupingGroupBy"]["options"].update(group_options)
        return self
    
    def set_export_config(self, headers: List[str], formats: List[str] = None) -> 'GridConfigBuilder':
        """Configure export options."""
        if formats is None:
            formats = ["xlsx", "csv", "pdf"]
        
        self.config["data"]["export_config"] = {
            "export_return": "file",
            "headers": headers,
            "allowed_formats": formats,
            "header_titles": self.config["data"]["header_titles"].copy()
        }
        return self
    
    def set_import_config(self, headers: List[str], formats: List[str] = None) -> 'GridConfigBuilder':
        """Configure import options."""
        if formats is None:
            formats = ["csv", "xls", "xlsx"]
        
        self.config["data"]["import_config"] = {
            "headers": headers,
            "allowed_formats": formats,
            "header_titles": self.config["data"]["header_titles"].copy()
        }
        return self
    
    def add_bulk_updateable_field(self, field: str) -> 'GridConfigBuilder':
        """Add a field that can be bulk updated."""
        if field not in self.config["data"]["bulk_action_config"]["updateableFields"]:
            self.config["data"]["bulk_action_config"]["updateableFields"].append(field)
        return self
    
    def build(self) -> Dict[str, Any]:
        """Build and return the final configuration."""
        return self.config


def get_products_grid_config() -> Dict[str, Any]:
    """Get comprehensive grid configuration for products."""
    builder = GridConfigBuilder("Product", "/examples/api/products/")
    
    config = (builder
        .set_caption("Products Management - Advanced Grid")
        .add_action_column()
        .add_column("id", "ID", width=60, key=True, hidden=True)
        .add_column("name", "Product Name", 
                   required=True,
                   search_ops=["eq", "ne", "cn", "nc", "bw", "bn", "ew", "en"],
                   formoptions={"colpos": 1, "rowpos": 1})
        .add_column("sku", "SKU", 
                   required=True,
                   width=100,
                   formoptions={"colpos": 2, "rowpos": 1})
        .add_column("price", "Price",
                   formatter="currency",
                   align="right",
                   formatoptions={"prefix": "$", "decimalPlaces": 2},
                   editrules={"number": True, "minValue": 0},
                   formoptions={"colpos": 3, "rowpos": 1})
        .add_column("stock_quantity", "Stock",
                   formatter="integer",
                   align="center",
                   width=80,
                   editrules={"integer": True, "minValue": 0},
                   formoptions={"colpos": 4, "rowpos": 1})
        .add_column("stock_status", "Stock Status",
                   formatter="select",
                   edittype="select",
                   editoptions={"value": "In Stock:In Stock;Low Stock:Low Stock;Out of Stock:Out of Stock"},
                   stype="select",
                   searchoptions={"value": ":All;In Stock:In Stock;Low Stock:Low Stock;Out of Stock:Out of Stock"},
                   formoptions={"colpos": 1, "rowpos": 2})
        .add_column("status", "Status",
                   formatter="select",
                   edittype="select",
                   editoptions={"value": "active:Active;inactive:Inactive;draft:Draft;discontinued:Discontinued"},
                   stype="select",
                   searchoptions={"value": ":All;active:Active;inactive:Inactive;draft:Draft;discontinued:Discontinued"},
                   groupable=True,
                   formoptions={"colpos": 2, "rowpos": 2})
        .add_column("category", "Category",
                   formatter="select",
                   edittype="select",
                   editoptions={"dataUrl": "/examples/api/categories/dropdown/"},
                   stype="select",
                   groupable=True,
                   formoptions={"colpos": 3, "rowpos": 2})
        .add_column("is_featured", "Featured",
                   formatter="checkbox",
                   edittype="checkbox",
                   editoptions={"value": "1:0"},
                   stype="checkbox",
                   align="center",
                   width=80,
                   formoptions={"colpos": 4, "rowpos": 2})
        .add_column("is_digital", "Digital",
                   formatter="checkbox",
                   edittype="checkbox",
                   editoptions={"value": "1:0"},
                   stype="checkbox",
                   align="center",
                   width=80,
                   formoptions={"colpos": 1, "rowpos": 3})
        .add_column("description", "Description",
                   edittype="textarea",
                   editoptions={"rows": 3, "cols": 40},
                   search=False,
                   sortable=False,
                   width=250,
                   formoptions={"colpos": 2, "rowpos": 3, "colspan": 3})
        .add_column("created_at", "Created Date",
                   formatter="date",
                   formatoptions={"srcformat": "Y-m-d H:i:s", "newformat": "Y-m-d"},
                   editable=False,
                   width=100)
        .add_column("created_by", "Created By",
                   editable=False,
                   formatter="select",
                   editoptions={"dataUrl": "/examples/api/users/dropdown/"})
        .set_sort("created_at", "desc")
        .set_grouping("category")
        .add_conditional_formatting("status", {
            "active": {"background_color": "#d4edda", "color": "#155724"},
            "inactive": {"background_color": "#f8d7da", "color": "#721c24"},
            "draft": {"background_color": "#fff3cd", "color": "#856404"},
            "discontinued": {"background_color": "#e2e3e5", "color": "#383d41"}
        })
        .add_conditional_formatting("stock_status", {
            "In Stock": {"background_color": "#d4edda", "color": "#155724"},
            "Low Stock": {"background_color": "#fff3cd", "color": "#856404"},
            "Out of Stock": {"background_color": "#f8d7da", "color": "#721c24"}
        })
        .add_bulk_updateable_field("status")
        .add_bulk_updateable_field("category")
        .add_bulk_updateable_field("is_featured")
        .set_export_config(["id", "name", "sku", "price", "stock_quantity", "status", "category", "created_at"])
        .set_import_config(["name", "sku", "price", "stock_quantity", "status", "category", "description"])
        .build()
    )
    
    # Add custom bulk actions for products
    config["data"]["bulk_action_config"]["actions"].extend([
        {
            "id": "update-prices",
            "label": "Update Prices",
            "icon": "fa-dollar-sign",
            "class": "btn-warning",
            "handler": "updatePrices"
        },
        {
            "id": "toggle-featured",
            "label": "Toggle Featured",
            "icon": "fa-star",
            "class": "btn-info",
            "handler": "toggleFeatured"
        }
    ])
    
    return config


def get_customers_grid_config() -> Dict[str, Any]:
    """Get comprehensive grid configuration for customers."""
    builder = GridConfigBuilder("Customer", "/examples/api/customers/")
    
    config = (builder
        .set_caption("Customers Management - Advanced Grid")
        .add_action_column()
        .add_column("id", "ID", width=60, key=True, hidden=True)
        .add_column("first_name", "First Name",
                   required=True,
                   formoptions={"colpos": 1, "rowpos": 1})
        .add_column("last_name", "Last Name",
                   required=True,
                   formoptions={"colpos": 2, "rowpos": 1})
        .add_column("email", "Email",
                   required=True,
                   formatter="email",
                   editrules={"email": True},
                   formoptions={"colpos": 3, "rowpos": 1})
        .add_column("phone", "Phone",
                   formatter="mobile",
                   formoptions={"colpos": 4, "rowpos": 1})
        .add_column("customer_type", "Type",
                   formatter="select",
                   edittype="select",
                   editoptions={"value": "individual:Individual;business:Business;vip:VIP"},
                   stype="select",
                   searchoptions={"value": ":All;individual:Individual;business:Business;vip:VIP"},
                   groupable=True,
                   formoptions={"colpos": 1, "rowpos": 2})
        .add_column("is_active", "Active",
                   formatter="checkbox",
                   edittype="checkbox",
                   editoptions={"value": "1:0"},
                   stype="checkbox",
                   align="center",
                   width=80,
                   formoptions={"colpos": 2, "rowpos": 2})
        .add_column("credit_limit", "Credit Limit",
                   formatter="currency",
                   align="right",
                   formatoptions={"prefix": "$", "decimalPlaces": 2},
                   editrules={"number": True, "minValue": 0},
                   formoptions={"colpos": 3, "rowpos": 2})
        .add_column("balance", "Balance",
                   formatter="currency",
                   align="right",
                   formatoptions={"prefix": "$", "decimalPlaces": 2},
                   editable=False,
                   formoptions={"colpos": 4, "rowpos": 2})
        .add_column("address", "Address",
                   edittype="textarea",
                   editoptions={"rows": 2, "cols": 40},
                   search=False,
                   sortable=False,
                   formoptions={"colpos": 1, "rowpos": 3, "colspan": 2})
        .add_column("city", "City",
                   formoptions={"colpos": 3, "rowpos": 3})
        .add_column("state", "State",
                   width=80,
                   formoptions={"colpos": 4, "rowpos": 3})
        .add_column("zip_code", "ZIP",
                   width=80,
                   formoptions={"colpos": 1, "rowpos": 4})
        .add_column("country", "Country",
                   edittype="select",
                   editoptions={"value": "US:United States;CA:Canada;UK:United Kingdom;AU:Australia"},
                   formoptions={"colpos": 2, "rowpos": 4})
        .add_column("notes", "Notes",
                   edittype="textarea",
                   editoptions={"rows": 3, "cols": 40},
                   search=False,
                   sortable=False,
                   formoptions={"colpos": 3, "rowpos": 4, "colspan": 2})
        .add_column("registration_date", "Registration Date",
                   formatter="date",
                   formatoptions={"srcformat": "Y-m-d", "newformat": "Y-m-d"},
                   editable=False)
        .add_column("last_order_date", "Last Order",
                   formatter="date",
                   formatoptions={"srcformat": "Y-m-d", "newformat": "Y-m-d"},
                   editable=False)
        .add_column("order_count", "Orders",
                   formatter="integer",
                   align="center",
                   editable=False,
                   width=80)
        .set_sort("registration_date", "desc")
        .set_grouping("customer_type")
        .add_conditional_formatting("customer_type", {
            "individual": {"background_color": "#e7f3ff", "color": "#004085"},
            "business": {"background_color": "#e2e3e5", "color": "#383d41"},
            "vip": {"background_color": "#f0e7ff", "color": "#5a2a7a"}
        })
        .add_conditional_formatting("is_active", {
            "true": {"background_color": "#d4edda", "color": "#155724"},
            "false": {"background_color": "#f8d7da", "color": "#721c24"}
        })
        .add_bulk_updateable_field("customer_type")
        .add_bulk_updateable_field("is_active")
        .add_bulk_updateable_field("credit_limit")
        .set_export_config(["id", "first_name", "last_name", "email", "phone", "customer_type", "is_active", "registration_date"])
        .set_import_config(["first_name", "last_name", "email", "phone", "customer_type", "address", "city", "state", "zip_code", "country"])
        .build()
    )
    
    # Add custom bulk actions for customers
    config["data"]["bulk_action_config"]["actions"].extend([
        {
            "id": "send-email",
            "label": "Send Email",
            "icon": "fa-envelope",
            "class": "btn-primary",
            "handler": "sendBulkEmail"
        },
        {
            "id": "export-contacts",
            "label": "Export Contacts",
            "icon": "fa-address-book",
            "class": "btn-success",
            "handler": "exportContacts"
        }
    ])
    
    return config


def get_orders_grid_config() -> Dict[str, Any]:
    """Get comprehensive grid configuration for orders."""
    builder = GridConfigBuilder("Order", "/examples/api/orders/")
    
    config = (builder
        .set_caption("Orders Management - Advanced Grid")
        .add_action_column()
        .add_column("id", "ID", width=60, key=True, hidden=True)
        .add_column("order_number", "Order #",
                   required=True,
                   width=120,
                   formoptions={"colpos": 1, "rowpos": 1})
        .add_column("customer_name", "Customer",
                   formatter="select",
                   edittype="select",
                   editoptions={"dataUrl": "/examples/api/customers/dropdown/"},
                   formoptions={"colpos": 2, "rowpos": 1})
        .add_column("order_date", "Order Date",
                   formatter="date",
                   formatoptions={"srcformat": "Y-m-d H:i:s", "newformat": "Y-m-d H:i"},
                   edittype="text",
                   editoptions={"dataInit": "initDatepicker"},
                   formoptions={"colpos": 3, "rowpos": 1})
        .add_column("status", "Status",
                   formatter="select",
                   edittype="select",
                   editoptions={"value": "pending:Pending;processing:Processing;shipped:Shipped;delivered:Delivered;cancelled:Cancelled;refunded:Refunded"},
                   stype="select",
                   searchoptions={"value": ":All;pending:Pending;processing:Processing;shipped:Shipped;delivered:Delivered;cancelled:Cancelled;refunded:Refunded"},
                   groupable=True,
                   formoptions={"colpos": 4, "rowpos": 1})
        .add_column("subtotal", "Subtotal",
                   formatter="currency",
                   align="right",
                   formatoptions={"prefix": "$", "decimalPlaces": 2},
                   editable=False)
        .add_column("tax_amount", "Tax",
                   formatter="currency",
                   align="right",
                   formatoptions={"prefix": "$", "decimalPlaces": 2},
                   editable=False)
        .add_column("shipping_amount", "Shipping",
                   formatter="currency",
                   align="right",
                   formatoptions={"prefix": "$", "decimalPlaces": 2},
                   formoptions={"colpos": 1, "rowpos": 2})
        .add_column("total_amount", "Total",
                   formatter="currency",
                   align="right",
                   formatoptions={"prefix": "$", "decimalPlaces": 2, "suffix": " USD"},
                   editable=False,
                   summaryType="sum",
                   summaryTpl="<b>Total: {0}</b>")
        .add_column("payment_method", "Payment",
                   formatter="select",
                   edittype="select",
                   editoptions={"value": "credit_card:Credit Card;paypal:PayPal;bank_transfer:Bank Transfer;cash:Cash"},
                   formoptions={"colpos": 2, "rowpos": 2})
        .add_column("payment_status", "Payment Status",
                   formatter="select",
                   edittype="select",
                   editoptions={"value": "pending:Pending;paid:Paid;failed:Failed;refunded:Refunded"},
                   stype="select",
                   searchoptions={"value": ":All;pending:Pending;paid:Paid;failed:Failed;refunded:Refunded"},
                   formoptions={"colpos": 3, "rowpos": 2})
        .add_column("shipping_address", "Shipping Address",
                   edittype="textarea",
                   editoptions={"rows": 2, "cols": 40},
                   search=False,
                   sortable=False,
                   formoptions={"colpos": 1, "rowpos": 3, "colspan": 2})
        .add_column("tracking_number", "Tracking #",
                   formoptions={"colpos": 3, "rowpos": 3})
        .add_column("shipped_date", "Shipped Date",
                   formatter="date",
                   formatoptions={"srcformat": "Y-m-d", "newformat": "Y-m-d"},
                   edittype="text",
                   editoptions={"dataInit": "initDatepicker"},
                   formoptions={"colpos": 4, "rowpos": 3})
        .add_column("notes", "Order Notes",
                   edittype="textarea",
                   editoptions={"rows": 3, "cols": 40},
                   search=False,
                   sortable=False,
                   formoptions={"colpos": 1, "rowpos": 4, "colspan": 4})
        .set_sort("order_date", "desc")
        .set_grouping("status")
        .add_conditional_formatting("status", {
            "pending": {"background_color": "#fff3cd", "color": "#856404"},
            "processing": {"background_color": "#cce5ff", "color": "#004085"},
            "shipped": {"background_color": "#d1ecf1", "color": "#0c5460"},
            "delivered": {"background_color": "#d4edda", "color": "#155724"},
            "cancelled": {"background_color": "#f8d7da", "color": "#721c24"},
            "refunded": {"background_color": "#e2e3e5", "color": "#383d41"}
        })
        .add_conditional_formatting("payment_status", {
            "pending": {"background_color": "#fff3cd", "color": "#856404"},
            "paid": {"background_color": "#d4edda", "color": "#155724"},
            "failed": {"background_color": "#f8d7da", "color": "#721c24"},
            "refunded": {"background_color": "#e2e3e5", "color": "#383d41"}
        })
        .add_bulk_updateable_field("status")
        .add_bulk_updateable_field("payment_status")
        .set_export_config(["id", "order_number", "customer_name", "order_date", "status", "total_amount", "payment_method", "payment_status"])
        .set_import_config(["order_number", "customer_email", "order_date", "status", "shipping_address"])
        .build()
    )
    
    # Add custom bulk actions for orders
    config["data"]["bulk_action_config"]["actions"].extend([
        {
            "id": "print-invoices",
            "label": "Print Invoices",
            "icon": "fa-print",
            "class": "btn-secondary",
            "handler": "printInvoices"
        },
        {
            "id": "ship-orders",
            "label": "Mark as Shipped",
            "icon": "fa-truck",
            "class": "btn-primary",
            "handler": "markAsShipped"
        },
        {
            "id": "send-tracking",
            "label": "Send Tracking Info",
            "icon": "fa-envelope",
            "class": "btn-info",
            "handler": "sendTrackingInfo"
        }
    ])
    
    return config


def get_categories_grid_config() -> Dict[str, Any]:
    """Get comprehensive grid configuration for categories."""
    builder = GridConfigBuilder("Category", "/examples/api/categories/")
    
    config = (builder
        .set_caption("Categories Management - Advanced Grid")
        .add_action_column()
        .add_column("id", "ID", width=60, key=True, hidden=True)
        .add_column("name", "Category Name",
                   required=True,
                   width=200,
                   formoptions={"colpos": 1, "rowpos": 1})
        .add_column("description", "Description",
                   edittype="textarea",
                   editoptions={"rows": 3, "cols": 40},
                   search=False,
                   width=300,
                   formoptions={"colpos": 2, "rowpos": 1, "colspan": 2})
        .add_column("parent_category", "Parent Category",
                   formatter="select",
                   edittype="select",
                   editoptions={"dataUrl": "/examples/api/categories/dropdown/?exclude_self=true"},
                   formoptions={"colpos": 1, "rowpos": 2})
        .add_column("slug", "URL Slug",
                   formoptions={"colpos": 2, "rowpos": 2})
        .add_column("active", "Active",
                   formatter="checkbox",
                   edittype="checkbox",
                   editoptions={"value": "1:0"},
                   stype="checkbox",
                   align="center",
                   width=80,
                   formoptions={"colpos": 3, "rowpos": 2})
        .add_column("sort_order", "Sort Order",
                   formatter="integer",
                   align="center",
                   editrules={"integer": True, "minValue": 0},
                   width=100,
                   formoptions={"colpos": 4, "rowpos": 2})
        .add_column("product_count", "Products",
                   formatter="integer",
                   align="center",
                   editable=False,
                   width=100)
        .add_column("created_at", "Created",
                   formatter="date",
                   formatoptions={"srcformat": "Y-m-d H:i:s", "newformat": "Y-m-d"},
                   editable=False,
                   width=100)
        .add_column("updated_at", "Updated",
                   formatter="date",
                   formatoptions={"srcformat": "Y-m-d H:i:s", "newformat": "Y-m-d"},
                   editable=False,
                   width=100)
        .set_sort("sort_order", "asc")
        .add_conditional_formatting("active", {
            "true": {"background_color": "#d4edda", "color": "#155724"},
            "false": {"background_color": "#f8d7da", "color": "#721c24"}
        })
        .add_bulk_updateable_field("active")
        .add_bulk_updateable_field("parent_category")
        .set_export_config(["id", "name", "description", "active", "sort_order", "product_count"])
        .set_import_config(["name", "description", "parent_category", "active", "sort_order"])
        .build()
    )
    
    # Add custom bulk actions for categories
    config["data"]["bulk_action_config"]["actions"].extend([
        {
            "id": "toggle-active",
            "label": "Toggle Active",
            "icon": "fa-toggle-on",
            "class": "btn-warning",
            "handler": "toggleActive"
        },
        {
            "id": "reorder",
            "label": "Reorder",
            "icon": "fa-sort",
            "class": "btn-info",
            "handler": "showReorderDialog"
        }
    ])
    
    return config