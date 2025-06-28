/**
 * JavaScript utilities for Django jqGrid Examples
 * Provides common functionality and enhancements for the example grids
 */

// Global example utilities
window.ExampleUtils = {
    
    /**
     * Initialize common example functionality
     */
    init: function() {
        this.setupGlobalEventHandlers();
        this.addLoadingStates();
        this.enhanceTooltips();
        this.setupKeyboardShortcuts();
    },
    
    /**
     * Setup global event handlers
     */
    setupGlobalEventHandlers: function() {
        // Handle grid loading states
        $(document).on('beforeRequest.jqGrid', function(e, jqXHR, settings) {
            ExampleUtils.showLoadingSpinner($(this));
        });
        
        $(document).on('loadComplete.jqGrid', function(data) {
            ExampleUtils.hideLoadingSpinner($(this));
        });
        
        // Handle grid errors
        $(document).on('loadError.jqGrid', function(xhr, status, error) {
            ExampleUtils.showError('Failed to load grid data: ' + error);
            ExampleUtils.hideLoadingSpinner($(this));
        });
    },
    
    /**
     * Add loading states to grids
     */
    addLoadingStates: function() {
        // Create loading overlay for grids
        $('.jqgrid-container').each(function() {
            var container = $(this);
            var spinner = $('<div class="loading-spinner"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>');
            container.append(spinner);
        });
    },
    
    /**
     * Show loading spinner for a grid
     */
    showLoadingSpinner: function(grid) {
        var container = grid.closest('.card-body, .jqgrid-container');
        container.find('.loading-spinner').show();
    },
    
    /**
     * Hide loading spinner for a grid
     */
    hideLoadingSpinner: function(grid) {
        var container = grid.closest('.card-body, .jqgrid-container');
        container.find('.loading-spinner').hide();
    },
    
    /**
     * Enhanced tooltip setup
     */
    enhanceTooltips: function() {
        // Initialize Bootstrap tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Add tooltips to grid elements
        $(document).on('gridComplete.jqGrid', function() {
            $(this).find('[title]').each(function() {
                if (!$(this).attr('data-bs-original-title')) {
                    new bootstrap.Tooltip(this);
                }
            });
        });
    },
    
    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts: function() {
        $(document).keydown(function(e) {
            // Ctrl/Cmd + R: Refresh current grid
            if ((e.ctrlKey || e.metaKey) && e.keyCode === 82) {
                e.preventDefault();
                var activeGrid = $('.ui-jqgrid-btable:visible').first();
                if (activeGrid.length) {
                    activeGrid.trigger('reloadGrid');
                    ExampleUtils.showMessage('Grid refreshed', 'success');
                }
            }
            
            // Escape: Clear grid selection
            if (e.keyCode === 27) {
                $('.ui-jqgrid-btable:visible').each(function() {
                    $(this).jqGrid('resetSelection');
                });
            }
        });
    },
    
    /**
     * Show notification message
     */
    showMessage: function(message, type = 'info', duration = 3000) {
        // Create toast notification
        var toastHtml = `
            <div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;
        
        // Add to toast container or create one
        var toastContainer = $('.toast-container');
        if (!toastContainer.length) {
            toastContainer = $('<div class="toast-container position-fixed top-0 end-0 p-3"></div>');
            $('body').append(toastContainer);
        }
        
        var toast = $(toastHtml);
        toastContainer.append(toast);
        
        // Show toast
        var bsToast = new bootstrap.Toast(toast[0], {
            autohide: true,
            delay: duration
        });
        bsToast.show();
        
        // Remove from DOM after hiding
        toast.on('hidden.bs.toast', function() {
            $(this).remove();
        });
    },
    
    /**
     * Show error message
     */
    showError: function(message, duration = 5000) {
        this.showMessage(message, 'danger', duration);
    },
    
    /**
     * Show success message
     */
    showSuccess: function(message, duration = 3000) {
        this.showMessage(message, 'success', duration);
    },
    
    /**
     * Format currency values
     */
    formatCurrency: function(value, currency = '$') {
        if (value === null || value === undefined || value === '') {
            return '';
        }
        return currency + parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    
    /**
     * Format date values
     */
    formatDate: function(value, format = 'YYYY-MM-DD') {
        if (!value) return '';
        var date = new Date(value);
        
        switch (format) {
            case 'YYYY-MM-DD':
                return date.getFullYear() + '-' + 
                       ('0' + (date.getMonth() + 1)).slice(-2) + '-' + 
                       ('0' + date.getDate()).slice(-2);
            case 'DD/MM/YYYY':
                return ('0' + date.getDate()).slice(-2) + '/' + 
                       ('0' + (date.getMonth() + 1)).slice(-2) + '/' + 
                       date.getFullYear();
            case 'MMM DD, YYYY':
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return months[date.getMonth()] + ' ' + 
                       date.getDate() + ', ' + 
                       date.getFullYear();
            default:
                return date.toLocaleDateString();
        }
    },
    
    /**
     * Get badge HTML for status values
     */
    getStatusBadge: function(status, type = 'default') {
        var badgeClass = 'secondary';
        var statusLower = status.toLowerCase();
        
        // Determine badge color based on status and type
        switch (type) {
            case 'product_status':
                if (statusLower === 'active') badgeClass = 'success';
                else if (statusLower === 'draft') badgeClass = 'warning';
                else if (statusLower === 'discontinued') badgeClass = 'danger';
                break;
            case 'order_status':
                if (statusLower === 'pending') badgeClass = 'info';
                else if (statusLower === 'processing') badgeClass = 'warning';
                else if (statusLower === 'shipped') badgeClass = 'primary';
                else if (statusLower === 'delivered') badgeClass = 'success';
                else if (statusLower === 'cancelled') badgeClass = 'danger';
                break;
            case 'stock_status':
                if (statusLower === 'in stock') badgeClass = 'success';
                else if (statusLower === 'low stock') badgeClass = 'warning';
                else if (statusLower === 'out of stock') badgeClass = 'danger';
                break;
            case 'boolean':
                badgeClass = status ? 'success' : 'secondary';
                status = status ? 'Yes' : 'No';
                break;
        }
        
        return `<span class="badge bg-${badgeClass}">${status}</span>`;
    },
    
    /**
     * Export grid data to CSV
     */
    exportToCSV: function(gridId, filename) {
        var grid = $('#' + gridId);
        var colModel = grid.jqGrid('getGridParam', 'colModel');
        var data = grid.jqGrid('getRowData');
        
        if (!data.length) {
            this.showError('No data to export');
            return;
        }
        
        var csv = '';
        
        // Add header row
        var headers = [];
        colModel.forEach(function(col) {
            if (!col.hidden && col.name !== 'cb' && col.name !== 'rn') {
                headers.push('"' + (col.label || col.name) + '"');
            }
        });
        csv += headers.join(',') + '\r\n';
        
        // Add data rows
        data.forEach(function(row) {
            var rowData = [];
            colModel.forEach(function(col) {
                if (!col.hidden && col.name !== 'cb' && col.name !== 'rn') {
                    var cellValue = row[col.name] || '';
                    // Strip HTML tags and escape quotes
                    cellValue = cellValue.replace(/<[^>]*>/g, '').replace(/"/g, '""');
                    rowData.push('"' + cellValue + '"');
                }
            });
            csv += rowData.join(',') + '\r\n';
        });
        
        // Download file
        this.downloadFile(csv, filename + '.csv', 'text/csv;charset=utf-8;');
        this.showSuccess('Data exported successfully');
    },
    
    /**
     * Download file
     */
    downloadFile: function(content, filename, mimeType) {
        var blob = new Blob([content], { type: mimeType });
        var link = document.createElement('a');
        
        if (link.download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    },
    
    /**
     * Get selected rows from grid
     */
    getSelectedRows: function(gridId) {
        var grid = $('#' + gridId);
        return grid.jqGrid('getGridParam', 'selarrrow');
    },
    
    /**
     * Refresh grid with current parameters
     */
    refreshGrid: function(gridId) {
        var grid = $('#' + gridId);
        grid.trigger('reloadGrid');
        this.showMessage('Grid refreshed', 'success');
    },
    
    /**
     * Toggle grid search toolbar
     */
    toggleSearch: function(gridId) {
        var grid = $('#' + gridId);
        grid[0].toggleToolbar();
    },
    
    /**
     * Clear grid filters
     */
    clearFilters: function(gridId) {
        var grid = $('#' + gridId);
        grid.jqGrid('clearGridData');
        grid.trigger('reloadGrid');
        this.showMessage('Filters cleared', 'info');
    }
};

// Grid enhancement functions
window.GridEnhancements = {
    
    /**
     * Add custom row highlighting based on data
     */
    addConditionalFormatting: function(gridId, rules) {
        $(document).on('gridComplete.jqGrid', '#' + gridId, function() {
            var grid = $(this);
            var rows = grid.jqGrid('getDataIDs');
            
            rows.forEach(function(rowId) {
                var rowData = grid.jqGrid('getRowData', rowId);
                
                rules.forEach(function(rule) {
                    if (GridEnhancements.evaluateRule(rowData[rule.field], rule.operator, rule.value)) {
                        grid.jqGrid('setRowData', rowId, {}, {
                            color: rule.color || '',
                            background: rule.background || ''
                        });
                    }
                });
            });
        });
    },
    
    /**
     * Evaluate a conditional formatting rule
     */
    evaluateRule: function(cellValue, operator, ruleValue) {
        switch (operator) {
            case 'eq': return cellValue == ruleValue;
            case 'ne': return cellValue != ruleValue;
            case 'lt': return parseFloat(cellValue) < parseFloat(ruleValue);
            case 'le': return parseFloat(cellValue) <= parseFloat(ruleValue);
            case 'gt': return parseFloat(cellValue) > parseFloat(ruleValue);
            case 'ge': return parseFloat(cellValue) >= parseFloat(ruleValue);
            case 'contains': return String(cellValue).indexOf(ruleValue) !== -1;
            case 'starts': return String(cellValue).indexOf(ruleValue) === 0;
            case 'ends': return String(cellValue).indexOf(ruleValue) === String(cellValue).length - ruleValue.length;
            default: return false;
        }
    }
};

// Initialize when document is ready
$(document).ready(function() {
    ExampleUtils.init();
    
    // Add fade-in animation to content
    $('.container, .container-fluid').addClass('fade-in');
    
    // Initialize any existing grids with enhancements
    $('.ui-jqgrid-btable').each(function() {
        var gridId = $(this).attr('id');
        
        // Add sample conditional formatting for demonstration
        if (gridId === 'productsGrid') {
            GridEnhancements.addConditionalFormatting(gridId, [
                { field: 'stock_quantity', operator: 'eq', value: '0', background: '#ffe6e6' },
                { field: 'stock_quantity', operator: 'lt', value: '10', background: '#fff3cd' },
                { field: 'is_featured', operator: 'eq', value: 'true', background: '#e3f2fd' }
            ]);
        }
    });
});

// Export utilities to global scope for template usage
window.refreshGrid = function(gridId) {
    if (gridId) {
        ExampleUtils.refreshGrid(gridId);
    } else {
        // Refresh first visible grid
        var activeGrid = $('.ui-jqgrid-btable:visible').first();
        if (activeGrid.length) {
            ExampleUtils.refreshGrid(activeGrid.attr('id'));
        }
    }
};

window.toggleSearch = function(gridId) {
    if (gridId) {
        ExampleUtils.toggleSearch(gridId);
    } else {
        // Toggle search for first visible grid
        var activeGrid = $('.ui-jqgrid-btable:visible').first();
        if (activeGrid.length) {
            ExampleUtils.toggleSearch(activeGrid.attr('id'));
        }
    }
};

window.exportGrid = function(gridId, filename) {
    if (!gridId) {
        var activeGrid = $('.ui-jqgrid-btable:visible').first();
        gridId = activeGrid.attr('id');
    }
    if (!filename) {
        filename = 'grid_export_' + new Date().toISOString().slice(0, 10);
    }
    ExampleUtils.exportToCSV(gridId, filename);
};