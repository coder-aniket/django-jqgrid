/**
 * Integration code to connect the import/export functionality
 * with the multi-database jqGrid implementation
 */

// Update fetchAdditionalDataForTable to include import/export functionality
// const originalFetchAdditionalDataForTable = fetchAdditionalDataForTable;

// fetchAdditionalDataForTable = function(tableInstance) {
//     return originalFetchAdditionalDataForTable(tableInstance).then(function(response) {
//         // Initialize import/export if configuration is available
//         if (tableInstance.importConfig || tableInstance.exportConfig) {
//             const config = {
//                 import_config: tableInstance.importConfig,
//                 export_config: tableInstance.exportConfig
//             };

//             if (window.importExportUtils && window.importExportUtils.initializeImportExport) {
//                 window.importExportUtils.initializeImportExport(tableInstance, config);
//             } else if (window.initializeImportExport) {
//                 window.initializeImportExport(tableInstance, config);
//             }
//         }

//         return response;
//     });
// };

// // Example of additional initialization in the document.ready function
// (function($) {
//     $(document).ready(function() {
//         // After all tables are initialized
//         setTimeout(function() {
//             // For each table instance, ensure import/export is set up
//             for (const tableId in window.tables) {
//                 const tableInstance = window.tables[tableId];

//                 // Find import/export buttons for this table
//                 const importButtons = $(`.import-buttons[table-name="${tableInstance.tableName}"]`);
//                 const exportButtons = $(`.export-buttons[table-name="${tableInstance.tableName}"]`);

//                 // If buttons exist but import/export not initialized, set them up
//                 if ((importButtons.length > 0 || exportButtons.length > 0) &&
//                     (!tableInstance.importConfig && !tableInstance.exportConfig)) {

//                     // Create default configs
//                     const config = {
//                         import_config: {
//                             allowed_formats: ['csv', 'xlsx', 'xls'],
//                             headers: tableInstance.headerTitles || {}
//                         },
//                         export_config: {
//                             allowed_formats: ['csv', 'xlsx', 'json'],
//                             headers: tableInstance.headerTitles || {}
//                         }
//                     };

//                     // Initialize import/export
//                     if (window.importExportUtils && window.importExportUtils.initializeImportExport) {
//                         window.importExportUtils.initializeImportExport(tableInstance, config);
//                     } else if (window.initializeImportExport) {
//                         window.initializeImportExport(tableInstance, config);
//                     }
//                 }
//             }
//         }, 1000); // Give time for all tables to be fully initialized
//     });
// })(jQuery);