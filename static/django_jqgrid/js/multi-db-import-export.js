/**
 * Multi-Database jqGrid Import/Export Module
 * Handles import and export for multiple jqGrid instances with isolated state management
 */

window.importExportUtils = window.importExportUtils || {};

/**
 * Initialize import/export functionality for a specific table instance
 * @param {Object} tableInstance - Table instance configuration
 * @param {Object} data - Additional data from server
 */
function initializeImportExport(tableInstance, data) {
    // Store import/export configuration in table instance for future reference
    tableInstance.importConfig = data.import_config;
    tableInstance.exportConfig = data.export_config;
    
    // Setup import UI if import configuration is available
    if (data.import_config) {
        setupImportUI(tableInstance, data.import_config);
    }
    
    // Setup export UI if export configuration is available
    if (data.export_config) {
        setupExportUI(tableInstance, data.export_config);
    }
}

/**
 * Sets up the import UI for a specific table instance
 * @param {Object} tableInstance - Table instance configuration
 * @param {Object} config - Import configuration
 */
function setupImportUI(tableInstance, config) {
    // Create modal ID specific to this table instance
    const modalId = `import-modal-${tableInstance.id}`;
    
    // Create import modal if it doesn't exist
    if (!document.getElementById(modalId)) {
        createImportModal(tableInstance, modalId, config);
    }
    
    // Add import button to table toolbar
    addImportButtonToToolbar(tableInstance, modalId);
}

/**
 * Creates the import modal for a specific table instance
 * @param {Object} tableInstance - Table instance configuration
 * @param {string} modalId - Modal ID
 * @param {Object} config - Import configuration
 */
function createImportModal(tableInstance, modalId, config) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = modalId;
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', `${modalId}-title`);
    modal.setAttribute('aria-hidden', 'true');
    
    // Create modal content with instance-specific IDs
    modal.innerHTML = `
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="${modalId}-title">
                        Import ${tableInstance.tableName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Data
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="${modalId}-form" enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <h5>Choose File</h5>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="${modalId}-file" name="import_file" required>
                                        <label class="custom-file-label" for="${modalId}-file">Select file</label>
                                    </div>
                                    <small class="form-text text-muted mt-2">
                                        Supported formats: ${config.allowed_formats ? 
                                            config.allowed_formats.map(f => f.toUpperCase()).join(', ') : 
                                            'CSV, Excel (.xlsx)'}
                                    </small>
                                    <div class="sample-link mt-2">
                                        <b><i>Sample file <a href="#" id="${modalId}-sample">Click here</a></i></b>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6" id="${modalId}-additional-options">
                                <!-- Additional import options will be added here -->
                            </div>
                        </div>
                        
                        <div class="row mt-4">
                            <div class="col-12">
                                <h5>Map File Headers</h5>
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="${modalId}-mapping-table">
                                        <thead>
                                            <tr>
                                                <th>System Fields</th>
                                                <th>File Headers</th>
                                                <th>Default Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- Rows will be populated dynamically -->
                                        </tbody>
                                    </table>
                                </div>
                                <div id="${modalId}-mapping-placeholder" class="text-center py-4 text-muted">
                                    <i class="fas fa-file-upload fa-2x mb-2"></i>
                                    <p>Upload a file to map columns</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="${modalId}-submit" disabled>Import Data</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to DOM
    document.body.appendChild(modal);
    
    // Set up sample file link
    const sampleLink = document.getElementById(`${modalId}-sample`);
    if (sampleLink) {
        sampleLink.href = config.sample_file ? 
            config.sample_file : 
            `/api/${tableInstance.appName}/${tableInstance.tableName}/sample_import/`;
    }
    
    // Set up file input change handler
    const fileInput = document.getElementById(`${modalId}-file`);
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const fileName = this.value.split('\\').pop();
            const label = this.nextElementSibling;
            if (label) {
                label.classList.add('selected');
                label.innerHTML = fileName;
            }
            
            // Process the file to extract headers
            processImportFile(tableInstance, this, modalId, config);
        });
    }
    
    // Set up submit button handler
    const submitButton = document.getElementById(`${modalId}-submit`);
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            submitImportForm(tableInstance, modalId);
        });
    }
}

/**
 * Adds an import button to the table toolbar
 * @param {Object} tableInstance - Table instance configuration
 * @param {string} modalId - Modal ID
 */
function addImportButtonToToolbar(tableInstance, modalId) {
    // Look for existing button container in the custom buttons area
    const customButtonsContainer = document.getElementById(tableInstance.toolbarSettings.customButtonsContainerId);
    if (!customButtonsContainer) return;
    
    // Check if button already exists
    const existingButton = document.getElementById(`${tableInstance.id}-import-btn`);
    if (existingButton) return;
    
    // Create import button
    const importButton = document.createElement('button');
    importButton.type = 'button';
    importButton.id = `${tableInstance.id}-import-btn`;
    importButton.className = 'btn btn-info btn-sm mr-1';
    importButton.innerHTML = '<i class="fas fa-upload"></i> Import';
    
    // Add click handler
    importButton.addEventListener('click', function() {
        // Reset form before showing
        resetImportForm(tableInstance, modalId);
        $(`#${modalId}`).modal('show');
    });
    
    // Add to container
    customButtonsContainer.appendChild(importButton);
}

/**
 * Processes the uploaded import file to extract headers and populate the mapping table
 * @param {Object} tableInstance - Table instance configuration
 * @param {HTMLInputElement} fileInput - The file input element
 * @param {string} modalId - The modal ID
 * @param {Object} config - The import configuration
 */
function processImportFile(tableInstance, fileInput, modalId, config) {
    const file = fileInput.files[0];
    if (!file) {
        if (window.toastr) {
            toastr.error('Please select a file to import');
        } else {
            alert('Please select a file to import');
        }
        return;
    }
    
    // Show loading state
    const submitButton = document.getElementById(`${modalId}-submit`);
    if (submitButton) submitButton.disabled = true;
    
    // Check file type and extension
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const validExtensions = config.allowed_formats || ['csv', 'xlsx', 'xls'];
    
    if (!validExtensions.includes(fileExtension)) {
        if (window.toastr) {
            toastr.error(`Unsupported file format. Please upload a ${validExtensions.map(e => e.toUpperCase()).join(', ')} file.`);
        } else {
            alert(`Unsupported file format. Please upload a ${validExtensions.map(e => e.toUpperCase()).join(', ')} file.`);
        }
        resetImportForm(tableInstance, modalId);
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            let headers = [];
            
            // Parse file based on extension
            if (fileExtension === 'csv') {
                // Parse CSV
                const content = e.target.result;
                headers = content.split('\n')[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
            } else {
                // Parse Excel - check if XLSX library is available
                if (typeof XLSX !== 'undefined') {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    
                    if (jsonData && jsonData.length > 0) {
                        headers = jsonData[0];
                    }
                } else {
                    throw new Error('XLSX library not loaded. Cannot process Excel files.');
                }
            }
            
            // Filter out empty headers
            headers = headers.filter(h => h && h.trim() !== '');
            
            // Populate mapping table
            populateMappingTable(tableInstance, modalId, headers, config);
            
            // Enable submit button if we found headers
            if (submitButton && headers && headers.length > 0) {
                submitButton.disabled = false;
            }
            
        } catch (error) {
            console.error('Error processing file:', error);
            if (window.toastr) {
                toastr.error('Error processing file. Please ensure the file format is correct.');
            } else {
                alert('Error processing file. Please ensure the file format is correct.');
            }
            resetImportForm(tableInstance, modalId);
        }
    };
    
    reader.onerror = function() {
        if (window.toastr) {
            toastr.error('Error reading file. Please try again.');
        } else {
            alert('Error reading file. Please try again.');
        }
        resetImportForm(tableInstance, modalId);
    };
    
    // Read the file based on extension
    if (fileExtension === 'csv') {
        reader.readAsText(file);
    } else {
        reader.readAsArrayBuffer(file);
    }
}

/**
 * Populates the mapping table with system fields and file headers
 * @param {Object} tableInstance - Table instance configuration
 * @param {string} modalId - The modal ID
 * @param {Array} headers - The extracted file headers
 * @param {Object} config - The import configuration
 */
function populateMappingTable(tableInstance, modalId, headers, config) {
    const tableBody = document.querySelector(`#${modalId}-mapping-table tbody`);
    const mappingTable = document.getElementById(`${modalId}-mapping-table`);
    const mappingPlaceholder = document.getElementById(`${modalId}-mapping-placeholder`);
    
    if (!tableBody || !headers || headers.length === 0) {
        if (window.toastr) {
            toastr.error('No headers found in the file or mapping table not found');
        } else {
            alert('No headers found in the file or mapping table not found');
        }
        return;
    }
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Show mapping table, hide placeholder
    if (mappingTable) mappingTable.style.display = 'table';
    if (mappingPlaceholder) mappingPlaceholder.style.display = 'none';
    
    // Get system fields from configuration
    let systemFields = [];
    
    // Try to get from import config
    if (config && config.headers) {
        if (Array.isArray(config.headers)) {
            systemFields = config.headers.map(field => ({
                key: field,
                label: config.header_titles && config.header_titles[field] ? 
                    config.header_titles[field] : field
            }));
        } 
    }
    // If not found in import config, try to get from tableInstance.headerTitles
    else if (tableInstance.headerTitles && Object.keys(tableInstance.headerTitles).length > 0) {
        systemFields = Object.entries(tableInstance.headerTitles).map(([key, value]) => ({
            key: key,
            label: value
        }));
    }
    // Finally, try to get from jqGrid column model
    else {
        const colModel = tableInstance.$grid.jqGrid('getGridParam', 'colModel');
        if (colModel && Array.isArray(colModel)) {
            systemFields = colModel
                .filter(col => col.name !== 'actions' && col.name !== 'cb' && col.name !== 'rn' && col.name)
                .map(col => ({
                    key: col.name,
                    label: col.label || col.name
                }));
        }
    }
    
    // Create rows for each system field
    systemFields.forEach(field => {
        const row = document.createElement('tr');
        
        // System field column
        const fieldCell = document.createElement('td');
        fieldCell.textContent = field.label;
        row.appendChild(fieldCell);
        
        // File header dropdown column
        const dropdownCell = document.createElement('td');
        const select = document.createElement('select');
        select.className = 'form-control header-dropdown';
        select.setAttribute('name', `mapping-${field.key}`);
        select.setAttribute('data-field', field.key);
        
        // Add empty option
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = '-- Select Header --';
        select.appendChild(emptyOption);
        
        // Add header options
        headers.forEach(header => {
            const option = document.createElement('option');
            option.value = header;
            option.textContent = header;
            
            // Auto-select if header matches field name (case insensitive)
            if (header.toLowerCase() === field.label.toLowerCase() || 
                header.toLowerCase() === field.key.toLowerCase()) {
                option.selected = true;
            }
            
            select.appendChild(option);
        });
        
        dropdownCell.appendChild(select);
        row.appendChild(dropdownCell);
        
        // Default value column
        const defaultCell = document.createElement('td');
        const defaultInput = document.createElement('input');
        defaultInput.type = 'text';
        defaultInput.className = 'form-control default-value-input';
        defaultInput.setAttribute('name', `default-${field.key}`);
        defaultInput.setAttribute('placeholder', 'Enter default value');
        defaultInput.disabled = select.value !== '';
        defaultCell.appendChild(defaultInput);
        row.appendChild(defaultCell);
        
        // Add row to table
        tableBody.appendChild(row);
        
        // Setup event handlers
        select.addEventListener('change', function() {
            // Get the corresponding default value input
            const defaultInput = document.querySelector(`input[name="default-${this.getAttribute('data-field')}"]`);
            
            if (defaultInput) {
                // Enable or disable default value input based on dropdown selection
                if (this.value === '') {
                    // Dropdown is deselected/empty, enable default value input
                    defaultInput.disabled = false;
                } else {
                    // Dropdown has a value, disable default value input and clear it
                    defaultInput.disabled = true;
                    defaultInput.value = '';
                }
            }
            
            // Update other dropdowns to prevent duplicate selections
            updateDropdowns(modalId);
        });
        
        // Set initial state of default input based on select value
        defaultInput.disabled = select.value !== '';
        
        // Initialize Select2 if available
        if (typeof $.fn.select2 !== 'undefined') {
            try {
                $(select).select2({
                    width: '100%',
                    placeholder: 'Select a header',
                    allowClear: true,
                    dropdownParent: $(`#${modalId}-mapping-table`)
                });
                
                // Add additional event handlers for Select2
                $(select).on('select2:select', function(e) {
                    // When a selection is made in Select2, disable the default input
                    const defaultInput = document.querySelector(`input[name="default-${this.getAttribute('data-field')}"]`);
                    if (defaultInput) {
                        defaultInput.disabled = true;
                        defaultInput.value = '';
                    }
                });
                
                $(select).on('select2:unselect', function(e) {
                    // When a selection is cleared in Select2, enable the default input
                    const defaultInput = document.querySelector(`input[name="default-${this.getAttribute('data-field')}"]`);
                    if (defaultInput) {
                        defaultInput.disabled = false;
                    }
                });
            } catch (e) {
                console.warn('Error initializing Select2:', e);
            }
        }
    });
    
    // Initial update of dropdowns
    updateDropdowns(modalId);
}

/**
 * Updates dropdown options to prevent duplicate selections
 * @param {string} modalId - The modal ID
 */
function updateDropdowns(modalId) {
    const dropdowns = document.querySelectorAll(`#${modalId}-mapping-table .header-dropdown`);
    
    // Get all selected values
    const selectedValues = Array.from(dropdowns)
        .map(select => select.value)
        .filter(value => value !== '');
    
    // Update each dropdown
    dropdowns.forEach(select => {
        const currentValue = select.value;
        const fieldKey = select.getAttribute('data-field');
        const defaultInput = document.querySelector(`input[name="default-${fieldKey}"]`);
        
        // Important: Only update default input state if dropdown value changed
        // This ensures we don't override the user's manual enabling/disabling
        if (defaultInput) {
            // If dropdown has a value, default input should be disabled
            // If dropdown is empty, default input should be enabled
            defaultInput.disabled = currentValue !== '';
        }
        
        // Disable options that are selected in other dropdowns
        Array.from(select.options).forEach(option => {
            if (option.value === '') return;
            
            option.disabled = selectedValues.includes(option.value) && option.value !== currentValue;
        });
        
        // Update Select2 if available
        if (typeof $.fn.select2 !== 'undefined') {
            try {
                $(select).trigger('change.select2');
            } catch (e) {
                // Ignore if Select2 not available or error occurs
            }
        }
    });
}

/**
 * Resets the import form to its initial state
 * @param {Object} tableInstance - Table instance configuration
 * @param {string} modalId - The modal ID
 */
function resetImportForm(tableInstance, modalId) {
    // Reset file input
    const fileInput = document.getElementById(`${modalId}-file`);
    if (fileInput) {
        fileInput.value = '';
        const label = fileInput.nextElementSibling;
        if (label) {
            label.classList.remove('selected');
            label.innerHTML = 'Select file';
        }
    }
    
    // Hide mapping table, show placeholder
    const mappingTable = document.getElementById(`${modalId}-mapping-table`);
    const mappingPlaceholder = document.getElementById(`${modalId}-mapping-placeholder`);
    if (mappingTable) mappingTable.style.display = 'none';
    if (mappingPlaceholder) mappingPlaceholder.style.display = 'block';
    
    // Clear mapping table
    const tableBody = document.querySelector(`#${modalId}-mapping-table tbody`);
    if (tableBody) tableBody.innerHTML = '';
    
    // Disable submit button
    const submitButton = document.getElementById(`${modalId}-submit`);
    if (submitButton) submitButton.disabled = true;
}

/**
 * Submits the import form with file and mapping data
 * @param {Object} tableInstance - Table instance configuration
 * @param {string} modalId - The modal ID
 */
function submitImportForm(tableInstance, modalId) {
    const form = document.getElementById(`${modalId}-form`);
    const fileInput = document.getElementById(`${modalId}-file`);
    
    if (!form || !fileInput || !fileInput.files.length) {
        if (window.toastr) {
            toastr.error('Please select a file to import');
        } else {
            alert('Please select a file to import');
        }
        return;
    }
    
    // Validate that we have at least one mapped column or default value
    let hasMappedColumn = false;
    const mappedColumns = {};
    const defaultValues = {};
    
    // Collect all dropdown values and default values
    document.querySelectorAll(`#${modalId}-mapping-table .header-dropdown`).forEach(select => {
        const fieldKey = select.getAttribute('data-field');
        mappedColumns[fieldKey] = select.value;
        
        if (select.value) {
            hasMappedColumn = true;
        }
        
        // Get corresponding default value input
        const defaultInput = document.querySelector(`input[name="default-${fieldKey}"]`);
        if (defaultInput && !select.value && defaultInput.value) {
            defaultValues[fieldKey] = defaultInput.value;
            hasMappedColumn = true;
        }
    });
    
    if (!hasMappedColumn) {
        if (window.toastr) {
            toastr.error('Please map at least one column or set a default value');
        } else {
            alert('Please map at least one column or set a default value');
        }
        return;
    }
    
    // Create FormData object
    const formData = new FormData();
    
    // Append the file
    formData.append('import_file', fileInput.files[0]);
    
    // Append mapped columns and default values as JSON strings
    formData.append('mapped_columns', JSON.stringify(mappedColumns));
    formData.append('default_values', JSON.stringify(defaultValues));
    
    // Show progress
    const submitButton = document.getElementById(`${modalId}-submit`);
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> Processing...';
    }
    
    // Submit to API
    $.ajax({
        url: `/api/${tableInstance.appName}/${tableInstance.tableName}/import_data/`,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: window.token || {},
        success: function(response) {
            if (response.status) {
                $(`#${modalId}`).modal('hide');
                
                if (window.toastr) {
                    toastr.success(response.message || 'Data imported successfully');
                } else {
                    alert('Data imported successfully');
                }
                
                // Refresh grid
                tableInstance.$grid.trigger('reloadGrid');
                
                // Check for task ID for background processing
                if (response.task_id) {
                    checkImportTaskStatus(tableInstance, response.task_id);
                }
            } else {
                if (window.toastr) {
                    toastr.error(response.error || 'Import failed');
                } else {
                    alert(response.error || 'Import failed');
                }
                
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Import Data';
                }
            }
        },
        error: function(xhr, status, error) {
            let errorMessage = 'Error importing data';
            
            if (xhr.responseJSON && xhr.responseJSON.message) {
                errorMessage = xhr.responseJSON.message;
            } else if (xhr.responseJSON && xhr.responseJSON.error) {
                errorMessage = xhr.responseJSON.error;
            } else if (xhr.statusText) {
                errorMessage += ': ' + xhr.statusText;
            }
            
            if (window.toastr) {
                toastr.error(errorMessage);
            } else {
                alert(errorMessage);
            }
            
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Import Data';
            }
        }
    });
}

/**
 * Check import task status and show the progress/result to the user
 * @param {Object} tableInstance - Table instance configuration
 * @param {string} taskId - The task ID
 */
function checkImportTaskStatus(tableInstance, taskId) {
    // Create or get progress modal
    const progressModalId = `import-progress-${tableInstance.id}`;
    let progressModal = document.getElementById(progressModalId);
    
    if (!progressModal) {
        progressModal = document.createElement('div');
        progressModal.className = 'modal fade';
        progressModal.id = progressModalId;
        progressModal.setAttribute('tabindex', '-1');
        progressModal.setAttribute('role', 'dialog');
        
        progressModal.innerHTML = `
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Import Progress</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p class="progress-message">Preparing import...</p>
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" 
                                role="progressbar" style="width: 0%" 
                                aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(progressModal);
    }
    
    // Show progress modal
    $(`#${progressModalId}`).modal('show');
    
    // Check task status
    function pollTaskStatus() {
        $.ajax({
            url: `/api/${tableInstance.appName}/task/${taskId}/`,
            method: 'GET',
            headers: window.token || {},
            success: function(response) {
                if (!response.data) {
                    if (window.toastr) {
                        toastr.error('Invalid response from server');
                    } else {
                        alert('Invalid response from server');
                    }
                    $(`#${progressModalId}`).modal('hide');
                    return;
                }
                
                const status = response.data.task_status;
                const completed = response.data.completed_count || 0;
                const total = response.data.total_count || 1;
                const percentage = response.data.completed_percentage || Math.round((completed / total) * 100);
                
                // Update progress UI
                $(`#${progressModalId} .progress-message`).text(
                    `Status: ${status}. ${completed} of ${total} records processed.`
                );
                $(`#${progressModalId} .progress-bar`).css('width', `${percentage}%`);
                $(`#${progressModalId} .progress-bar`).attr('aria-valuenow', percentage);
                
                // Handle based on status
                if (status === 'COMPLETED') {
                    $(`#${progressModalId}`).modal('hide');
                    if (window.toastr) {
                        toastr.success(`Import completed successfully! ${completed} records processed.`);
                    } else {
                        alert(`Import completed successfully! ${completed} records processed.`);
                    }
                    tableInstance.$grid.trigger('reloadGrid');
                } else if (status === 'PARTIALLY COMPLETED') {
                    $(`#${progressModalId}`).modal('hide');
                    if (window.toastr) {
                        toastr.warning(`Import partially completed. ${completed} of ${total} records processed successfully.`);
                    } else {
                        alert(`Import partially completed. ${completed} of ${total} records processed successfully.`);
                    }
                    tableInstance.$grid.trigger('reloadGrid');
                } else if (status === 'FAILED') {
                    $(`#${progressModalId}`).modal('hide');
                    if (window.toastr) {
                        toastr.error('Import failed. Please check the error logs.');
                    } else {
                        alert('Import failed. Please check the error logs.');
                    }
                } else {
                    // Continue polling if still in progress
                    setTimeout(pollTaskStatus, 2000);
                }
            },
            error: function() {
                $(`#${progressModalId}`).modal('hide');
                if (window.toastr) {
                    toastr.error('Failed to check import status');
                } else {
                    alert('Failed to check import status');
                }
            }
        });
    }
    
    // Start polling
    pollTaskStatus();
}

// Find in the original code the setupExportUI function and replace it with this enhanced version
/**
 * Sets up the export UI for a specific table instance
 * @param {Object} tableInstance - Table instance configuration
 * @param {Object} config - Export configuration
 */
function setupExportUI(tableInstance, config) {
    // Create modal ID
    const modalId = `export-modal-${tableInstance.id}`;
    let exportModal = document.getElementById(modalId);

    if (!exportModal) {
        // Create the modal
        exportModal = document.createElement('div');
        exportModal.className = 'modal fade';
        exportModal.id = modalId;
        exportModal.setAttribute('tabindex', '-1');
        exportModal.setAttribute('role', 'dialog');
        exportModal.setAttribute('aria-labelledby', `${modalId}-title`);
        exportModal.setAttribute('aria-hidden', 'true');

        // Create modal content
        exportModal.innerHTML = `
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${modalId}-title">Export Data</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-7">
                                <div class="form-group">
                                    <label for="${modalId}-columns">Export Columns:</label>
                                    <select id="${modalId}-columns" class="export-columns" multiple></select>
                                    <small class="form-text text-muted">Select columns or choose "All Columns"</small>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <label>Export Format:</label>
                                    <div class="export-formats" id="${modalId}-formats"></div>
                                </div>
                                <div class="form-check mt-3">
                                    <input class="form-check-input" type="checkbox" id="${modalId}-background">
                                    <label class="form-check-label" for="${modalId}-background">
                                        Process in background (for large exports)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(exportModal);
    }

    // Add export button to table toolbar
    addExportButtonToToolbar(tableInstance, modalId, config);
}

/**
 * Adds an export button to the table toolbar
 * @param {Object} tableInstance - Table instance configuration
 * @param {string} modalId - Modal ID for export
 * @param {Object} config - Export configuration
 */
function addExportButtonToToolbar(tableInstance, modalId, config) {
    // Look for existing button container in the custom buttons area
    const customButtonsContainer = document.getElementById(tableInstance.toolbarSettings.customButtonsContainerId);
    if (!customButtonsContainer) return;
    
    // Check if button already exists
    const existingButton = document.getElementById(`${tableInstance.id}-export-btn`);
    if (existingButton) return;
    
    // Get allowed formats
    const allowedFormats = config.allowed_formats || ['xlsx', 'csv', 'pdf'];
    
    // Create export button group
    const exportBtnGroup = document.createElement('div');
    exportBtnGroup.className = 'btn-group';
    exportBtnGroup.id = `${tableInstance.id}-export-btn`;
    
    // Create main button
    const mainButton = document.createElement('button');
    mainButton.type = 'button';
    mainButton.className = 'btn btn-success btn-sm dropdown-toggle';
    mainButton.innerHTML = '<i class="fas fa-download"></i> Export';
    mainButton.setAttribute('data-toggle', 'dropdown');
    mainButton.setAttribute('aria-haspopup', 'true');
    mainButton.setAttribute('aria-expanded', 'false');
    
    // Create dropdown menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu dropdown-menu-right';
    
    // Add "Configure Export" option
    const configureLink = document.createElement('a');
    configureLink.href = '#';
    configureLink.className = 'dropdown-item export-modal-link';
    configureLink.style.color = 'black';
    configureLink.innerHTML = 'Configure Export';
    configureLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Update column options from current grid fields before showing modal
        updateExportColumnOptions(tableInstance, modalId);
        $(`#${modalId}`).modal('show');
    });
    dropdownMenu.appendChild(configureLink);
    
    // Add divider
    const divider = document.createElement('div');
    divider.className = 'dropdown-divider';
    dropdownMenu.appendChild(divider);
    
    // Add format options
    allowedFormats.forEach(format => {
        const formatLink = document.createElement('a');
        formatLink.href = '#';
        formatLink.className = 'dropdown-item quick-export';
        formatLink.style.color = 'black';
        formatLink.setAttribute('data-format', format);
        
        // Add icon based on format
        let icon = '';
        switch(format.toLowerCase()) {
            case 'xlsx':
            case 'xls':
                icon = '<i class="fas fa-file-excel mr-2"></i>';
                break;
            case 'csv':
                icon = '<i class="fas fa-file-csv mr-2"></i>';
                break;
            case 'pdf':
                icon = '<i class="fas fa-file-pdf mr-2"></i>';
                break;
            default:
                icon = '<i class="fas fa-file mr-2"></i>';
        }
        
        formatLink.innerHTML = `${icon}${format.toUpperCase()} (Quick)`;
        formatLink.addEventListener('click', function(e) {
            e.preventDefault();
            exportTableData(tableInstance, format, false);
        });
        
        dropdownMenu.appendChild(formatLink);
    });
    
    // Assemble button group
    exportBtnGroup.appendChild(mainButton);
    exportBtnGroup.appendChild(dropdownMenu);
    
    // Add to container
    customButtonsContainer.appendChild(exportBtnGroup);

    // Set up the column selection in the modal
    const columnSelect = document.getElementById(`${modalId}-columns`);
    if (columnSelect) {
        // Initialize select2 with a delay to ensure DOM is ready
        setTimeout(() => {
            try {
                $(columnSelect).select2({
                    width: '100%',
                    placeholder: 'Select columns to export',
                    allowClear: true,
                    dropdownParent: $(`#${modalId} .modal-body`)
                });

                // Special handler for the "All Columns" option
                $(columnSelect).on('select2:select', function(e) {
                    if (e.params.data.id === 'all') {
                        // If "All Columns" is selected, deselect everything else
                        const nonAllOptions = Array.from(this.options)
                            .filter(option => option.value !== 'all')
                            .map(option => option.value);

                        // Deselect all other options
                        $(this).val(['all']).trigger('change');
                    } else {
                        // If a specific column is selected, deselect "All Columns"
                        const currentValues = $(this).val() || [];
                        if (currentValues.includes('all')) {
                            const newValues = currentValues.filter(val => val !== 'all');
                            $(this).val(newValues).trigger('change');
                        }
                    }
                });

                // Handle deselection
                $(columnSelect).on('select2:unselect', function(e) {
                    const currentValues = $(this).val() || [];

                    // If no options are selected, default to "All Columns"
                    if (currentValues.length === 0) {
                        $(this).val(['all']).trigger('change');
                    }
                });
            } catch (e) {
                console.error('Error initializing Select2:', e);
                // Fall back to basic select if Select2 initialization fails
                columnSelect.classList.add('form-control');
            }
        }, 200);
    }

    // Set up the format options
    const formatsContainer = document.getElementById(`${modalId}-formats`);
    if (formatsContainer) {
        formatsContainer.innerHTML = '';

        // Add format options as buttons
        const allowedFormats = config && config.allowed_formats && Array.isArray(config.allowed_formats) ? 
            config.allowed_formats : ['csv', 'xlsx', 'json'];

        allowedFormats.forEach(ext => {
            const formatButton = document.createElement('button');
            formatButton.className = 'btn btn-outline-secondary m-1';
            formatButton.setAttribute('type', 'button');
            formatButton.onclick = () => {
                $(`#${modalId}`).modal('hide');
                const background = document.getElementById(`${modalId}-background`).checked;
                const columns = $(columnSelect).val() || ['all'];
                exportTableData(tableInstance, ext, background, columns);
            };

            // Icon based on format type
            let icon = '';
            switch(ext.toLowerCase()) {
                case 'xlsx':
                case 'xls':
                    icon = '<i class="fas fa-file-excel mr-2"></i>';
                    break;
                case 'csv':
                    icon = '<i class="fas fa-file-csv mr-2"></i>';
                    break;
                case 'pdf':
                    icon = '<i class="fas fa-file-pdf mr-2"></i>';
                    break;
                case 'json':
                    icon = '<i class="fas fa-file-code mr-2"></i>';
                    break;
                default:
                    icon = '<i class="fas fa-file mr-2"></i>';
            }

            formatButton.innerHTML = `${icon}${ext.toUpperCase()}`;
            formatsContainer.appendChild(formatButton);
        });
    }
}

/**
 * Updates the export column options from the current grid fields
 * @param {Object} tableInstance - Table instance configuration
 * @param {string} modalId - The modal ID
 */
function updateExportColumnOptions(tableInstance, modalId) {
    try {
        const columnSelect = document.getElementById(`${modalId}-columns`);

        // Only proceed if select exists
        if (!columnSelect) {
            return;
        }

        // Get current selected values to preserve them if possible
        const currentSelected = $(columnSelect).val() || ['all'];

        // Get fields from table instance
        let fields = [];

        // First try to get from table instance's headerTitles
        if (tableInstance.headerTitles && Object.keys(tableInstance.headerTitles).length > 0) {
            fields = Object.entries(tableInstance.headerTitles).map(([key, label]) => ({
                name: key,
                label: label
            }));
        } 
        // Then try to get from jqGrid's column model
        else {
            const colModel = tableInstance.$grid.jqGrid('getGridParam', 'colModel');
            if (colModel && Array.isArray(colModel)) {
                fields = colModel
                    .filter(col => col.name !== 'actions' && col.name !== 'cb' && col.name !== 'rn' && col.name)
                    .map(col => ({
                        name: col.name,
                        label: col.label || col.name
                    }));
            }
        }

        // Clear existing options
        columnSelect.innerHTML = '';

        // Add All Columns option
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'All Columns';
        columnSelect.appendChild(allOption);

        // Add options for each field
        fields.forEach(field => {
            const option = document.createElement('option');
            option.value = field.name;
            option.textContent = field.label;
            columnSelect.appendChild(option);
        });

        // Restore selection if possible, otherwise select "All Columns"
        const validOptions = Array.from(columnSelect.options).map(opt => opt.value);
        const validSelections = currentSelected.filter(val => validOptions.includes(val));

        if (validSelections.length > 0) {
            $(columnSelect).val(validSelections);
        } else {
            $(columnSelect).val(['all']);
        }

        // Trigger change for select2
        try {
            $(columnSelect).trigger('change');
        } catch (e) {
            // Ignore if Select2 not available
        }
    } catch (error) {
        console.error('Error updating export columns:', error);
    }
}

/**
 * Exports table data with the selected columns and format
 * @param {Object} tableInstance - Table instance configuration
 * @param {string} format - Export format 
 * @param {boolean} background - Whether to process in background
 * @param {Array} columns - Columns to export (default: ['all'])
 */
function exportTableData(tableInstance, format, background = false, columns = ['all']) {
    // Get filter and sorting data from jqGrid
    const postData = tableInstance.$grid.jqGrid('getGridParam', 'postData') || {};
    const filterParams = new URLSearchParams();
    
    // Add export format
    filterParams.append('ext', format);
    
    // Add search parameters if present
    if (postData._search === true) {
        filterParams.append('_search', 'true');
        
        // Add filters JSON
        if (postData.filters) {
            filterParams.append('filters', postData.filters);
        }
        
        // Add simple search parameters
        if (postData.searchField) {
            filterParams.append('searchField', postData.searchField);
            filterParams.append('searchString', postData.searchString);
            filterParams.append('searchOper', postData.searchOper);
        }
    }
    
    // Add sorting parameters
    if (postData.sidx) {
        filterParams.append('sidx', postData.sidx);
        filterParams.append('sord', postData.sord || 'asc');
    }

    // Handle column parameter
    if (columns.includes('all')) {
        filterParams.append('columns', 'all');
    } else {
        filterParams.append('columns', columns.join(','));
    }

    // Add background processing flag if needed
    if (background) {
        filterParams.append('background', 'true');
    }
    
    // Construct export URL
    const exportUrl = `/api/${tableInstance.appName}/${tableInstance.tableName}/export_data/?${filterParams.toString()}`;
    
    // Show loading message
    if (window.toastr) {
        toastr.info(`Preparing ${format.toUpperCase()} export...`);
    }
    
    if (background) {
        // For background processing, use AJAX to get task ID
        $.ajax({
            url: exportUrl,
            method: 'GET',
            headers: window.token || {},
            success: function(response) {
                if (response.status && response.task_id) {
                    if (window.toastr) {
                        toastr.info('Export is being processed in the background. You will be notified when it\'s ready.');
                    } else {
                        alert('Export is being processed in the background. You will be notified when it\'s ready.');
                    }
                    
                    // Monitor the task status
                    checkExportTaskStatus(tableInstance, response.task_id);
                } else {
                    if (window.toastr) {
                        toastr.warning('Background export initiated but no task ID returned');
                    } else {
                        alert('Background export initiated but no task ID returned');
                    }
                }
            },
            error: function(xhr) {
                handleExportError(xhr);
            }
        });
    } else {
        // For direct download, use iframe approach to avoid navigation
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = exportUrl;
        document.body.appendChild(iframe);
        
        // Set timeout to remove iframe and show success message
        setTimeout(() => {
            if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
            }
            
            if (window.toastr) {
                toastr.success(`${format.toUpperCase()} export completed. Check your downloads folder.`);
            }
        }, 3000);
    }
}

/**
 * Checks the status of a background export task
 * @param {Object} tableInstance - Table instance configuration
 * @param {string} taskId - Task ID
 */
function checkExportTaskStatus(tableInstance, taskId) {
    setTimeout(function checkStatus() {
        $.ajax({
            url: `/api/${tableInstance.appName}/task/${taskId}/`,
            method: 'GET',
            headers: window.token || {},
            success: function(response) {
                if (!response.data) return;
                
                const status = response.data.task_status;
                
                if (status === 'COMPLETED') {
                    // Get download URL if available
                    if (response.data.file_url) {
                        if (window.toastr) {
                            toastr.success('Export completed successfully. Downloading file...');
                        } else {
                            alert('Export completed successfully. Downloading file...');
                        }
                        
                        // Trigger download using iframe
                        const iframe = document.createElement('iframe');
                        iframe.style.display = 'none';
                        iframe.src = response.data.file_url;
                        document.body.appendChild(iframe);
                        
                        setTimeout(() => {
                            if (document.body.contains(iframe)) {
                                document.body.removeChild(iframe);
                            }
                        }, 3000);
                    } else {
                        if (window.toastr) {
                            toastr.success('Export completed successfully.');
                        } else {
                            alert('Export completed successfully.');
                        }
                    }
                } else if (status === 'FAILED') {
                    if (window.toastr) {
                        toastr.error('Export failed. Please try again or contact support.');
                    } else {
                        alert('Export failed. Please try again or contact support.');
                    }
                } else {
                    // Still processing, check again after delay
                    setTimeout(checkStatus, 3000);
                }
            },
            error: function() {
                if (window.toastr) {
                    toastr.error('Failed to check export status');
                } else {
                    alert('Failed to check export status');
                }
            }
        });
    }, 3000); // Initial delay before first check
}

/**
 * Handles export errors
 * @param {Object} xhr - XHR response
 */
function handleExportError(xhr) {
    let errorMessage = 'Export failed. Please try again.';
    
    if (xhr.responseJSON && xhr.responseJSON.message) {
        errorMessage = xhr.responseJSON.message;
    } else if (xhr.responseJSON && xhr.responseJSON.error) {
        errorMessage = xhr.responseJSON.error;
    } else if (xhr.statusText) {
        errorMessage += ' Error: ' + xhr.statusText;
    }
    
    if (window.toastr) {
        toastr.error(errorMessage);
    } else {
        alert(errorMessage);
    }
}

// Extend the importExportUtils with the new functions
window.importExportUtils = {
    ...window.importExportUtils,
    exportTableData: exportTableData,
    updateExportColumnOptions: updateExportColumnOptions
};

// Export functions to global namespace
window.importExportUtils = {
    initializeImportExport: initializeImportExport,
    setupImportUI: setupImportUI,
    setupExportUI: setupExportUI,
    exportTableData: exportTableData
};

// Update the fetchAdditionalDataForTable function to use the new import/export module
window.fetchAdditionalDataForTable = function(tableInstance) {
    const apiUrl = `/api/${tableInstance.appName}/${tableInstance.tableName}/additional_data_response/`;
    
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function(response) {
            const data = response.data;
            if (data) {
                // Store header titles in table instance
                if (data.header_titles) {
                    tableInstance.headerTitles = data.header_titles;
                }
                
                // Update bulk action configuration if available
                if (data.bulk_action_config) {
                    initializeBulkActionsForTable(tableInstance, data.bulk_action_config);
                }
                
                // Initialize import/export configuration if available
                if (data.import_config || data.export_config) {
                    initializeImportExport(tableInstance, data);
                }
                
                // Apply conditional formatting if available
                if (data.conditional_formatting || data.highlight_rules) {
                    applyConditionalFormatting(tableInstance, data.conditional_formatting, data.highlight_rules);
                }
                
                // Trigger custom event when additional data is loaded
                if (typeof tableInstance.options.onAdditionalDataLoaded === 'function') {
                    tableInstance.options.onAdditionalDataLoaded(tableInstance, data);
                }
            }
        },
        error: function(xhr, status, error) {
            console.error(`Error loading additional data for ${tableInstance.tableName}:`, error);
        }
    });
};