/**
 * All Features jqGrid Example
 * Demonstrates every feature of jqGrid with all flags enabled
 */

// Sample data with hierarchy for TreeGrid
const allFeaturesData = [
    {
        id: 1, 
        name: "Electronics Category", 
        type: "category",
        price: null, 
        stock: null, 
        sales: 1500000,
        rating: 4.5,
        featured: true,
        status: "active",
        created: "2024-01-01",
        level: "0", 
        parent: "", 
        isLeaf: false, 
        expanded: true,
        loaded: true
    },
    {
        id: 2, 
        name: "Laptop Pro X1", 
        type: "product",
        price: 1299.99, 
        stock: 50, 
        sales: 125000,
        rating: 4.8,
        featured: true,
        status: "active",
        created: "2024-01-15",
        description: "High-performance laptop with latest specs",
        level: "1", 
        parent: "1", 
        isLeaf: true, 
        expanded: false
    },
    {
        id: 3, 
        name: "Smartphone Ultra", 
        type: "product",
        price: 899.99, 
        stock: 120, 
        sales: 250000,
        rating: 4.6,
        featured: true,
        status: "active",
        created: "2024-01-20",
        description: "Latest flagship smartphone",
        level: "1", 
        parent: "1", 
        isLeaf: true, 
        expanded: false
    },
    {
        id: 4, 
        name: "Books Category", 
        type: "category",
        price: null, 
        stock: null, 
        sales: 500000,
        rating: 4.3,
        featured: false,
        status: "active",
        created: "2024-01-05",
        level: "0", 
        parent: "", 
        isLeaf: false, 
        expanded: false,
        loaded: true
    },
    {
        id: 5, 
        name: "Programming Guide", 
        type: "product",
        price: 49.99, 
        stock: 200, 
        sales: 50000,
        rating: 4.9,
        featured: true,
        status: "active",
        created: "2024-02-01",
        description: "Comprehensive programming reference",
        level: "1", 
        parent: "4", 
        isLeaf: true, 
        expanded: false
    },
    {
        id: 6, 
        name: "Wireless Mouse", 
        type: "product",
        price: 29.99, 
        stock: 300, 
        sales: 75000,
        rating: 4.2,
        featured: false,
        status: "active",
        created: "2024-02-10",
        description: "Ergonomic wireless mouse",
        level: "1", 
        parent: "1", 
        isLeaf: true, 
        expanded: false
    },
    {
        id: 7, 
        name: "Data Science Handbook", 
        type: "product",
        price: 59.99, 
        stock: 80, 
        sales: 30000,
        rating: 4.7,
        featured: false,
        status: "inactive",
        created: "2024-02-15",
        description: "Learn data science from scratch",
        level: "1", 
        parent: "4", 
        isLeaf: true, 
        expanded: false
    },
    {
        id: 8, 
        name: "Clothing Category", 
        type: "category",
        price: null, 
        stock: null, 
        sales: 800000,
        rating: 4.1,
        featured: false,
        status: "active",
        created: "2024-01-10",
        level: "0", 
        parent: "", 
        isLeaf: false, 
        expanded: false,
        loaded: true
    },
    {
        id: 9, 
        name: "T-Shirt Premium", 
        type: "product",
        price: 24.99, 
        stock: 500, 
        sales: 100000,
        rating: 4.4,
        featured: false,
        status: "active",
        created: "2024-02-20",
        description: "100% cotton premium t-shirt",
        level: "1", 
        parent: "8", 
        isLeaf: true, 
        expanded: false
    },
    {
        id: 10, 
        name: "Jeans Classic", 
        type: "product",
        price: 79.99, 
        stock: 150, 
        sales: 120000,
        rating: 4.5,
        featured: true,
        status: "active",
        created: "2024-02-25",
        description: "Classic fit denim jeans",
        level: "1", 
        parent: "8", 
        isLeaf: true, 
        expanded: false
    }
];

// Custom formatters
$.fn.fmatter.statusFormatter = function(cellvalue, options, rowObject) {
    const statusColors = {
        'active': 'success',
        'inactive': 'danger',
        'pending': 'warning'
    };
    const color = statusColors[cellvalue] || 'secondary';
    return `<span class="badge bg-${color}">${cellvalue}</span>`;
};

$.fn.fmatter.ratingFormatter = function(cellvalue, options, rowObject) {
    if (!cellvalue) return '';
    const stars = Math.round(cellvalue);
    let html = '<span class="text-warning">';
    for (let i = 0; i < 5; i++) {
        html += i < stars ? '★' : '☆';
    }
    html += `</span> <small>(${cellvalue})</small>`;
    return html;
};

$.fn.fmatter.priceFormatter = function(cellvalue, options, rowObject) {
    if (cellvalue === null || cellvalue === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(cellvalue);
};

$.fn.fmatter.salesFormatter = function(cellvalue, options, rowObject) {
    if (!cellvalue) return '-';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(cellvalue);
};

$.fn.fmatter.stockFormatter = function(cellvalue, options, rowObject) {
    if (cellvalue === null || cellvalue === undefined) return '-';
    let colorClass = 'text-success';
    if (cellvalue === 0) colorClass = 'text-danger';
    else if (cellvalue < 50) colorClass = 'text-warning';
    return `<span class="${colorClass}"><strong>${cellvalue}</strong></span>`;
};

// Initialize the grid with ALL features
$(document).ready(function() {
    $("#allFeaturesGrid").jqGrid({
        // Data Configuration
        datatype: "local",
        data: allFeaturesData,
        
        // Column Model with all features
        colModel: [
            {
                name: 'id', 
                index: 'id', 
                width: 60, 
                key: true, 
                hidden: false,
                editable: false,
                sortable: true,
                search: true,
                resizable: true,
                frozen: true,
                label: 'ID'
            },
            {
                name: 'name', 
                index: 'name', 
                width: 200, 
                editable: true,
                edittype: 'text',
                editrules: {required: true},
                sortable: true,
                search: true,
                searchoptions: {sopt: ['eq','ne','bw','bn','ew','en','cn','nc']},
                resizable: true,
                frozen: true,
                label: 'Name'
            },
            {
                name: 'type', 
                index: 'type', 
                width: 100,
                editable: true,
                edittype: 'select',
                editoptions: {value: "category:Category;product:Product"},
                sortable: true,
                search: true,
                stype: 'select',
                searchoptions: {value: ":All;category:Category;product:Product"},
                resizable: true,
                label: 'Type'
            },
            {
                name: 'price', 
                index: 'price', 
                width: 100, 
                align: 'right',
                formatter: 'priceFormatter',
                editable: true,
                edittype: 'text',
                editrules: {number: true, minValue: 0},
                sortable: true,
                sorttype: 'number',
                search: true,
                searchoptions: {sopt: ['eq','ne','lt','le','gt','ge']},
                resizable: true,
                label: 'Price'
            },
            {
                name: 'stock', 
                index: 'stock', 
                width: 80, 
                align: 'center',
                formatter: 'stockFormatter',
                editable: true,
                edittype: 'text',
                editrules: {integer: true, minValue: 0},
                sortable: true,
                sorttype: 'integer',
                search: true,
                searchoptions: {sopt: ['eq','ne','lt','le','gt','ge']},
                resizable: true,
                label: 'Stock'
            },
            {
                name: 'sales', 
                index: 'sales', 
                width: 120, 
                align: 'right',
                formatter: 'salesFormatter',
                editable: true,
                edittype: 'text',
                editrules: {number: true, minValue: 0},
                sortable: true,
                sorttype: 'number',
                search: true,
                resizable: true,
                label: 'Total Sales'
            },
            {
                name: 'rating', 
                index: 'rating', 
                width: 120, 
                align: 'center',
                formatter: 'ratingFormatter',
                editable: true,
                edittype: 'text',
                editrules: {number: true, minValue: 0, maxValue: 5},
                sortable: true,
                sorttype: 'number',
                search: true,
                resizable: true,
                label: 'Rating'
            },
            {
                name: 'featured', 
                index: 'featured', 
                width: 80, 
                align: 'center',
                formatter: 'checkbox',
                editable: true,
                edittype: 'checkbox',
                editoptions: {value: "true:false"},
                sortable: true,
                search: true,
                stype: 'select',
                searchoptions: {value: "true:Yes;false:No"},
                resizable: true,
                label: 'Featured'
            },
            {
                name: 'status', 
                index: 'status', 
                width: 100, 
                align: 'center',
                formatter: 'statusFormatter',
                editable: true,
                edittype: 'select',
                editoptions: {value: "active:Active;inactive:Inactive;pending:Pending"},
                sortable: true,
                search: true,
                stype: 'select',
                searchoptions: {value: ":All;active:Active;inactive:Inactive;pending:Pending"},
                resizable: true,
                label: 'Status'
            },
            {
                name: 'created', 
                index: 'created', 
                width: 100,
                formatter: 'date',
                formatoptions: {srcformat: 'Y-m-d', newformat: 'Y-m-d'},
                editable: true,
                edittype: 'text',
                editoptions: {
                    dataInit: function(element) {
                        $(element).datepicker({
                            dateFormat: 'yy-mm-dd',
                            changeMonth: true,
                            changeYear: true
                        });
                    }
                },
                sortable: true,
                sorttype: 'date',
                search: true,
                searchoptions: {
                    dataInit: function(element) {
                        $(element).datepicker({
                            dateFormat: 'yy-mm-dd',
                            changeMonth: true,
                            changeYear: true
                        });
                    }
                },
                resizable: true,
                label: 'Created Date'
            },
            {
                name: 'description', 
                index: 'description', 
                width: 200,
                editable: true,
                edittype: 'textarea',
                editoptions: {rows: 3, cols: 30},
                sortable: false,
                search: true,
                resizable: true,
                hidden: true,
                label: 'Description'
            }
        ],
        
        // Grid Configuration - ALL FEATURES ENABLED
        pager: "#allFeaturesPager",
        rowNum: 10,
        rowList: [5, 10, 20, 30, 50, 100],
        sortname: 'id',
        sortorder: "asc",
        viewrecords: true,
        gridview: true,
        autoencode: true,
        ignoreCase: true,
        height: 'auto',
        autowidth: true,
        shrinkToFit: true,
        forceFit: false,
        
        // Selection Features
        multiselect: true,
        multiboxonly: true,
        multiselectWidth: 30,
        
        // Row Features
        rownumbers: true,
        rownumWidth: 50,
        
        // Editing Features
        cellEdit: true,
        cellsubmit: 'clientArray',
        cellurl: '/api/cell-update/',
        
        // TreeGrid Configuration
        treeGrid: true,
        treeGridModel: 'adjacency',
        ExpandColumn: 'name',
        treedatatype: "local",
        treeReader: {
            parent_id_field: "parent",
            level_field: "level",
            leaf_field: "isLeaf",
            expanded_field: "expanded",
            loaded: "loaded",
            icon_field: "icon"
        },
        
        // Grouping Configuration
        grouping: false,
        groupingView: {
            groupField: ['type'],
            groupColumnShow: [true],
            groupText: ['<b>{0} - {1} Item(s)</b>'],
            groupCollapse: false,
            groupOrder: ['asc'],
            groupSummary: [true],
            showSummaryOnHide: true,
            groupDataSorted: true
        },
        
        // SubGrid Configuration
        subGrid: true,
        subGridUrl: '/api/subgrid/',
        subGridModel: [{
            name: ['No', 'Item', 'Qty', 'Unit', 'Line Total'],
            width: [55, 200, 80, 80, 100],
            align: ['left', 'left', 'right', 'left', 'right']
        }],
        subGridWidth: 25,
        subGridRowExpanded: function(subgrid_id, row_id) {
            const subgrid_table_id = subgrid_id + "_t";
            const pager_id = "p_" + subgrid_table_id;
            $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table><div id='" + pager_id + "' class='scroll'></div>");
            
            // Sample subgrid data
            const subgridData = [
                {id: 1, item: "Component A", qty: 10, unit: "pcs", total: 299.90},
                {id: 2, item: "Component B", qty: 5, unit: "pcs", total: 149.95}
            ];
            
            $("#" + subgrid_table_id).jqGrid({
                datatype: "local",
                data: subgridData,
                colNames: ['No', 'Item', 'Qty', 'Unit', 'Line Total'],
                colModel: [
                    {name: "id", index: "id", width: 55},
                    {name: "item", index: "item", width: 200},
                    {name: "qty", index: "qty", width: 80, align: "right"},
                    {name: "unit", index: "unit", width: 80},
                    {name: "total", index: "total", width: 100, align: "right", formatter: 'currency'}
                ],
                rowNum: 20,
                pager: pager_id,
                sortname: 'id',
                sortorder: "asc",
                height: '100%'
            });
        },
        
        // Footer Row
        footerrow: true,
        userDataOnFooter: true,
        altRows: true,
        altclass: 'table-secondary',
        
        // Scrolling
        scroll: false,
        scrollrows: true,
        
        // Column Features
        sortable: true,
        columnChooser: true,
        headertitles: true,
        
        // Search/Filter Features
        search: true,
        searchOnEnter: true,
        
        // Caption
        caption: "All Features Grid - Every Option Enabled",
        hidegrid: true,
        hiddengrid: false,
        
        // Events
        loadComplete: function() {
            // Calculate footer totals
            const grid = $(this);
            const totalSales = grid.jqGrid('getCol', 'sales', false, 'sum');
            const totalStock = grid.jqGrid('getCol', 'stock', false, 'sum');
            
            grid.jqGrid('footerData', 'set', {
                name: 'Totals:',
                sales: totalSales,
                stock: totalStock
            });
            
            console.log("Grid loaded successfully with all features");
        },
        
        onSelectRow: function(rowid, status, e) {
            console.log("Row selected:", rowid, "Status:", status);
        },
        
        onCellSelect: function(rowid, iCol, cellcontent, e) {
            console.log("Cell selected - Row:", rowid, "Column:", iCol);
        },
        
        beforeSelectRow: function(rowid, e) {
            return true; // Allow selection
        },
        
        ondblClickRow: function(rowid, iRow, iCol, e) {
            console.log("Double click on row:", rowid);
            editSelectedRow();
        },
        
        onRightClickRow: function(rowid, iRow, iCol, e) {
            // Show context menu
            $("#allFeaturesGrid").jqGrid('setSelection', rowid);
            $("#contextMenu").css({
                top: e.pageY + "px",
                left: e.pageX + "px"
            }).show();
            return false;
        },
        
        gridComplete: function() {
            // Enable keyboard navigation
            $(this).jqGrid('bindKeys');
            
            // Setup frozen columns
            $(this).jqGrid('setFrozenColumns');
        },
        
        resizeStop: function(width, index) {
            console.log("Column resized - Index:", index, "New width:", width);
        },
        
        onSortCol: function(index, iCol, sortorder) {
            console.log("Sorting by:", index, "Order:", sortorder);
        }
    });
    
    // Add navigation bar with all options
    $("#allFeaturesGrid").jqGrid('navGrid', '#allFeaturesPager',
        {
            // Navigation options - ALL ENABLED
            edit: true,
            add: true,
            del: true,
            search: true,
            refresh: true,
            view: true,
            position: "left",
            cloneToTop: true
        },
        {
            // Edit options
            recreateForm: true,
            closeAfterEdit: true,
            reloadAfterSubmit: true,
            closeOnEscape: true,
            modal: true,
            width: 500,
            height: 'auto',
            beforeShowForm: function(form) {
                centerDialog(form);
            }
        },
        {
            // Add options
            recreateForm: true,
            closeAfterAdd: true,
            reloadAfterSubmit: true,
            closeOnEscape: true,
            modal: true,
            width: 500,
            height: 'auto',
            beforeShowForm: function(form) {
                centerDialog(form);
            }
        },
        {
            // Delete options
            recreateForm: true,
            closeOnEscape: true,
            modal: true,
            msg: "Are you sure you want to delete this record?",
            beforeShowForm: function(form) {
                centerDialog(form);
            }
        },
        {
            // Search options
            recreateForm: true,
            closeAfterSearch: true,
            closeOnEscape: true,
            modal: true,
            multipleSearch: true,
            multipleGroup: true,
            showQuery: true,
            width: 600,
            beforeShowForm: function(form) {
                centerDialog(form);
            }
        },
        {
            // View options
            recreateForm: true,
            closeOnEscape: true,
            modal: true,
            width: 500,
            beforeShowForm: function(form) {
                centerDialog(form);
            }
        }
    );
    
    // Add custom buttons to navigation
    $("#allFeaturesGrid").jqGrid('navButtonAdd', '#allFeaturesPager', {
        caption: "Columns",
        title: "Choose columns to display",
        buttonicon: "ui-icon-calculator",
        onClickButton: function() {
            $(this).jqGrid('columnChooser', {
                modal: true,
                width: 550,
                done: function(perm) {
                    if (perm) {
                        this.jqGrid("remapColumns", perm, true);
                    }
                }
            });
        }
    });
    
    $("#allFeaturesGrid").jqGrid('navButtonAdd', '#allFeaturesPager', {
        caption: "Export",
        title: "Export to CSV",
        buttonicon: "ui-icon-disk",
        onClickButton: function() {
            exportGrid('csv');
        }
    });
    
    // Add filter toolbar
    $("#allFeaturesGrid").jqGrid('filterToolbar', {
        searchOnEnter: false,
        enableClear: true,
        defaultSearch: 'cn'
    });
    
    // Enable grid resize
    $(window).on('resize', function() {
        const newWidth = $('.all-features-grid').width();
        $("#allFeaturesGrid").jqGrid('setGridWidth', newWidth, true);
    }).trigger('resize');
    
    // Hide context menu when clicking elsewhere
    $(document).click(function() {
        $("#contextMenu").hide();
    });
});

// Utility functions
function centerDialog(form) {
    const dlg = $(form).parent();
    const parentOffset = dlg.parent().offset();
    dlg.css({
        top: Math.max(0, (($(window).height() - dlg.outerHeight()) / 2)) + "px",
        left: Math.max(0, (($(window).width() - dlg.outerWidth()) / 2)) + "px"
    });
}

function toggleGrouping() {
    const grid = $("#allFeaturesGrid");
    const grouping = grid.jqGrid('getGridParam', 'grouping');
    
    if (!grouping) {
        // TreeGrid and grouping are mutually exclusive
        grid.jqGrid('setGridParam', {treeGrid: false});
        grid.jqGrid('groupingGroupBy', 'type');
    } else {
        grid.jqGrid('groupingRemove');
        grid.jqGrid('setGridParam', {treeGrid: true});
    }
    grid.trigger('reloadGrid');
}

function addNewRecord() {
    const newId = Math.max(...allFeaturesData.map(item => item.id)) + 1;
    const newRecord = {
        id: newId,
        name: "New Product " + newId,
        type: "product",
        price: 0,
        stock: 0,
        sales: 0,
        rating: 0,
        featured: false,
        status: "pending",
        created: new Date().toISOString().split('T')[0],
        level: "1",
        parent: "1",
        isLeaf: true,
        expanded: false
    };
    
    $("#allFeaturesGrid").jqGrid('addRowData', newId, newRecord, 'first');
    $("#allFeaturesGrid").jqGrid('setSelection', newId);
}

function toggleFrozenColumns() {
    const grid = $("#allFeaturesGrid");
    const frozen = grid.jqGrid('getGridParam', 'frozenColumns');
    
    if (frozen) {
        grid.jqGrid('destroyFrozenColumns');
    } else {
        grid.jqGrid('setFrozenColumns');
    }
}

function exportGrid(format) {
    const grid = $("#allFeaturesGrid");
    const data = grid.jqGrid('getGridParam', 'data');
    
    if (format === 'csv') {
        let csv = [];
        const headers = grid.jqGrid('getGridParam', 'colNames').filter(h => h !== '');
        csv.push(headers.join(','));
        
        data.forEach(row => {
            const values = [];
            const colModel = grid.jqGrid('getGridParam', 'colModel');
            colModel.forEach(col => {
                if (!col.hidden && col.name !== 'rn' && col.name !== 'cb') {
                    values.push(row[col.name] || '');
                }
            });
            csv.push(values.join(','));
        });
        
        const blob = new Blob([csv.join('\n')], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'grid_export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

function clearFilters() {
    const grid = $("#allFeaturesGrid");
    grid[0].clearToolbar();
    grid.jqGrid('setGridParam', {search: false, postData: {filters: ""}}).trigger('reloadGrid');
}

function saveGridState() {
    const grid = $("#allFeaturesGrid");
    const state = {
        colModel: grid.jqGrid('getGridParam', 'colModel'),
        sortname: grid.jqGrid('getGridParam', 'sortname'),
        sortorder: grid.jqGrid('getGridParam', 'sortorder'),
        page: grid.jqGrid('getGridParam', 'page'),
        rowNum: grid.jqGrid('getGridParam', 'rowNum'),
        postData: grid.jqGrid('getGridParam', 'postData')
    };
    localStorage.setItem('allFeaturesGridState', JSON.stringify(state));
    alert('Grid state saved!');
}

function restoreGridState() {
    const state = localStorage.getItem('allFeaturesGridState');
    if (state) {
        const gridState = JSON.parse(state);
        const grid = $("#allFeaturesGrid");
        
        // Restore column widths and visibility
        gridState.colModel.forEach((col, index) => {
            const currentCol = grid.jqGrid('getColProp', col.name);
            if (currentCol) {
                grid.jqGrid('setColProp', col.name, {
                    width: col.width,
                    hidden: col.hidden
                });
            }
        });
        
        // Restore other parameters
        grid.jqGrid('setGridParam', {
            sortname: gridState.sortname,
            sortorder: gridState.sortorder,
            page: gridState.page,
            rowNum: gridState.rowNum,
            postData: gridState.postData
        }).trigger('reloadGrid');
        
        alert('Grid state restored!');
    } else {
        alert('No saved state found!');
    }
}

let currentTheme = 'light';
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    if (currentTheme === 'dark') {
        $('body').addClass('bg-dark text-light');
        $('.ui-jqgrid').addClass('table-dark');
        $('.ui-jqgrid-htable').addClass('table-dark');
        $('.ui-jqgrid-btable').addClass('table-dark');
    } else {
        $('body').removeClass('bg-dark text-light');
        $('.ui-jqgrid').removeClass('table-dark');
        $('.ui-jqgrid-htable').removeClass('table-dark');
        $('.ui-jqgrid-btable').removeClass('table-dark');
    }
}

// Context menu functions
function editSelectedRow() {
    const grid = $("#allFeaturesGrid");
    const rowId = grid.jqGrid('getGridParam', 'selrow');
    if (rowId) {
        grid.jqGrid('editGridRow', rowId, {
            recreateForm: true,
            closeAfterEdit: true,
            reloadAfterSubmit: true
        });
    }
}

function deleteSelectedRow() {
    const grid = $("#allFeaturesGrid");
    const rowId = grid.jqGrid('getGridParam', 'selrow');
    if (rowId) {
        if (confirm('Are you sure you want to delete this record?')) {
            grid.jqGrid('delRowData', rowId);
        }
    }
}

function viewSelectedRow() {
    const grid = $("#allFeaturesGrid");
    const rowId = grid.jqGrid('getGridParam', 'selrow');
    if (rowId) {
        grid.jqGrid('viewGridRow', rowId, {
            recreateForm: true,
            closeOnEscape: true,
            modal: true
        });
    }
}

function duplicateSelectedRow() {
    const grid = $("#allFeaturesGrid");
    const rowId = grid.jqGrid('getGridParam', 'selrow');
    if (rowId) {
        const rowData = grid.jqGrid('getRowData', rowId);
        const newId = Math.max(...allFeaturesData.map(item => item.id)) + 1;
        rowData.id = newId;
        rowData.name = rowData.name + " (Copy)";
        grid.jqGrid('addRowData', newId, rowData, 'after', rowId);
    }
}