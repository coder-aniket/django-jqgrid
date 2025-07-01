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
function initializeAllFeaturesGrid() {
    $("#allFeaturesGrid").jqGrid({
        // Data Configuration
        datatype: "local",
        data: allFeaturesData,
        mtype: "GET",
        
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
        rowNum: 25,
        rowList: [25, 50, 100, 500, 1000, 2000, 5000],
        sortname: 'id',
        sortorder: "asc",
        viewrecords: true,
        gridview: true,
        autoencode: true,
        ignoreCase: true,
        height: 400,
        autowidth: true,
        shrinkToFit: false,
        forceFit: false,
        
        // Additional UI Features
        headertitles: true,
        styleUI: gridState?.styleUI || jqGridThemes[currentTheme]?.styleUI || "Bootstrap5",
        iconSet: currentTheme === 'classic' ? "jQueryUI" : "fontAwesome",
        responsive: true,
        autoresizeOnLoad: true,
        toppager: true,
        
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
        
        // Search/Filter Features  
        search: true,
        searchOnEnter: false,
        stringResult: true,
        toolbar: [true, "both"],
        
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
        defaultSearch: 'cn',
        stringResult: true
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
}

// Initialize everything when document is ready
$(document).ready(function() {
    // Wait a bit to ensure all plugins are loaded
    setTimeout(() => {
        initializeAllFeaturesGrid();
    }, 100);
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
    
    // Clear toolbar filters
    if (grid[0].clearToolbar) {
        grid[0].clearToolbar();
    }
    
    // Clear search filters
    grid.jqGrid('setGridParam', {
        search: false, 
        postData: {filters: ""}
    });
    
    // Restore original data
    const allData = window.originalGridData || allFeaturesData;
    grid.jqGrid('clearGridData');
    allData.forEach((row, index) => {
        grid.jqGrid('addRowData', row.id, row);
    });
    
    // Update footer totals
    updateFooterTotals(grid, allData);
    
    // Clear expression filter
    $('#filterExpression').val('');
    $('#expressionPreview').addClass('d-none');
    $('#expressionError').addClass('d-none');
    
    console.log('All filters cleared, restored', allData.length, 'records');
}

function saveGridState() {
    try {
        const grid = $("#allFeaturesGrid");
        if (grid.length === 0) return;
        
        const state = {
            colModel: [],
            sortname: grid.jqGrid('getGridParam', 'sortname'),
            sortorder: grid.jqGrid('getGridParam', 'sortorder'),
            page: grid.jqGrid('getGridParam', 'page'),
            rowNum: grid.jqGrid('getGridParam', 'rowNum'),
            postData: grid.jqGrid('getGridParam', 'postData'),
            grouping: grid.jqGrid('getGridParam', 'grouping'),
            treeGrid: grid.jqGrid('getGridParam', 'treeGrid')
        };
        
        // Save column states
        const colModel = grid.jqGrid('getGridParam', 'colModel');
        if (colModel) {
            colModel.forEach(col => {
                state.colModel.push({
                    name: col.name,
                    width: col.width,
                    hidden: col.hidden
                });
            });
        }
        
        gridState = state;
        localStorage.setItem('allFeaturesGridState', JSON.stringify(state));
    } catch(e) {
        console.error('Error saving grid state:', e);
    }
}

function restoreGridState() {
    try {
        const savedState = localStorage.getItem('allFeaturesGridState');
        if (savedState || gridState) {
            const state = savedState ? JSON.parse(savedState) : gridState;
            const grid = $("#allFeaturesGrid");
            
            if (grid.length === 0) return;
            
            // Restore column widths and visibility
            if (state.colModel) {
                setTimeout(() => {
                    state.colModel.forEach((col) => {
                        try {
                            const currentCol = grid.jqGrid('getColProp', col.name);
                            if (currentCol) {
                                grid.jqGrid('setColProp', col.name, {
                                    width: col.width,
                                    hidden: col.hidden
                                });
                            }
                        } catch(e) {
                            console.warn('Could not restore column state for:', col.name);
                        }
                    });
                    
                    // Restore other parameters
                    grid.jqGrid('setGridParam', {
                        sortname: state.sortname,
                        sortorder: state.sortorder,
                        page: state.page || 1,
                        rowNum: state.rowNum || 25,
                        postData: state.postData || {}
                    }).trigger('reloadGrid');
                }, 200);
            }
        }
    } catch(e) {
        console.error('Error restoring grid state:', e);
    }
}

// Theme toggling is handled by the comprehensive theme system below

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

// Advanced Filter Functions
function showAdvancedFilter() {
    try {
        const grid = $("#allFeaturesGrid");
        
        // Check if grid exists and has data
        if (!grid.length || !grid[0].grid) {
            console.error('Grid not properly initialized');
            alert('Please wait for the grid to fully load before using advanced filter.');
            return;
        }
        
        // Check if searchGrid method exists
        if (typeof grid.jqGrid('searchGrid') !== 'function') {
            console.warn('searchGrid not available, using expression filter instead');
            showExpressionBuilder();
            return;
        }
        
        // Use the navGrid search button instead which is more reliable
        const pager = $("#allFeaturesPager");
        const searchBtn = pager.find(".ui-icon-search").parent();
        if (searchBtn.length) {
            searchBtn.click();
        } else {
            // Fallback to manual searchGrid call
            grid.jqGrid('searchGrid', {
                multipleSearch: true,
                multipleGroup: true,
                showQuery: true,
                caption: "Advanced Search",
                recreateForm: true,
                closeAfterSearch: false,
                closeAfterReset: false,
                overlay: 0
            });
        }
    } catch (error) {
        console.error('Error showing advanced filter:', error);
        // Fallback to expression filter
        showExpressionBuilder();
    }
}

// Expression Filter Functions
function showExpressionBuilder() {
    // Remove aria-hidden before showing modal to prevent accessibility warning
    $('#expressionFilterModal').removeAttr('aria-hidden');
    $('#expressionFilterModal').modal('show');
}

function setExpression(expression) {
    $('#filterExpression').val(expression);
    previewExpression();
}

function previewExpression() {
    const expression = $('#filterExpression').val();
    if (expression) {
        $('#expressionPreview').removeClass('d-none');
        $('#previewContent').html(`<code>${expression}</code>`);
    } else {
        $('#expressionPreview').addClass('d-none');
    }
}

// Expression parser and filter
function parseExpression(expression) {
    // Convert expression to jqGrid filter format
    try {
        // This is a simplified parser - in production, use a proper expression parser
        let filters = {
            groupOp: "AND",
            rules: [],
            groups: []
        };
        
        // Handle complex expressions with parentheses
        if (expression.includes('(') && expression.includes(')')) {
            // Parse grouped expressions
            const groups = expression.match(/\([^()]+\)/g);
            if (groups) {
                groups.forEach((group, index) => {
                    const cleanGroup = group.replace(/[()]/g, '').trim();
                    const subFilters = parseSimpleExpression(cleanGroup);
                    if (subFilters.rules.length > 0) {
                        filters.groups.push(subFilters);
                    }
                });
                
                // Determine main group operator
                if (expression.toUpperCase().includes(' OR ')) {
                    filters.groupOp = "OR";
                }
            }
        } else {
            // Simple expression without parentheses
            filters = parseSimpleExpression(expression);
        }
        
        return filters;
    } catch (e) {
        console.error("Expression parsing error:", e);
        return null;
    }
}

function parseSimpleExpression(expression) {
    const filters = {
        groupOp: "AND",
        rules: []
    };
    
    // Determine group operator
    if (expression.toUpperCase().includes(' OR ')) {
        filters.groupOp = "OR";
        expression = expression.replace(/ OR /gi, ' AND ');
    }
    
    // Split by AND
    const conditions = expression.split(/ AND /i);
    
    conditions.forEach(condition => {
        const trimmed = condition.trim();
        
        // Parse different operator types
        let match;
        
        // LIKE operator
        if ((match = trimmed.match(/(\w+)\s+LIKE\s+"([^"]+)"/i))) {
            filters.rules.push({
                field: match[1],
                op: "cn",
                data: match[2].replace(/%/g, '')
            });
        }
        // NOT LIKE operator
        else if ((match = trimmed.match(/(\w+)\s+NOT\s+LIKE\s+"([^"]+)"/i))) {
            filters.rules.push({
                field: match[1],
                op: "nc",
                data: match[2].replace(/%/g, '')
            });
        }
        // IN operator
        else if ((match = trimmed.match(/(\w+)\s+IN\s+\(([^)]+)\)/i))) {
            const values = match[2].split(',').map(v => v.trim().replace(/['"]/g, ''));
            filters.rules.push({
                field: match[1],
                op: "in",
                data: values.join(',')
            });
        }
        // Comparison operators
        else if ((match = trimmed.match(/(\w+)\s*(=|!=|<>|<=|>=|<|>)\s*(.+)/))) {
            const field = match[1];
            const operator = match[2];
            const value = match[3].trim().replace(/['"]/g, '');
            
            let op;
            switch(operator) {
                case '=': op = 'eq'; break;
                case '!=': case '<>': op = 'ne'; break;
                case '<': op = 'lt'; break;
                case '>': op = 'gt'; break;
                case '<=': op = 'le'; break;
                case '>=': op = 'ge'; break;
            }
            
            filters.rules.push({
                field: field,
                op: op,
                data: value
            });
        }
    });
    
    return filters;
}

function applyExpressionFilter() {
    const expression = $('#filterExpression').val().trim();
    
    if (!expression) {
        $('#expressionError').text('Please enter a filter expression').removeClass('d-none');
        return;
    }
    
    // Validate expression syntax
    try {
        // Test the expression with sample data first
        const testRow = allFeaturesData[0];
        const testResult = evaluateExpression(testRow, expression);
        console.log('Expression validation passed, test result:', testResult);
    } catch (e) {
        $('#expressionError').text('Invalid expression syntax: ' + e.message).removeClass('d-none');
        return;
    }
    
    try {
        const grid = $("#allFeaturesGrid");
        
        // Store original data if not already stored
        if (!window.originalGridData) {
            window.originalGridData = [...allFeaturesData];
        }
        
        // Apply expression-based filtering on local data
        const filteredData = window.originalGridData.filter(row => {
            try {
                return evaluateExpression(row, expression);
            } catch (e) {
                console.warn('Error evaluating row:', row.id, e);
                return false;
            }
        });
        
        // Clear and reload with filtered data
        grid.jqGrid('clearGridData');
        filteredData.forEach((row, index) => {
            grid.jqGrid('addRowData', row.id, row);
        });
        
        // Update footer totals
        updateFooterTotals(grid, filteredData);
        
        console.log(`Expression filter applied: ${filteredData.length} of ${window.originalGridData.length} records match`);
        $('#expressionFilterModal').modal('hide');
        $('#expressionError').addClass('d-none');
        
    } catch (e) {
        $('#expressionError').text('Error applying filter: ' + e.message).removeClass('d-none');
        console.error('Filter application error:', e);
    }
}

// Helper function to update footer totals
function updateFooterTotals(grid, data) {
    if (data && data.length > 0) {
        const totalSales = data.reduce((sum, row) => sum + (parseFloat(row.sales) || 0), 0);
        const totalStock = data.reduce((sum, row) => sum + (parseInt(row.stock) || 0), 0);
        
        grid.jqGrid('footerData', 'set', {
            name: `Filtered Totals (${data.length} rows):`,
            sales: totalSales,
            stock: totalStock
        });
    }
}

// Evaluate expression against a data row
function evaluateExpression(row, expression) {
    try {
        // Create a safe evaluation context
        const context = {
            id: row.id,
            name: row.name,
            type: row.type,
            price: parseFloat(row.price) || 0,
            stock: parseInt(row.stock) || 0,
            sales: parseFloat(row.sales) || 0,
            rating: parseFloat(row.rating) || 0,
            featured: row.featured === true || row.featured === 'true',
            status: row.status,
            created: row.created
        };
        
        // Convert expression to JavaScript
        let jsExpression = expression;
        
        // Handle LIKE operations first
        jsExpression = jsExpression.replace(/(\w+)\s+LIKE\s+"([^"]+)"/gi, (match, field, pattern) => {
            const regex = pattern.replace(/%/g, '.*');
            return `context.${field}.match(/${regex}/i)`;
        });
        
        // Handle NOT LIKE operations
        jsExpression = jsExpression.replace(/(\w+)\s+NOT\s+LIKE\s+"([^"]+)"/gi, (match, field, pattern) => {
            const regex = pattern.replace(/%/g, '.*');
            return `!context.${field}.match(/${regex}/i)`;
        });
        
        // Handle IN operations
        jsExpression = jsExpression.replace(/(\w+)\s+IN\s+\(([^)]+)\)/gi, (match, field, values) => {
            const valueList = values.split(',').map(v => v.trim().replace(/['"]/g, ''));
            return `[${valueList.map(v => `"${v}"`).join(',')}].includes(context.${field})`;
        });
        
        // Handle NOT IN operations
        jsExpression = jsExpression.replace(/(\w+)\s+NOT\s+IN\s+\(([^)]+)\)/gi, (match, field, values) => {
            const valueList = values.split(',').map(v => v.trim().replace(/['"]/g, ''));
            return `![${valueList.map(v => `"${v}"`).join(',')}].includes(context.${field})`;
        });
        
        // Replace comparison operators (do this before replacing = with ==)
        jsExpression = jsExpression
            .replace(/\s*<=\s*/g, ' <= ')
            .replace(/\s*>=\s*/g, ' >= ')
            .replace(/\s*<>\s*/g, ' !== ')
            .replace(/\s*!=\s*/g, ' !== ')
            .replace(/\s*<\s*/g, ' < ')
            .replace(/\s*>\s*/g, ' > ')
            .replace(/\s*=\s*/g, ' == '); // Do this last
        
        // Replace boolean operators
        jsExpression = jsExpression
            .replace(/\bAND\b/gi, '&&')
            .replace(/\bOR\b/gi, '||')
            .replace(/\bNOT\b/gi, '!');
        
        // Replace field names with context references
        jsExpression = jsExpression.replace(/\b(id|name|type|price|stock|sales|rating|featured|status|created)\b/g, (match) => {
            return `context.${match}`;
        });
        
        // Clean up any remaining issues
        jsExpression = jsExpression.replace(/\s+/g, ' ').trim();
        
        // Evaluate the expression
        const result = new Function('context', `return ${jsExpression}`)(context);
        return result;
        
    } catch (e) {
        console.error('Expression evaluation error:', e);
        console.error('Original expression:', expression);
        console.error('JavaScript expression:', jsExpression);
        console.error('Context:', context);
        return false;
    }
}

// Theme configuration - Using locally available jqGrid themes
const jqGridThemes = {
    'classic': {
        name: 'Classic jqGrid',
        css: '/static/django_jqgrid/plugins/jqGrid/css/ui.jqgrid.css',
        styleUI: 'jQueryUI'
    },
    'bootstrap3': {
        name: 'Bootstrap 3',
        css: '/static/django_jqgrid/plugins/jqGrid/css/ui.jqgrid-bootstrap.css',
        styleUI: 'Bootstrap'
    },
    'bootstrap4': {
        name: 'Bootstrap 4',
        css: '/static/django_jqgrid/plugins/jqGrid/css/ui.jqgrid-bootstrap4.css',
        styleUI: 'Bootstrap4'
    },
    'bootstrap5': {
        name: 'Bootstrap 5',
        css: '/static/django_jqgrid/plugins/jqGrid/css/ui.jqgrid-bootstrap5.css',
        styleUI: 'Bootstrap5'
    },
    'bootstrap-ui': {
        name: 'Bootstrap + jQuery UI',
        css: '/static/django_jqgrid/plugins/jqGrid/css/ui.jqgrid-bootstrap-ui.css',
        styleUI: 'Bootstrap'
    }
};

// Add jQuery UI themes from CDN for variety
const jqueryUIThemes = {
    'ui-lightness': 'UI Lightness',
    'ui-darkness': 'UI Darkness',
    'smoothness': 'Smoothness',
    'cupertino': 'Cupertino',
    'redmond': 'Redmond',
    'sunny': 'Sunny',
    'overcast': 'Overcast',
    'dark-hive': 'Dark Hive',
    'flick': 'Flick',
    'start': 'Start'
};

let currentTheme = 'bootstrap5';
let currentUITheme = 'ui-lightness';
let gridState = null;

// Toggle theme
function toggleTheme() {
    showThemeSelector();
}

// Show theme selector modal
function showThemeSelector() {
    // Create modal if it doesn't exist
    if ($('#themeSelectorModal').length === 0) {
        const modalHtml = `
            <div class="modal fade" id="themeSelectorModal" tabindex="-1">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="fas fa-palette"></i> Select Grid Theme
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <h6 class="mb-3">jqGrid Themes (Local)</h6>
                            <div class="row mb-4">
                                ${Object.entries(jqGridThemes).map(([key, theme]) => `
                                    <div class="col-md-4 mb-3">
                                        <div class="theme-card border rounded p-3 ${currentTheme === key ? 'border-primary bg-light' : ''}" 
                                             onclick="applyGridTheme('${key}')" style="cursor: pointer;">
                                            <h6>${theme.name}</h6>
                                            <small class="text-muted">StyleUI: ${theme.styleUI}</small>
                                            ${currentTheme === key ? '<i class="fas fa-check text-primary float-end"></i>' : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <h6 class="mb-3">jQuery UI Themes (CDN) - For Classic jqGrid</h6>
                            <div class="row">
                                ${Object.entries(jqueryUIThemes).map(([key, name]) => `
                                    <div class="col-md-3 mb-3">
                                        <div class="theme-card border rounded p-2 ${currentUITheme === key ? 'border-info bg-light' : ''}" 
                                             onclick="applyUITheme('${key}')" style="cursor: pointer; font-size: 0.9rem;">
                                            <span>${name}</span>
                                            ${currentUITheme === key ? '<i class="fas fa-check text-info float-end"></i>' : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <span class="text-muted me-auto">Note: jQuery UI themes work best with Classic jqGrid theme</span>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('body').append(modalHtml);
    }
    
    $('#themeSelectorModal').modal('show');
}

// Apply jqGrid theme
function applyGridTheme(themeName) {
    if (!jqGridThemes[themeName]) {
        console.error('Theme not found:', themeName);
        return;
    }
    
    // Save current grid state
    saveGridState();
    
    currentTheme = themeName;
    
    // Update theme selector UI
    $('.theme-card').removeClass('border-primary bg-light').find('.fa-check').remove();
    $(`.theme-card:has(small:contains('${jqGridThemes[themeName].styleUI}'))`).addClass('border-primary bg-light')
        .append('<i class="fas fa-check text-primary float-end"></i>');
    
    // Update dropdown selector
    $('#themeSelector').val(themeName);
    
    // Remove existing jqGrid theme
    $('link[href*="ui.jqgrid"]').remove();
    
    // Add new jqGrid theme
    $('<link>')
        .attr('rel', 'stylesheet')
        .attr('href', jqGridThemes[themeName].css)
        .insertAfter('link[href*="bootstrap.min.css"]');
    
    // Update grid styleUI parameter
    gridState = gridState || {};
    gridState.styleUI = jqGridThemes[themeName].styleUI;
    
    // Recreate the grid with the new theme
    setTimeout(() => {
        recreateGrid();
    }, 300);
    
    // Save theme preference
    localStorage.setItem('jqgrid-theme', themeName);
    localStorage.setItem('jqgrid-styleUI', jqGridThemes[themeName].styleUI);
    
    console.log('Applied jqGrid theme:', jqGridThemes[themeName].name);
}

// Apply jQuery UI theme (for classic jqGrid)
function applyUITheme(themeName) {
    if (!jqueryUIThemes[themeName]) {
        console.error('UI Theme not found:', themeName);
        return;
    }
    
    currentUITheme = themeName;
    
    // Update jQuery UI theme link
    const $themeLink = $('link[href*="jquery-ui.css"]');
    const newThemeUrl = `https://code.jquery.com/ui/1.13.2/themes/${themeName}/jquery-ui.css`;
    
    if ($themeLink.length > 0) {
        $themeLink.attr('href', newThemeUrl);
    } else {
        $('<link>')
            .attr('rel', 'stylesheet')
            .attr('href', newThemeUrl)
            .insertAfter('link[href*="bootstrap"]');
    }
    
    // Update UI theme selector
    $('.theme-card').find('.fa-check.text-info').parent().removeClass('border-info bg-light');
    $(`.theme-card:has(span:contains('${jqueryUIThemes[themeName]}'))`).addClass('border-info bg-light');
    
    // Save UI theme preference
    localStorage.setItem('jquery-ui-theme', themeName);
    
    console.log('Applied jQuery UI theme:', jqueryUIThemes[themeName]);
}

// Wrapper function for dropdown
function applyTheme(themeName) {
    // Check if it's a jqGrid theme or jQuery UI theme
    if (jqGridThemes[themeName]) {
        applyGridTheme(themeName);
    } else if (jqueryUIThemes[themeName]) {
        // First switch to classic jqGrid theme, then apply UI theme
        if (currentTheme !== 'classic') {
            applyGridTheme('classic');
        }
        applyUITheme(themeName);
    }
}

// Recreate grid after theme change
function recreateGrid() {
    // Save current grid state before destroying
    saveGridState();
    
    // Completely destroy existing grid and all associated elements
    try {
        // Remove all jqGrid generated elements
        $("#allFeaturesGrid").jqGrid('GridUnload');
    } catch(e) {
        try {
            $("#allFeaturesGrid").jqGrid('destroy');
        } catch(e2) {
            // Manual cleanup if destroy fails
            $("#allFeaturesGrid").empty();
        }
    }
    
    // Comprehensive cleanup of all jqGrid elements
    $("#gbox_allFeaturesGrid").remove();
    $("#allFeaturesPager").empty();
    $(".ui-jqdialog").remove();
    $(".ui-widget-overlay").remove();
    
    // Remove all pager related elements
    $("[id^='pg_allFeaturesPager']").remove();
    $("[id^='toppager_allFeaturesGrid']").remove();
    $("[id*='_pager']").remove();
    
    // Remove any navigation buttons and toolbars
    $("[id*='_navButton']").remove();
    $("[id*='_navGrid']").remove();
    $(".navtable").remove();
    
    // Remove search dialog
    $("#searchmodfbox_allFeaturesGrid").remove();
    $("#alertmod_allFeaturesGrid").remove();
    
    // Remove any column chooser dialogs
    $(".ui-jqgrid-column-chooser").remove();
    
    // Clean up frozen column elements
    $("[id*='_frozen']").remove();
    
    // Remove any remaining grid wrappers
    $(".ui-jqgrid").remove();
    
    // Recreate the table element completely
    $("#allFeaturesGrid").remove();
    $(".all-features-grid").html('<table id="allFeaturesGrid"></table><div id="allFeaturesPager"></div>');
    
    // Small delay to ensure DOM is clean
    setTimeout(() => {
        // Recreate the grid
        initializeAllFeaturesGrid();
        
        // Restore grid state
        if (gridState) {
            restoreGridState();
        }
    }, 100);
}

// Listen for expression input changes
$(document).ready(function() {
    $('#filterExpression').on('input', previewExpression);
    
    // Load saved theme preferences
    const savedTheme = localStorage.getItem('jqgrid-theme');
    const savedUITheme = localStorage.getItem('jquery-ui-theme');
    
    if (savedTheme && jqGridThemes[savedTheme]) {
        currentTheme = savedTheme;
        $('#themeSelector').val(savedTheme);
        // Don't apply theme on initial load, just use the saved preference
        gridState = gridState || {};
        gridState.styleUI = jqGridThemes[savedTheme].styleUI;
    } else {
        // Set default theme
        $('#themeSelector').val(currentTheme);
    }
    
    if (savedUITheme && jqueryUIThemes[savedUITheme]) {
        currentUITheme = savedUITheme;
        // Apply UI theme if using classic jqGrid
        if (currentTheme === 'classic') {
            applyUITheme(savedUITheme);
        }
    }
});