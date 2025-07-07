/**
 * Advanced Features JavaScript for django-jqgrid Examples
 * Demonstrates comprehensive jqGrid functionality and customization
 */

// Master-Detail Sample Data (declare first)
const masterDetailData = {
    // Master table: Companies
    companies: [
        {id: 1, name: "Tech Corp", industry: "Technology", founded: 2010, headquarters: "San Francisco, CA", revenue: 50000000, employees: 250, status: "active"},
        {id: 2, name: "Global Manufacturing", industry: "Manufacturing", founded: 1995, headquarters: "Detroit, MI", revenue: 150000000, employees: 1200, status: "active"},
        {id: 3, name: "Retail Solutions", industry: "Retail", founded: 2005, headquarters: "Chicago, IL", revenue: 25000000, employees: 180, status: "active"},
        {id: 4, name: "Financial Services Inc", industry: "Finance", founded: 1988, headquarters: "New York, NY", revenue: 75000000, employees: 450, status: "active"},
        {id: 5, name: "Healthcare Partners", industry: "Healthcare", founded: 2000, headquarters: "Boston, MA", revenue: 35000000, employees: 220, status: "active"}
    ],
    
    // Child table: Departments
    departments: [
        // Tech Corp departments
        {id: 1, company_id: 1, name: "Engineering", manager: "John Smith", budget: 5000000, employees: 85, location: "Building A"},
        {id: 2, company_id: 1, name: "Product Management", manager: "Sarah Johnson", budget: 2000000, employees: 25, location: "Building B"},
        {id: 3, company_id: 1, name: "Sales", manager: "Mike Chen", budget: 3000000, employees: 40, location: "Building C"},
        {id: 4, company_id: 1, name: "Marketing", manager: "Lisa Brown", budget: 1500000, employees: 15, location: "Building B"},
        
        // Global Manufacturing departments
        {id: 5, company_id: 2, name: "Production", manager: "Robert Wilson", budget: 15000000, employees: 800, location: "Factory Floor"},
        {id: 6, company_id: 2, name: "Quality Control", manager: "Emily Davis", budget: 2000000, employees: 50, location: "QC Lab"},
        {id: 7, company_id: 2, name: "Research & Development", manager: "David Lee", budget: 8000000, employees: 120, location: "R&D Center"},
        {id: 8, company_id: 2, name: "Operations", manager: "Anna Martinez", budget: 5000000, employees: 80, location: "Admin Building"},
        
        // Retail Solutions departments
        {id: 9, company_id: 3, name: "Store Operations", manager: "Tom Anderson", budget: 3000000, employees: 120, location: "Main Office"},
        {id: 10, company_id: 3, name: "Supply Chain", manager: "Jessica Taylor", budget: 2500000, employees: 35, location: "Warehouse"},
        {id: 11, company_id: 3, name: "Customer Service", manager: "Mark Johnson", budget: 1200000, employees: 25, location: "Call Center"},
        
        // Financial Services departments
        {id: 12, company_id: 4, name: "Investment Banking", manager: "Patricia White", budget: 10000000, employees: 150, location: "Floor 40"},
        {id: 13, company_id: 4, name: "Wealth Management", manager: "James Brown", budget: 8000000, employees: 100, location: "Floor 35"},
        {id: 14, company_id: 4, name: "Risk Management", manager: "Maria Garcia", budget: 3000000, employees: 60, location: "Floor 42"},
        {id: 15, company_id: 4, name: "Compliance", manager: "Charles Wilson", budget: 2000000, employees: 40, location: "Floor 38"},
        
        // Healthcare Partners departments
        {id: 16, company_id: 5, name: "Clinical Operations", manager: "Dr. Susan Miller", budget: 8000000, employees: 120, location: "Medical Center"},
        {id: 17, company_id: 5, name: "Research", manager: "Dr. Michael Thompson", budget: 5000000, employees: 45, location: "Research Lab"},
        {id: 18, company_id: 5, name: "Administration", manager: "Nancy Davis", budget: 1500000, employees: 35, location: "Admin Wing"},
        {id: 19, company_id: 5, name: "IT Support", manager: "Kevin Rodriguez", budget: 2000000, employees: 20, location: "IT Center"}
    ],
    
    // Grand-child table: Employees in departments
    employees: [
        // Tech Corp - Engineering
        {id: 1, department_id: 1, name: "Alice Johnson", position: "Senior Software Engineer", salary: 120000, hire_date: "2020-03-15", email: "alice.johnson@techcorp.com", phone: "+1-555-0101"},
        {id: 2, department_id: 1, name: "Bob Wilson", position: "Software Engineer", salary: 95000, hire_date: "2021-07-20", email: "bob.wilson@techcorp.com", phone: "+1-555-0102"},
        {id: 3, department_id: 1, name: "Carol Davis", position: "DevOps Engineer", salary: 105000, hire_date: "2019-11-10", email: "carol.davis@techcorp.com", phone: "+1-555-0103"},
        
        // Tech Corp - Product Management
        {id: 4, department_id: 2, name: "Daniel Brown", position: "Product Manager", salary: 110000, hire_date: "2020-01-05", email: "daniel.brown@techcorp.com", phone: "+1-555-0104"},
        {id: 5, department_id: 2, name: "Eva Martinez", position: "Product Analyst", salary: 85000, hire_date: "2021-09-12", email: "eva.martinez@techcorp.com", phone: "+1-555-0105"},
        
        // Global Manufacturing - Production
        {id: 6, department_id: 5, name: "Frank Taylor", position: "Production Manager", salary: 90000, hire_date: "2018-04-18", email: "frank.taylor@globalmfg.com", phone: "+1-555-0106"},
        {id: 7, department_id: 5, name: "Grace Lee", position: "Line Supervisor", salary: 65000, hire_date: "2019-06-22", email: "grace.lee@globalmfg.com", phone: "+1-555-0107"},
        {id: 8, department_id: 5, name: "Henry Chen", position: "Quality Inspector", salary: 55000, hire_date: "2020-12-03", email: "henry.chen@globalmfg.com", phone: "+1-555-0108"},
        
        // Retail Solutions - Store Operations
        {id: 9, department_id: 9, name: "Iris Rodriguez", position: "Store Manager", salary: 75000, hire_date: "2019-08-15", email: "iris.rodriguez@retailsol.com", phone: "+1-555-0109"},
        {id: 10, department_id: 9, name: "Jack Thompson", position: "Assistant Manager", salary: 50000, hire_date: "2021-02-28", email: "jack.thompson@retailsol.com", phone: "+1-555-0110"},
        
        // Financial Services - Investment Banking
        {id: 11, department_id: 12, name: "Karen White", position: "Investment Banker", salary: 150000, hire_date: "2017-10-12", email: "karen.white@finserv.com", phone: "+1-555-0111"},
        {id: 12, department_id: 12, name: "Larry Anderson", position: "Financial Analyst", salary: 95000, hire_date: "2020-05-20", email: "larry.anderson@finserv.com", phone: "+1-555-0112"},
        
        // Healthcare Partners - Clinical Operations
        {id: 13, department_id: 16, name: "Dr. Monica Garcia", position: "Chief Medical Officer", salary: 250000, hire_date: "2015-01-10", email: "monica.garcia@healthpartners.com", phone: "+1-555-0113"},
        {id: 14, department_id: 16, name: "Dr. Nathan Miller", position: "Physician", salary: 180000, hire_date: "2018-09-05", email: "nathan.miller@healthpartners.com", phone: "+1-555-0114"}
    ]
};

// Sample data for demonstration
const sampleDataSets = {
    products: [
        {id: 1, name: "MacBook Pro 16\"", price: 2399.99, stock: 25, status: "active", category: "Electronics", progress: 85, brand: "Apple", rating: 4.8, created: "2024-01-15"},
        {id: 2, name: "Dell XPS 13", price: 1299.50, stock: 42, status: "active", category: "Electronics", progress: 92, brand: "Dell", rating: 4.6, created: "2024-02-20"},
        {id: 3, name: "The Design of Everyday Things", price: 18.99, stock: 156, status: "active", category: "Books", progress: 78, brand: "Basic Books", rating: 4.7, created: "2024-01-05"},
        {id: 4, name: "Wireless Mouse", price: 45.00, stock: 0, status: "pending", category: "Electronics", progress: 30, brand: "Logitech", rating: 4.2, created: "2024-03-10"},
        {id: 5, name: "Clean Code", price: 32.99, stock: 89, status: "active", category: "Books", progress: 95, brand: "Prentice Hall", rating: 4.9, created: "2024-01-25"},
        {id: 6, name: "Yoga Mat", price: 24.99, stock: 67, status: "active", category: "Sports", progress: 88, brand: "Manduka", rating: 4.5, created: "2024-02-14"},
        {id: 7, name: "Coffee Maker", price: 89.99, stock: 15, status: "inactive", category: "Home", progress: 65, brand: "Keurig", rating: 4.3, created: "2024-03-05"},
        {id: 8, name: "Running Shoes", price: 129.99, stock: 234, status: "active", category: "Sports", progress: 76, brand: "Nike", rating: 4.4, created: "2024-01-30"},
        {id: 9, name: "Desk Lamp", price: 56.50, stock: 12, status: "pending", category: "Home", progress: 42, brand: "IKEA", rating: 4.1, created: "2024-02-28"},
        {id: 10, name: "Bluetooth Headphones", price: 199.99, stock: 78, status: "active", category: "Electronics", progress: 91, brand: "Sony", rating: 4.6, created: "2024-01-18"}
    ],
    employees: [
        {id: 1, name: "John Smith", position: "Software Engineer", department: "Engineering", salary: 85000, status: "active", hire_date: "2022-03-15", email: "john.smith@company.com", phone: "+1-555-0101", experience: 5},
        {id: 2, name: "Sarah Johnson", position: "Product Manager", department: "Product", salary: 95000, status: "active", hire_date: "2021-07-20", email: "sarah.johnson@company.com", phone: "+1-555-0102", experience: 8},
        {id: 3, name: "Mike Chen", position: "UX Designer", department: "Design", salary: 72000, status: "active", hire_date: "2023-01-10", email: "mike.chen@company.com", phone: "+1-555-0103", experience: 3},
        {id: 4, name: "Emily Davis", position: "Data Scientist", department: "Analytics", salary: 105000, status: "active", hire_date: "2020-11-05", email: "emily.davis@company.com", phone: "+1-555-0104", experience: 6},
        {id: 5, name: "David Wilson", position: "DevOps Engineer", department: "Engineering", salary: 88000, status: "on_leave", hire_date: "2022-09-12", email: "david.wilson@company.com", phone: "+1-555-0105", experience: 4},
        {id: 6, name: "Lisa Brown", position: "Marketing Manager", department: "Marketing", salary: 78000, status: "active", hire_date: "2021-04-18", email: "lisa.brown@company.com", phone: "+1-555-0106", experience: 7},
        {id: 7, name: "Robert Taylor", position: "Sales Representative", department: "Sales", salary: 65000, status: "active", hire_date: "2023-06-22", email: "robert.taylor@company.com", phone: "+1-555-0107", experience: 2},
        {id: 8, name: "Anna Martinez", position: "HR Specialist", department: "Human Resources", salary: 58000, status: "active", hire_date: "2022-12-03", email: "anna.martinez@company.com", phone: "+1-555-0108", experience: 4}
    ],
    orders: [
        {id: 1001, customer: "Acme Corp", amount: 1250.00, status: "shipped", order_date: "2024-03-01", ship_date: "2024-03-03", priority: "high", sales_rep: "John Doe", region: "North America"},
        {id: 1002, customer: "Tech Solutions Inc", amount: 890.50, status: "processing", order_date: "2024-03-02", ship_date: null, priority: "medium", sales_rep: "Jane Smith", region: "Europe"},
        {id: 1003, customer: "Global Industries", amount: 2100.75, status: "delivered", order_date: "2024-02-28", ship_date: "2024-03-02", priority: "high", sales_rep: "Bob Johnson", region: "Asia Pacific"},
        {id: 1004, customer: "StartUp LLC", amount: 450.00, status: "cancelled", order_date: "2024-03-01", ship_date: null, priority: "low", sales_rep: "Alice Brown", region: "North America"},
        {id: 1005, customer: "Enterprise Co", amount: 3200.00, status: "processing", order_date: "2024-03-03", ship_date: null, priority: "urgent", sales_rep: "Mike Davis", region: "Europe"},
        {id: 1006, customer: "Small Business", amount: 275.25, status: "shipped", order_date: "2024-02-29", ship_date: "2024-03-01", priority: "medium", sales_rep: "Sarah Wilson", region: "North America"},
        {id: 1007, customer: "Manufacturing Ltd", amount: 1800.60, status: "delivered", order_date: "2024-02-27", ship_date: "2024-03-01", priority: "high", sales_rep: "Tom Anderson", region: "Asia Pacific"},
        {id: 1008, customer: "Retail Chain", amount: 950.00, status: "processing", order_date: "2024-03-03", ship_date: null, priority: "medium", sales_rep: "Lisa Garcia", region: "Europe"}
    ],
    customers: [
        {id: 1, name: "Acme Corporation", contact: "John Smith", email: "john@acme.com", phone: "+1-555-1000", address: "123 Business Ave, New York, NY", industry: "Technology", revenue: 5000000, employees: 250, status: "active"},
        {id: 2, name: "Tech Solutions Inc", contact: "Sarah Johnson", email: "sarah@techsolutions.com", phone: "+1-555-2000", address: "456 Tech Blvd, San Francisco, CA", industry: "Software", revenue: 12000000, employees: 500, status: "active"},
        {id: 3, name: "Global Industries", contact: "Mike Chen", email: "mike@global.com", phone: "+1-555-3000", address: "789 Global St, Chicago, IL", industry: "Manufacturing", revenue: 25000000, employees: 1200, status: "active"},
        {id: 4, name: "StartUp LLC", contact: "Emily Davis", email: "emily@startup.com", phone: "+1-555-4000", address: "321 Innovation Dr, Austin, TX", industry: "Technology", revenue: 500000, employees: 15, status: "prospect"},
        {id: 5, name: "Enterprise Co", contact: "David Wilson", email: "david@enterprise.com", phone: "+1-555-5000", address: "654 Enterprise Way, Boston, MA", industry: "Consulting", revenue: 8000000, employees: 350, status: "active"},
        {id: 6, name: "Small Business", contact: "Lisa Brown", email: "lisa@smallbiz.com", phone: "+1-555-6000", address: "987 Main St, Denver, CO", industry: "Retail", revenue: 750000, employees: 25, status: "active"},
        {id: 7, name: "Manufacturing Ltd", contact: "Robert Taylor", email: "robert@mfg.com", phone: "+1-555-7000", address: "147 Factory Rd, Detroit, MI", industry: "Manufacturing", revenue: 15000000, employees: 800, status: "inactive"}
    ],
    
    // Master-Detail Data Sets
    companies: masterDetailData.companies,
    departments: masterDetailData.departments,
    company_employees: masterDetailData.employees
};

// Default sample data (backward compatibility)
const sampleData = sampleDataSets.products;

// Global grid configurations
let currentBuilderConfig = {};
let eventLogCount = 0;

/**
 * Initialize the Interactive Grid Builder
 */
function initializeBuilderGrid() {
    $("#builderGrid").jqGrid({
        datatype: "local",
        data: sampleData,
        colModel: [
            {name: 'id', index: 'id', width: 60, key: true, hidden: true},
            {name: 'name', index: 'name', width: 150, editable: true, editrules: {required: true}},
            {name: 'price', index: 'price', width: 100, align: 'right', formatter: 'currency', formatoptions: {prefix: '$'}},
            {name: 'stock', index: 'stock', width: 80, align: 'center'},
            {name: 'category', index: 'category', width: 120}
        ],
        pager: "#builderPager",
        rowNum: 25,
        sortname: 'id',
        sortorder: "asc",
        viewrecords: true,
        height: 350,
        autowidth: true,
        caption: "Sample Grid",
        multiselect: true,
        rownumbers: true
    });
}

/**
 * Initialize Inline Editing Grid
 */
function initializeInlineEditGrid() {
    $("#inlineEditGrid").jqGrid({
        datatype: "local",
        data: sampleData,
        colModel: [
            {name: 'id', index: 'id', width: 60, key: true, hidden: true},
            {name: 'name', index: 'name', width: 150, editable: true, editrules: {required: true}},
            {name: 'price', index: 'price', width: 100, align: 'right', editable: true, 
             formatter: 'currency', formatoptions: {prefix: '$'}},
            {name: 'stock', index: 'stock', width: 80, align: 'center', editable: true, editrules: {integer: true, minValue: 0}},
            {name: 'status', index: 'status', width: 100, editable: true, edittype: 'select',
             editoptions: {value: "active:Active;inactive:Inactive;pending:Pending"}},
            {name: 'category', index: 'category', width: 120, editable: true}
        ],
        pager: "#inlineEditPager",
        rowNum: 10,
        sortname: 'id',
        sortorder: "asc",
        viewrecords: true,
        height: 300,
        autowidth: true,
        caption: "Inline Editing Demo",
        onSelectRow: function(id) {
            if (id && id !== lastEditedRow) {
                // Save any previous edits
                if (lastEditedRow) {
                    $("#inlineEditGrid").jqGrid('saveRow', lastEditedRow);
                }
                lastEditedRow = id;
            }
        },
        ondblClickRow: function(id) {
            $("#inlineEditGrid").jqGrid('editRow', id, {
                keys: true,
                oneditfunc: function() {
                    logEvent('Started editing row: ' + id);
                },
                successfunc: function(response) {
                    logEvent('Successfully saved row: ' + id);
                    return true;
                },
                errorfunc: function(id, response) {
                    logEvent('Error saving row: ' + id + ' - ' + response.responseText);
                }
            });
        }
    });
}

let lastEditedRow = null;

/**
 * Initialize Advanced Filter Grid with Expression Context Menu
 */
function initializeAdvancedFilterGrid() {
    // Define search operators for different data types
    const searchOperators = {
        string: [
            {op: "eq", text: "equals"},
            {op: "ne", text: "not equal"},
            {op: "bw", text: "begins with"},
            {op: "bn", text: "does not begin with"},
            {op: "ew", text: "ends with"},
            {op: "en", text: "does not end with"},
            {op: "cn", text: "contains"},
            {op: "nc", text: "does not contain"},
            {op: "nu", text: "is null"},
            {op: "nn", text: "is not null"}
        ],
        number: [
            {op: "eq", text: "equals"},
            {op: "ne", text: "not equal"},
            {op: "lt", text: "less than"},
            {op: "le", text: "less or equal"},
            {op: "gt", text: "greater than"},
            {op: "ge", text: "greater or equal"},
            {op: "nu", text: "is null"},
            {op: "nn", text: "is not null"}
        ],
        select: [
            {op: "eq", text: "equals"},
            {op: "ne", text: "not equal"},
            {op: "nu", text: "is null"},
            {op: "nn", text: "is not null"}
        ]
    };

    $("#advancedFilterGrid").jqGrid({
        datatype: "local",
        data: sampleData,
        colModel: [
            {
                name: 'id', 
                index: 'id', 
                width: 60, 
                key: true, 
                hidden: true
            },
            {
                name: 'name', 
                index: 'name', 
                width: 150,
                searchoptions: {
                    sopt: searchOperators.string.map(op => op.op),
                    clearSearch: true,
                    searchOperMenu: true,
                    searchOperators: true,
                    attr: {title: "Select search operation"}
                }
            },
            {
                name: 'price', 
                index: 'price', 
                width: 100, 
                align: 'right', 
                formatter: 'currency',
                formatoptions: {prefix: '$'},
                searchoptions: {
                    sopt: searchOperators.number.map(op => op.op),
                    clearSearch: true,
                    searchOperMenu: true,
                    attr: {title: "Select search operation"}
                }
            },
            {
                name: 'stock', 
                index: 'stock', 
                width: 80, 
                align: 'center',
                searchoptions: {
                    sopt: searchOperators.number.map(op => op.op),
                    clearSearch: true,
                    searchOperMenu: true
                }
            },
            {
                name: 'status', 
                index: 'status', 
                width: 100,
                stype: 'select',
                searchoptions: {
                    sopt: searchOperators.select.map(op => op.op),
                    value: ":All;active:Active;inactive:Inactive;pending:Pending",
                    clearSearch: true,
                    searchOperMenu: true
                }
            },
            {
                name: 'category', 
                index: 'category', 
                width: 120,
                stype: 'select',
                searchoptions: {
                    sopt: searchOperators.select.map(op => op.op),
                    value: buildCategoryOptions(),
                    clearSearch: true,
                    searchOperMenu: true,
                    defaultValue: ''
                }
            },
            {
                name: 'progress', 
                index: 'progress', 
                width: 100, 
                align: 'center',
                searchoptions: {
                    sopt: searchOperators.number.map(op => op.op),
                    clearSearch: true,
                    searchOperMenu: true,
                    attr: {
                        min: 0,
                        max: 100,
                        title: "Enter progress percentage"
                    }
                }
            }
        ],
        pager: "#advancedFilterPager",
        rowNum: 10,
        sortname: 'id',
        sortorder: "asc",
        viewrecords: true,
        height: 350,
        autowidth: true,
        caption: "Advanced Column Filters with Expression Menu",
        // Enable advanced search features
        search: true,
        searchOnEnter: false,
        // Custom search operator labels
        customSortOperations: {
            eq: {operand: "=", text: "equal"},
            ne: {operand: "!=", text: "not equal"},
            lt: {operand: "<", text: "less"},
            le: {operand: "<=", text: "less or equal"},
            gt: {operand: ">", text: "greater"},
            ge: {operand: ">=", text: "greater or equal"},
            bw: {operand: "^", text: "begins with"},
            bn: {operand: "!^", text: "does not begin with"},
            ew: {operand: "$", text: "ends with"},
            en: {operand: "!$", text: "does not end with"},
            cn: {operand: "*", text: "contains"},
            nc: {operand: "!*", text: "does not contain"},
            nu: {operand: "#", text: "is null"},
            nn: {operand: "!#", text: "is not null"}
        }
    });

    // Initialize filter toolbar with advanced options
    $("#advancedFilterGrid").jqGrid('filterToolbar', {
        searchOnEnter: false,
        searchOperators: true,
        defaultSearch: "cn",
        beforeSearch: function() {
            logEvent("Filter search initiated");
            return true;
        },
        afterSearch: function() {
            const filters = $("#advancedFilterGrid").jqGrid('getGridParam', 'postData').filters;
            if (filters) {
                logEvent("Active filters: " + filters);
            }
        }
    });

    // Add custom filter menu styling and behavior
    setupAdvancedFilterMenu();
}

/**
 * Setup advanced filter menu with enhanced UI
 */
function setupAdvancedFilterMenu() {
    // Custom CSS for filter menu
    const filterMenuStyle = `
        <style>
        .ui-search-menu {
            position: absolute;
            background: white;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            z-index: 1000;
            min-width: 180px;
        }
        .ui-search-menu .ui-menu-item {
            padding: 8px 12px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .ui-search-menu .ui-menu-item:hover {
            background-color: #f5f5f5;
        }
        .ui-search-menu .ui-menu-item.ui-state-active {
            background-color: #007bff;
            color: white;
        }
        .soptclass {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 3px;
            padding: 2px 6px;
            margin-left: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s;
        }
        .soptclass:hover {
            background-color: #007bff;
            color: white;
            border-color: #007bff;
        }
        .clearsearchclass {
            cursor: pointer;
            color: #dc3545;
            margin-left: 4px;
            font-size: 14px;
        }
        .clearsearchclass:hover {
            color: #c82333;
        }
        </style>
    `;
    
    if (!$("#advancedFilterStyle").length) {
        $("head").append(filterMenuStyle.replace('<style>', '<style id="advancedFilterStyle">'));
    }
}

/**
 * Build category options for select filter
 */
function buildCategoryOptions() {
    const categories = [...new Set(sampleData.map(item => item.category))];
    let options = ":All";
    categories.forEach(cat => {
        options += `;${cat}:${cat}`;
    });
    return options;
}

/**
 * Add custom search operation
 */
function addCustomSearchOperation(gridId, colName, operation, value) {
    const grid = $("#" + gridId);
    const postData = grid.jqGrid('getGridParam', 'postData');
    
    // Create or update filters
    let filters = postData.filters ? JSON.parse(postData.filters) : {groupOp: "AND", rules: []};
    
    // Remove existing rule for this column
    filters.rules = filters.rules.filter(rule => rule.field !== colName);
    
    // Add new rule if value is provided
    if (value !== "") {
        filters.rules.push({
            field: colName,
            op: operation,
            data: value
        });
    }
    
    // Update grid filters
    postData.filters = JSON.stringify(filters);
    if (grid.length > 0 && grid[0].grid) {
        grid.jqGrid('setGridParam', {search: filters.rules.length > 0}).trigger('reloadGrid');
    }
    
    logEvent(`Filter applied: ${colName} ${operation} ${value}`);
}

/**
 * Clear all filters
 */
function clearAllFilters(gridId) {
    const grid = $("#" + gridId);
    
    // Clear filter toolbar
    grid[0].clearToolbar();
    
    // Clear postData filters
    const postData = grid.jqGrid('getGridParam', 'postData');
    delete postData.filters;
    
    // Reset search and reload
    if (grid.length > 0 && grid[0].grid) {
        grid.jqGrid('setGridParam', {search: false}).trigger('reloadGrid');
    }
    
    logEvent("All filters cleared");
}

/**
 * Export current filter state
 */
function exportFilterState(gridId) {
    const grid = $("#" + gridId);
    const postData = grid.jqGrid('getGridParam', 'postData');
    
    if (postData.filters) {
        const filters = JSON.parse(postData.filters);
        const filterExport = {
            timestamp: new Date().toISOString(),
            gridId: gridId,
            filters: filters
        };
        
        downloadFile(JSON.stringify(filterExport, null, 2), 'filter-state.json', 'application/json');
        logEvent("Filter state exported");
    } else {
        logEvent("No filters to export");
    }
}

/**
 * Initialize Custom Formatters Grid
 */
function initializeFormatterGrid() {
    // Custom formatter functions
    $.extend($.fn.fmatter, {
        progressBar: function(cellvalue, options, rowdata) {
            const percentage = parseInt(cellvalue) || 0;
            const color = percentage > 80 ? 'success' : percentage > 50 ? 'warning' : 'danger';
            return `<div class="progress" style="height: 20px;">
                        <div class="progress-bar bg-${color}" role="progressbar" 
                             style="width: ${percentage}%" aria-valuenow="${percentage}" 
                             aria-valuemin="0" aria-valuemax="100">${percentage}%</div>
                    </div>`;
        },
        
        statusIndicator: function(cellvalue, options, rowdata) {
            const statusClass = cellvalue === 'active' ? 'status-active' : 
                               cellvalue === 'inactive' ? 'status-inactive' : 'status-pending';
            return `<span class="status-indicator ${statusClass}"></span>${cellvalue.charAt(0).toUpperCase() + cellvalue.slice(1)}`;
        },
        
        actionButtons: function(cellvalue, options, rowdata) {
            const id = rowdata.id;
            return `<div class="btn-group btn-group-sm" role="group">
                        <button class="btn btn-outline-primary btn-sm" onclick="editRow(${id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteRow(${id})">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="btn btn-outline-info btn-sm" onclick="viewRow(${id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>`;
        }
    });

    $("#formatterGrid").jqGrid({
        datatype: "local",
        data: sampleData,
        colModel: [
            {name: 'id', index: 'id', width: 60, key: true, hidden: true},
            {name: 'name', index: 'name', width: 150},
            {name: 'price', index: 'price', width: 100, align: 'right', formatter: 'currency', formatoptions: {prefix: '$'}},
            {name: 'stock', index: 'stock', width: 80, align: 'center'},
            {name: 'progress', index: 'progress', width: 150, align: 'center', formatter: 'progressBar'},
            {name: 'status', index: 'status', width: 120, formatter: 'statusIndicator'},
            {name: 'actions', index: 'actions', width: 120, align: 'center', sortable: false, formatter: 'actionButtons'}
        ],
        pager: "#formatterPager",
        rowNum: 10,
        sortname: 'id',
        sortorder: "asc",
        viewrecords: true,
        height: 300,
        autowidth: true,
        caption: "Custom Formatters Demo"
    });
}

/**
 * Initialize Dynamic Configuration Grid
 */
function initializeDynamicGrid() {
    $("#dynamicGrid").jqGrid({
        datatype: "local",
        data: sampleData,
        colModel: [
            {name: 'id', index: 'id', width: 60, key: true, hidden: true},
            {name: 'name', index: 'name', width: 150},
            {name: 'price', index: 'price', width: 100, align: 'right', formatter: 'currency', formatoptions: {prefix: '$'}},
            {name: 'stock', index: 'stock', width: 80, align: 'center'},
            {name: 'category', index: 'category', width: 120},
            {name: 'status', index: 'status', width: 100}
        ],
        pager: "#dynamicPager",
        rowNum: 10,
        sortname: 'id',
        sortorder: "asc",
        viewrecords: true,
        height: 300,
        autowidth: true,
        caption: "Dynamic Configuration Demo",
        grouping: false,
        groupingView: {
            groupField: ['category'],
            groupColumnShow: [true],
            groupText: ['<b>{0} - {1} Item(s)</b>'],
            groupCollapse: false,
            groupOrder: ['asc']
        }
    });
}

/**
 * Initialize Event Handling Grid
 */
function initializeEventGrid() {
    $("#eventGrid").jqGrid({
        datatype: "local",
        data: sampleData,
        colModel: [
            {name: 'id', index: 'id', width: 60, key: true, hidden: true},
            {name: 'name', index: 'name', width: 150},
            {name: 'price', index: 'price', width: 100, align: 'right', formatter: 'currency', formatoptions: {prefix: '$'}},
            {name: 'stock', index: 'stock', width: 80, align: 'center'},
            {name: 'category', index: 'category', width: 120}
        ],
        pager: "#eventPager",
        rowNum: 10,
        sortname: 'id',
        sortorder: "asc",
        viewrecords: true,
        height: 300,
        autowidth: true,
        caption: "Event Handling Demo",
        
        // Event handlers
        onSelectRow: function(id) {
            logEvent(`Row selected: ID ${id}`);
        },
        onSortCol: function(index, colIndex, sortorder) {
            logEvent(`Column sorted: ${index} (${sortorder})`);
        },
        onPaging: function(pgButton) {
            logEvent(`Paging: ${pgButton}`);
        },
        loadComplete: function() {
            logEvent('Grid load completed');
        },
        onRightClickRow: function(id, iRow, iCol, e) {
            logEvent(`Right click on row: ID ${id}, Row ${iRow}, Col ${iCol}`);
        },
        onCellSelect: function(rowid, iCol, cellcontent, e) {
            logEvent(`Cell selected: Row ${rowid}, Col ${iCol}, Content: ${cellcontent}`);
        },
        ondblClickRow: function(id) {
            logEvent(`Double click on row: ID ${id}`);
        }
    });
}



/**
 * Change Sample Data Set
 */
function changeSampleData() {
    const selectedDataSet = $('#sampleDataSet').val();
    const currentData = sampleDataSets[selectedDataSet];
    
    // Check if grid exists
    const gridElement = $("#builderGrid");
    if (!gridElement.length || !gridElement[0].grid) {
        console.warn("Builder grid not initialized yet");
        return;
    }
    
    // Update grid data
    gridElement.jqGrid('clearGridData');
    
    // Add new data
    for (let i = 0; i < currentData.length; i++) {
        gridElement.jqGrid('addRowData', i + 1, currentData[i]);
    }
    
    // Update column model based on data type
    updateColumnsForDataSet(selectedDataSet);
    
    // Refresh the grid
    gridElement.trigger('reloadGrid');
    
    // Update generated code
    updateGeneratedCode();
}

/**
 * Update columns based on selected data set
 */
function updateColumnsForDataSet(dataSet) {
    const gridElement = $("#builderGrid");
    let colModel = [];
    
    switch (dataSet) {
        case 'products':
            colModel = [
                {name: 'id', index: 'id', width: 60, key: true, hidden: true},
                {name: 'name', index: 'name', width: 200, editable: true},
                {name: 'price', index: 'price', width: 100, align: 'right', formatter: 'currency', formatoptions: {prefix: '$'}},
                {name: 'stock', index: 'stock', width: 80, align: 'center'},
                {name: 'category', index: 'category', width: 120},
                {name: 'brand', index: 'brand', width: 120},
                {name: 'rating', index: 'rating', width: 80, align: 'center', formatter: 'number', formatoptions: {decimalPlaces: 1}},
                {name: 'status', index: 'status', width: 100, align: 'center'}
            ];
            break;
        case 'employees':
            colModel = [
                {name: 'id', index: 'id', width: 60, key: true, hidden: true},
                {name: 'name', index: 'name', width: 150, editable: true},
                {name: 'position', index: 'position', width: 150},
                {name: 'department', index: 'department', width: 120},
                {name: 'salary', index: 'salary', width: 100, align: 'right', formatter: 'currency', formatoptions: {prefix: '$'}},
                {name: 'hire_date', index: 'hire_date', width: 100, formatter: 'date', formatoptions: {srcformat: 'Y-m-d', newformat: 'm/d/Y'}},
                {name: 'status', index: 'status', width: 100, align: 'center'},
                {name: 'experience', index: 'experience', width: 80, align: 'center', formatter: function(cellvalue) { return cellvalue + ' yrs'; }}
            ];
            break;
        case 'orders':
            colModel = [
                {name: 'id', index: 'id', width: 80, key: true},
                {name: 'customer', index: 'customer', width: 150},
                {name: 'amount', index: 'amount', width: 100, align: 'right', formatter: 'currency', formatoptions: {prefix: '$'}},
                {name: 'status', index: 'status', width: 100, align: 'center'},
                {name: 'order_date', index: 'order_date', width: 100, formatter: 'date', formatoptions: {srcformat: 'Y-m-d', newformat: 'm/d/Y'}},
                {name: 'priority', index: 'priority', width: 80, align: 'center'},
                {name: 'sales_rep', index: 'sales_rep', width: 120},
                {name: 'region', index: 'region', width: 120}
            ];
            break;
        case 'customers':
            colModel = [
                {name: 'id', index: 'id', width: 60, key: true, hidden: true},
                {name: 'name', index: 'name', width: 180, editable: true},
                {name: 'contact', index: 'contact', width: 120},
                {name: 'industry', index: 'industry', width: 120},
                {name: 'revenue', index: 'revenue', width: 120, align: 'right', formatter: 'currency', formatoptions: {prefix: '$'}},
                {name: 'employees', index: 'employees', width: 80, align: 'center', formatter: 'integer'},
                {name: 'status', index: 'status', width: 100, align: 'center'}
            ];
            break;
        case 'companies':
            colModel = [
                {name: 'id', index: 'id', width: 60, key: true, hidden: true},
                {name: 'name', index: 'name', width: 180, editable: true},
                {name: 'industry', index: 'industry', width: 120},
                {name: 'founded', index: 'founded', width: 80, align: 'center'},
                {name: 'headquarters', index: 'headquarters', width: 150},
                {name: 'revenue', index: 'revenue', width: 120, align: 'right', formatter: 'currency', formatoptions: {prefix: '$'}},
                {name: 'employees', index: 'employees', width: 80, align: 'center', formatter: 'integer'},
                {name: 'status', index: 'status', width: 100, align: 'center'}
            ];
            break;
        case 'departments':
            colModel = [
                {name: 'id', index: 'id', width: 60, key: true, hidden: true},
                {name: 'company_id', index: 'company_id', width: 80, align: 'center', hidden: true},
                {name: 'name', index: 'name', width: 150, editable: true},
                {name: 'manager', index: 'manager', width: 140},
                {name: 'budget', index: 'budget', width: 120, align: 'right', formatter: 'currency', formatoptions: {prefix: '$'}},
                {name: 'employees', index: 'employees', width: 80, align: 'center', formatter: 'integer'},
                {name: 'location', index: 'location', width: 130}
            ];
            break;
        case 'company_employees':
            colModel = [
                {name: 'id', index: 'id', width: 60, key: true, hidden: true},
                {name: 'department_id', index: 'department_id', width: 80, align: 'center', hidden: true},
                {name: 'name', index: 'name', width: 150, editable: true},
                {name: 'position', index: 'position', width: 160},
                {name: 'salary', index: 'salary', width: 100, align: 'right', formatter: 'currency', formatoptions: {prefix: '$'}},
                {name: 'hire_date', index: 'hire_date', width: 100, formatter: 'date', formatoptions: {srcformat: 'Y-m-d', newformat: 'm/d/Y'}},
                {name: 'email', index: 'email', width: 180},
                {name: 'phone', index: 'phone', width: 120}
            ];
            break;
    }
    
    // Recreate the grid with new column model
    gridElement.jqGrid('GridUnload');
    
    // Base grid configuration
    const gridConfig = {
        datatype: "local",
        data: sampleDataSets[dataSet],
        colModel: colModel,
        pager: "#builderPager",
        rowNum: 25,
        sortname: 'id',
        sortorder: "asc",
        viewrecords: true,
        height: 350,
        autowidth: true,
        caption: "Sample Grid - " + dataSet.charAt(0).toUpperCase() + dataSet.slice(1),
        multiselect: true,
        rownumbers: true
    };
    
    // Add SubGrid configuration if enabled
    if ($('#enableSubGrid').is(':checked') && (dataSet === 'companies' || dataSet === 'departments')) {
        gridConfig.subGrid = true;
        gridConfig.subGridRowExpanded = function(subgrid_id, row_id) {
            showSubGrid(subgrid_id, row_id, dataSet);
        };
    }
    
    gridElement.jqGrid(gridConfig);
}

/**
 * Toggle SubGrid functionality
 */
function toggleSubGrid() {
    const selectedDataSet = $('#sampleDataSet').val();
    updateColumnsForDataSet(selectedDataSet);
}

/**
 * Show SubGrid for master-detail relationships
 */
function showSubGrid(subgrid_id, row_id, parentDataSet) {
    const subgrid_table_id = subgrid_id + "_t";
    const subgrid_pager_id = subgrid_id + "_p";
    
    // Create sub-grid HTML
    $("#" + subgrid_id).html(`
        <table id="${subgrid_table_id}"></table>
        <div id="${subgrid_pager_id}"></div>
    `);
    
    let subGridData = [];
    let subGridColModel = [];
    let subGridCaption = "";
    
    if (parentDataSet === 'companies') {
        // Show departments for the selected company
        subGridData = masterDetailData.departments.filter(dept => dept.company_id == row_id);
        subGridColModel = [
            {name: 'id', index: 'id', width: 60, key: true, hidden: true},
            {name: 'name', index: 'name', width: 150},
            {name: 'manager', index: 'manager', width: 140},
            {name: 'budget', index: 'budget', width: 120, align: 'right', formatter: 'currency', formatoptions: {prefix: '$'}},
            {name: 'employees', index: 'employees', width: 80, align: 'center', formatter: 'integer'},
            {name: 'location', index: 'location', width: 130}
        ];
        subGridCaption = "Company Departments";
    } else if (parentDataSet === 'departments') {
        // Show employees for the selected department
        subGridData = masterDetailData.employees.filter(emp => emp.department_id == row_id);
        subGridColModel = [
            {name: 'id', index: 'id', width: 60, key: true, hidden: true},
            {name: 'name', index: 'name', width: 150},
            {name: 'position', index: 'position', width: 160},
            {name: 'salary', index: 'salary', width: 100, align: 'right', formatter: 'currency', formatoptions: {prefix: '$'}},
            {name: 'hire_date', index: 'hire_date', width: 100, formatter: 'date', formatoptions: {srcformat: 'Y-m-d', newformat: 'm/d/Y'}},
            {name: 'email', index: 'email', width: 180}
        ];
        subGridCaption = "Department Employees";
    }
    
    // Initialize sub-grid
    $("#" + subgrid_table_id).jqGrid({
        datatype: "local",
        data: subGridData,
        colModel: subGridColModel,
        pager: "#" + subgrid_pager_id,
        rowNum: 10,
        sortname: 'id',
        sortorder: "asc",
        viewrecords: true,
        height: 200,
        autowidth: true,
        caption: subGridCaption,
        // Add nested subgrid for departments -> employees
        subGrid: parentDataSet === 'companies',
        subGridRowExpanded: parentDataSet === 'companies' ? function(subgrid_id2, row_id2) {
            showSubGrid(subgrid_id2, row_id2, 'departments');
        } : undefined
    });
    
    // Add navigation if there are records
    if (subGridData.length > 0) {
        $("#" + subgrid_table_id).jqGrid('navGrid', "#" + subgrid_pager_id, {
            edit: false, add: false, del: false, search: false, refresh: false
        });
    }
}

/**
 * Update Grid Configuration (for Grid Builder)
 */
function updateGridConfig() {
    // Collect all configuration values
    const config = collectGridConfig();
    
    // Apply theme first
    const selectedTheme = $('#gridTheme').val();
    applyThemeToGrid(selectedTheme);
    
    // Show/hide custom theme options
    if (selectedTheme === 'custom') {
        $('#customThemeOptions').show();
    } else {
        $('#customThemeOptions').hide();
    }
    
    // Check if grid exists before updating
    const gridElement = $("#builderGrid");
    if (!gridElement.length || !gridElement[0].grid) {
        // Grid doesn't exist yet, skip update
        console.warn("Builder grid not initialized yet");
        return;
    }
    
    // Update visual styling
    updateGridStyling(config);
    
    // Update grid parameters
    gridElement.jqGrid('setCaption', config.caption);
    gridElement.jqGrid('setGridParam', {
        rowNum: config.rowNum,
        height: config.height,
        multiselect: config.multiselect,
        rownumbers: config.rownumbers,
        viewrecords: config.viewrecords,
        autowidth: config.autowidth,
        shrinkToFit: config.shrinkToFit,
        sortname: config.sortname,
        sortorder: config.sortorder,
        loadtext: config.loadtext,
        emptyrecords: config.emptyrecords
    });
    
    // Handle conditional features
    if (config.datatype !== 'local') {
        gridElement.jqGrid('setGridParam', {
            datatype: config.datatype,
            url: config.url
        });
    }
    
    // Handle grouping
    if (config.grouping && config.groupField) {
        gridElement.jqGrid('groupingGroupBy', config.groupField, {
            groupColumnShow: [true],
            groupText: ['<b>{0} - {1} Item(s)</b>'],
            groupCollapse: false,
            groupOrder: ['asc']
        });
    } else {
        gridElement.jqGrid('groupingRemove');
    }
    
    // Handle filter toolbar
    if (config.filterToolbar) {
        gridElement.jqGrid('filterToolbar', {searchOnEnter: config.searchOnEnter});
    } else {
        gridElement[0].clearToolbar = function() {
            // Clear any existing toolbar
        };
    }
    
    // Update UI based on configuration changes
    updateUIState(config);
    
    // Generate code preview (this will rebuild the grid with new columns)
    generateCode();
    
    // Note: Grid reload is not needed here since generateCode rebuilds the grid
}

/**
 * Collect all grid configuration values
 */
function collectGridConfig() {
    return {
        // Basic settings
        caption: $("#gridTitle").val(),
        width: $("#gridWidth").val(),
        height: parseInt($("#gridHeight").val()),
        
        // Pagination
        pager: $("#enablePager").is(':checked'),
        rowNum: parseInt($("#rowNum").val()),
        rowList: $("#rowList").val().split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n)),
        
        // Features
        multiselect: $("#multiselect").is(':checked'),
        rownumbers: $("#rownumbers").is(':checked'),
        viewrecords: $("#viewrecords").is(':checked'),
        autowidth: $("#autowidth").is(':checked'),
        shrinkToFit: $("#shrinkToFit").is(':checked'),
        resizable: $("#resizable").is(':checked'),
        sortable: $("#sortable").is(':checked'),
        toolbar: $("#toolbar").is(':checked'),
        
        // Appearance
        theme: $("#gridTheme").val(),
        captionClass: $("#captionClass").val(),
        headerColor: $("#headerColor").val(),
        rowColor: $("#rowColor").val(),
        altRowColor: $("#altRowColor").val(),
        borderColor: $("#borderColor").val(),
        fontSize: $("#fontSize").val(),
        fontFamily: $("#fontFamily").val(),
        hoverRows: $("#hoverRows").is(':checked'),
        altRows: $("#altRows").is(':checked'),
        
        // Data
        datatype: $("#datatype").val(),
        url: $("#dataUrl").val(),
        sortname: $("#sortname").val(),
        sortorder: $("#sortorder").val(),
        multiSort: $("#multiSort").is(':checked'),
        loadtext: $("#loadtext").val(),
        loadonce: $("#loadonce").is(':checked'),
        loadui: $("#loadui").is(':checked'),
        emptyrecords: $("#emptyrecords").val(),
        
        // Advanced
        inlineEdit: $("#inlineEdit").is(':checked'),
        cellEdit: $("#cellEdit").is(':checked'),
        formEdit: $("#formEdit").is(':checked'),
        grouping: $("#grouping").is(':checked'),
        groupField: $("#groupField").val(),
        search: $("#search").is(':checked'),
        filterToolbar: $("#filterToolbar").is(':checked'),
        searchOnEnter: $("#searchOnEnter").is(':checked'),
        remapColumns: $("#remapColumns").is(':checked'),
        hidegrid: $("#hidegrid").is(':checked'),
        scrollTimeout: parseInt($("#scrollTimeout").val()),
        scroll: $("#scroll").is(':checked')
    };
}

/**
 * Update grid visual styling
 */
function updateGridStyling(config) {
    const grid = $("#builderGrid");
    const gridContainer = grid.closest('.ui-jqgrid');
    
    // Apply theme class
    gridContainer.removeClass('ui-lightness ui-darkness bootstrap custom')
                .addClass(config.theme);
    
    // Apply custom colors
    const customCSS = `
        .ui-jqgrid-titlebar { 
            background-color: ${config.headerColor} !important; 
            font-size: ${config.fontSize} !important;
            font-family: ${config.fontFamily} !important;
        }
        .ui-jqgrid-bdiv tr.jqgrow td { 
            background-color: ${config.rowColor} !important;
            font-size: ${config.fontSize} !important;
            font-family: ${config.fontFamily} !important;
            border-color: ${config.borderColor} !important;
        }
        .ui-jqgrid-bdiv tr.jqgrow:nth-child(even) td { 
            background-color: ${config.altRows ? config.altRowColor : config.rowColor} !important; 
        }
        .ui-jqgrid-bdiv tr.jqgrow:hover td { 
            background-color: ${config.hoverRows ? 'rgba(0,0,0,0.05)' : 'inherit'} !important; 
        }
    `;
    
    // Remove existing custom styles and add new ones
    $('#grid-custom-styles').remove();
    $('<style id="grid-custom-styles">' + customCSS + '</style>').appendTo('head');
    
    // Apply caption class
    if (config.captionClass) {
        gridContainer.find('.ui-jqgrid-titlebar').addClass(config.captionClass);
    }
}

/**
 * Update UI state based on configuration
 */
function updateUIState(config) {
    // Show/hide URL container based on datatype
    if (config.datatype === 'json' || config.datatype === 'xml') {
        $("#urlContainer").show();
    } else {
        $("#urlContainer").hide();
    }
    
    // Show/hide grouping options
    if (config.grouping) {
        $("#groupingOptions").show();
    } else {
        $("#groupingOptions").hide();
    }
    
    // Update column configuration based on features
    updateColumnConfigUI(config);
}

/**
 * Advanced Column Configuration Management
 */

let columnIdCounter = 1;

/**
 * Add new column to configuration
 */
function addColumn() {
    const columnId = 'col_' + columnIdCounter++;
    const columnHtml = createColumnConfigHTML(columnId, {
        name: 'new_column',
        label: 'New Column',
        type: 'text',
        width: 120,
        sortable: true,
        editable: false,
        hidden: false,
        align: 'left',
        formatter: 'none'
    });
    $("#columnConfig").append(columnHtml);
    updateGridConfig();
}

/**
 * Create column configuration HTML
 */
function createColumnConfigHTML(columnId, columnData) {
    return `
        <div class="column-item mb-3 p-3 border rounded" data-column-id="${columnId}">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0">${columnData.label}</h6>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-secondary" onclick="moveColumnUp(this)" title="Move Up">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                    <button class="btn btn-outline-secondary" onclick="moveColumnDown(this)" title="Move Down">
                        <i class="fas fa-arrow-down"></i>
                    </button>
                    <button class="btn btn-outline-info" onclick="toggleColumnDetails(this)" title="Details">
                        <i class="fas fa-cog"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="removeColumn(this)" title="Remove">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <!-- Basic Column Settings -->
            <div class="row mb-2">
                <div class="col-6">
                    <label class="form-label">Name/ID</label>
                    <input type="text" class="form-control form-control-sm column-name" value="${columnData.name}" onchange="updateColumnLabel(this); updateGridConfig();">
                </div>
                <div class="col-6">
                    <label class="form-label">Display Label</label>
                    <input type="text" class="form-control form-control-sm column-label" value="${columnData.label}" onchange="updateColumnLabel(this); updateGridConfig();">
                </div>
            </div>
            
            <div class="row mb-2">
                <div class="col-4">
                    <label class="form-label">Type</label>
                    <select class="form-select form-select-sm column-type" onchange="updateColumnType(this); updateGridConfig();">
                        <option value="text" ${columnData.type === 'text' ? 'selected' : ''}>Text</option>
                        <option value="number" ${columnData.type === 'number' ? 'selected' : ''}>Number</option>
                        <option value="currency" ${columnData.type === 'currency' ? 'selected' : ''}>Currency</option>
                        <option value="date" ${columnData.type === 'date' ? 'selected' : ''}>Date</option>
                        <option value="select" ${columnData.type === 'select' ? 'selected' : ''}>Select</option>
                        <option value="checkbox" ${columnData.type === 'checkbox' ? 'selected' : ''}>Checkbox</option>
                        <option value="email" ${columnData.type === 'email' ? 'selected' : ''}>Email</option>
                        <option value="url" ${columnData.type === 'url' ? 'selected' : ''}>URL</option>
                        <option value="custom" ${columnData.type === 'custom' ? 'selected' : ''}>Custom</option>
                    </select>
                </div>
                <div class="col-4">
                    <label class="form-label">Width</label>
                    <input type="number" class="form-control form-control-sm column-width" value="${columnData.width}" min="50" max="500" onchange="updateGridConfig();">
                </div>
                <div class="col-4">
                    <label class="form-label">Align</label>
                    <select class="form-select form-select-sm column-align" onchange="updateGridConfig();">
                        <option value="left" ${columnData.align === 'left' ? 'selected' : ''}>Left</option>
                        <option value="center" ${columnData.align === 'center' ? 'selected' : ''}>Center</option>
                        <option value="right" ${columnData.align === 'right' ? 'selected' : ''}>Right</option>
                    </select>
                </div>
            </div>
            
            <!-- Column Options -->
            <div class="row mb-2">
                <div class="col-3">
                    <div class="form-check">
                        <input class="form-check-input column-sortable" type="checkbox" ${columnData.sortable ? 'checked' : ''} onchange="updateGridConfig();">
                        <label class="form-check-label">Sortable</label>
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-check">
                        <input class="form-check-input column-editable" type="checkbox" ${columnData.editable ? 'checked' : ''} onchange="updateGridConfig();">
                        <label class="form-check-label">Editable</label>
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-check">
                        <input class="form-check-input column-hidden" type="checkbox" ${columnData.hidden ? 'checked' : ''} onchange="updateGridConfig();">
                        <label class="form-check-label">Hidden</label>
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-check">
                        <input class="form-check-input column-key" type="checkbox" onchange="updateGridConfig();">
                        <label class="form-check-label">Key</label>
                    </div>
                </div>
            </div>
            
            <!-- Advanced Column Settings (Initially Hidden) -->
            <div class="column-details" style="display: none;">
                <hr>
                <h6>Advanced Settings</h6>
                
                <div class="row mb-2">
                    <div class="col-6">
                        <label class="form-label">Formatter</label>
                        <select class="form-select form-select-sm column-formatter" onchange="updateFormatterOptions(this); updateGridConfig();">
                            <option value="">None</option>
                            <option value="integer">Integer</option>
                            <option value="number">Number</option>
                            <option value="currency">Currency</option>
                            <option value="date">Date</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="select">Select</option>
                            <option value="email">Email</option>
                            <option value="showlink">Show Link</option>
                            <option value="actions">Actions</option>
                            <option value="custom">Custom Function</option>
                        </select>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Search Type</label>
                        <select class="form-select form-select-sm column-searchtype" onchange="updateGridConfig();">
                            <option value="text">Text</option>
                            <option value="select">Select</option>
                            <option value="datepicker">Date Picker</option>
                            <option value="range">Range</option>
                        </select>
                    </div>
                </div>
                
                <!-- Edit Options -->
                <div class="mb-2">
                    <label class="form-label">Edit Type</label>
                    <select class="form-select form-select-sm column-edittype" onchange="updateEditOptions(this); updateGridConfig();">
                        <option value="text">Text</option>
                        <option value="textarea">Textarea</option>
                        <option value="select">Select</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="password">Password</option>
                        <option value="file">File</option>
                        <option value="image">Image</option>
                        <option value="datepicker">Date Picker</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                
                <!-- Select Options (for select edit type) -->
                <div class="mb-2 edit-select-options" style="display: none;">
                    <label class="form-label">Select Options (value:label;value2:label2)</label>
                    <input type="text" class="form-control form-control-sm column-select-options" placeholder="1:Option 1;2:Option 2" onchange="updateGridConfig();">
                </div>
                
                <!-- Validation Rules -->
                <div class="mb-2">
                    <label class="form-label">Validation Rules</label>
                    <div class="row">
                        <div class="col-6">
                            <div class="form-check">
                                <input class="form-check-input column-required" type="checkbox" onchange="updateGridConfig();">
                                <label class="form-check-label">Required</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input column-number" type="checkbox" onchange="updateGridConfig();">
                                <label class="form-check-label">Number</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input column-email-validation" type="checkbox" onchange="updateGridConfig();">
                                <label class="form-check-label">Email</label>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-check">
                                <input class="form-check-input column-integer" type="checkbox" onchange="updateGridConfig();">
                                <label class="form-check-label">Integer</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input column-date-validation" type="checkbox" onchange="updateGridConfig();">
                                <label class="form-check-label">Date</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input column-url-validation" type="checkbox" onchange="updateGridConfig();">
                                <label class="form-check-label">URL</label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Min/Max Values -->
                <div class="row mb-2">
                    <div class="col-6">
                        <label class="form-label">Min Value/Length</label>
                        <input type="number" class="form-control form-control-sm column-min" onchange="updateGridConfig();">
                    </div>
                    <div class="col-6">
                        <label class="form-label">Max Value/Length</label>
                        <input type="number" class="form-control form-control-sm column-max" onchange="updateGridConfig();">
                    </div>
                </div>
                
                <!-- CSS Classes -->
                <div class="row mb-2">
                    <div class="col-6">
                        <label class="form-label">CSS Classes</label>
                        <input type="text" class="form-control form-control-sm column-classes" placeholder="custom-class" onchange="updateGridConfig();">
                    </div>
                    <div class="col-6">
                        <label class="form-label">Title/Tooltip</label>
                        <input type="text" class="form-control form-control-sm column-title" placeholder="Column tooltip" onchange="updateGridConfig();">
                    </div>
                </div>
                
                <!-- SearchOptions Configuration -->
                <hr>
                <h6><i class="fas fa-search"></i> Search Options</h6>
                
                <div class="row mb-2">
                    <div class="col-6">
                        <div class="form-check">
                            <input class="form-check-input enable-search" type="checkbox" onchange="toggleSearchOptions(this); updateGridConfig();">
                            <label class="form-check-label">Enable Search</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-check">
                            <input class="form-check-input search-operators-menu" type="checkbox" onchange="updateGridConfig();">
                            <label class="form-check-label">Operator Menu</label>
                        </div>
                    </div>
                </div>
                
                <div class="search-options-container" style="display: none;">
                    <!-- Search Operations -->
                    <div class="mb-2">
                        <label class="form-label">Available Search Operations</label>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-check">
                                    <input class="form-check-input sopt-eq" type="checkbox" checked onchange="updateGridConfig();">
                                    <label class="form-check-label">Equals (eq)</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input sopt-ne" type="checkbox" onchange="updateGridConfig();">
                                    <label class="form-check-label">Not Equal (ne)</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input sopt-cn" type="checkbox" checked onchange="updateGridConfig();">
                                    <label class="form-check-label">Contains (cn)</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input sopt-nc" type="checkbox" onchange="updateGridConfig();">
                                    <label class="form-check-label">Not Contains (nc)</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check">
                                    <input class="form-check-input sopt-bw" type="checkbox" onchange="updateGridConfig();">
                                    <label class="form-check-label">Begins With (bw)</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input sopt-ew" type="checkbox" onchange="updateGridConfig();">
                                    <label class="form-check-label">Ends With (ew)</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input sopt-lt" type="checkbox" onchange="updateGridConfig();">
                                    <label class="form-check-label">Less Than (lt)</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input sopt-gt" type="checkbox" onchange="updateGridConfig();">
                                    <label class="form-check-label">Greater Than (gt)</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Search Options -->
                    <div class="row mb-2">
                        <div class="col-6">
                            <label class="form-label">Default Value</label>
                            <input type="text" class="form-control form-control-sm search-default-value" placeholder="Default search value" onchange="updateGridConfig();">
                        </div>
                        <div class="col-6">
                            <label class="form-label">Placeholder Text</label>
                            <input type="text" class="form-control form-control-sm search-placeholder" placeholder="Enter search text..." onchange="updateGridConfig();">
                        </div>
                    </div>
                    
                    <div class="row mb-2">
                        <div class="col-6">
                            <div class="form-check">
                                <input class="form-check-input search-clear" type="checkbox" checked onchange="updateGridConfig();">
                                <label class="form-check-label">Clear Search Button</label>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-check">
                                <input class="form-check-input search-hidden" type="checkbox" onchange="updateGridConfig();">
                                <label class="form-check-label">Search Hidden Column</label>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Select-specific options -->
                    <div class="search-select-options" style="display: none;">
                        <div class="mb-2">
                            <label class="form-label">Select Options (value:label;value2:label2)</label>
                            <textarea class="form-control form-control-sm search-select-values" rows="2" placeholder=":All;value1:Label 1;value2:Label 2" onchange="updateGridConfig()"></textarea>
                        </div>
                        <div class="row mb-2">
                            <div class="col-6">
                                <div class="form-check">
                                    <input class="form-check-input search-multiple" type="checkbox" onchange="updateGridConfig();">
                                    <label class="form-check-label">Multiple Selection</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <label class="form-label">Select Size</label>
                                <input type="number" class="form-control form-control-sm search-select-size" value="1" min="1" max="10" onchange="updateGridConfig();">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Date-specific options -->
                    <div class="search-date-options" style="display: none;">
                        <div class="row mb-2">
                            <div class="col-6">
                                <label class="form-label">Date Format</label>
                                <select class="form-select form-select-sm search-date-format" onchange="updateGridConfig();">
                                    <option value="Y-m-d" selected>YYYY-MM-DD</option>
                                    <option value="m/d/Y">MM/DD/YYYY</option>
                                    <option value="d/m/Y">DD/MM/YYYY</option>
                                    <option value="Y-m-d H:i:s">YYYY-MM-DD HH:MM:SS</option>
                                </select>
                            </div>
                            <div class="col-6">
                                <div class="form-check mt-4">
                                    <input class="form-check-input search-date-button" type="checkbox" onchange="updateGridConfig();">
                                    <label class="form-check-label">Show Calendar Button</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Number-specific options -->
                    <div class="search-number-options" style="display: none;">
                        <div class="row mb-2">
                            <div class="col-4">
                                <label class="form-label">Min Value</label>
                                <input type="number" class="form-control form-control-sm search-min-value" onchange="updateGridConfig();">
                            </div>
                            <div class="col-4">
                                <label class="form-label">Max Value</label>
                                <input type="number" class="form-control form-control-sm search-max-value" onchange="updateGridConfig();">
                            </div>
                            <div class="col-4">
                                <label class="form-label">Step</label>
                                <input type="number" class="form-control form-control-sm search-step" value="1" step="0.01" onchange="updateGridConfig();">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Initialize default columns
 */
function initializeDefaultColumns() {
    const defaultColumns = [
        {name: 'id', label: 'ID', type: 'number', width: 60, sortable: true, editable: false, hidden: true, align: 'left'},
        {name: 'name', label: 'Name', type: 'text', width: 150, sortable: true, editable: true, hidden: false, align: 'left'},
        {name: 'price', label: 'Price', type: 'currency', width: 100, sortable: true, editable: true, hidden: false, align: 'right'},
        {name: 'stock', label: 'Stock', type: 'number', width: 80, sortable: true, editable: true, hidden: false, align: 'center'},
        {name: 'category', label: 'Category', type: 'select', width: 120, sortable: true, editable: true, hidden: false, align: 'left'}
    ];
    
    $("#columnConfig").empty();
    defaultColumns.forEach((col, index) => {
        const columnId = 'col_' + (index + 1);
        const columnHtml = createColumnConfigHTML(columnId, col);
        $("#columnConfig").append(columnHtml);
    });
    columnIdCounter = defaultColumns.length + 1;
}

/**
 * Update column label in the header
 */
function updateColumnLabel(input) {
    const columnItem = $(input).closest('.column-item');
    const nameInput = columnItem.find('.column-name');
    const labelInput = columnItem.find('.column-label');
    const header = columnItem.find('h6');
    
    if ($(input).hasClass('column-label')) {
        header.text(labelInput.val());
    } else if ($(input).hasClass('column-name')) {
        // Update label if it matches the old name
        if (header.text() === nameInput.val()) {
            labelInput.val(nameInput.val());
            header.text(nameInput.val());
        }
    }
}

/**
 * Update column type specific options
 */
function updateColumnType(select) {
    const columnItem = $(select).closest('.column-item');
    const type = $(select).val();
    
    // Update formatter based on type
    const formatterSelect = columnItem.find('.column-formatter');
    switch(type) {
        case 'number':
            formatterSelect.val('number');
            break;
        case 'currency':
            formatterSelect.val('currency');
            break;
        case 'date':
            formatterSelect.val('date');
            break;
        case 'checkbox':
            formatterSelect.val('checkbox');
            break;
        case 'email':
            formatterSelect.val('email');
            break;
        default:
            formatterSelect.val('');
    }
    
    updateFormatterOptions(formatterSelect[0]);
}

/**
 * Update formatter-specific options
 */
function updateFormatterOptions(select) {
    const columnItem = $(select).closest('.column-item');
    const formatter = $(select).val();
    
    // Hide all formatter-specific options first
    columnItem.find('.formatter-options').remove();
    
    // Add specific options based on formatter
    let optionsHtml = '';
    switch(formatter) {
        case 'currency':
            optionsHtml = `
                <div class="formatter-options mb-2">
                    <label class="form-label">Currency Options</label>
                    <div class="row">
                        <div class="col-4">
                            <input type="text" class="form-control form-control-sm" placeholder="Prefix" value="$">
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control form-control-sm" placeholder="Suffix" value="">
                        </div>
                        <div class="col-4">
                            <input type="number" class="form-control form-control-sm" placeholder="Decimals" value="2" min="0" max="4">
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'date':
            optionsHtml = `
                <div class="formatter-options mb-2">
                    <label class="form-label">Date Format</label>
                    <select class="form-select form-select-sm">
                        <option value="Y-m-d">YYYY-MM-DD</option>
                        <option value="m/d/Y">MM/DD/YYYY</option>
                        <option value="d/m/Y">DD/MM/YYYY</option>
                        <option value="M d, Y">Month Day, Year</option>
                    </select>
                </div>
            `;
            break;
        case 'select':
            optionsHtml = `
                <div class="formatter-options mb-2">
                    <label class="form-label">Select Values (value:label;value2:label2)</label>
                    <input type="text" class="form-control form-control-sm" placeholder="1:Active;0:Inactive">
                </div>
            `;
            break;
    }
    
    if (optionsHtml) {
        $(select).closest('.row').after(optionsHtml);
    }
}

/**
 * Update edit type specific options
 */
function updateEditOptions(select) {
    const columnItem = $(select).closest('.column-item');
    const editType = $(select).val();
    
    // Show/hide select options
    if (editType === 'select') {
        columnItem.find('.edit-select-options').show();
    } else {
        columnItem.find('.edit-select-options').hide();
    }
}

/**
 * Column Management Functions
 */

function removeColumn(button) {
    if (confirm('Are you sure you want to remove this column?')) {
        $(button).closest('.column-item').remove();
        updateGridConfig();
    }
}

function moveColumnUp(button) {
    const columnItem = $(button).closest('.column-item');
    const prevItem = columnItem.prev('.column-item');
    if (prevItem.length) {
        columnItem.insertBefore(prevItem);
        updateGridConfig();
    }
}

function moveColumnDown(button) {
    const columnItem = $(button).closest('.column-item');
    const nextItem = columnItem.next('.column-item');
    if (nextItem.length) {
        columnItem.insertAfter(nextItem);
        updateGridConfig();
    }
}

function toggleColumnDetails(button) {
    const columnItem = $(button).closest('.column-item');
    const details = columnItem.find('.column-details');
    const icon = $(button).find('i');
    
    details.slideToggle();
    icon.toggleClass('fa-cog fa-times');
}

function resetColumns() {
    if (confirm('Reset to default columns? This will remove all custom column configurations.')) {
        initializeDefaultColumns();
        updateGridConfig();
    }
}

function importColumns() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const columns = JSON.parse(e.target.result);
                    loadColumnsFromData(columns);
                    updateGridConfig();
                    logEvent('Columns imported successfully');
                } catch (error) {
                    alert('Error importing columns: ' + error.message);
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function loadColumnsFromData(columns) {
    $("#columnConfig").empty();
    columns.forEach((col, index) => {
        const columnId = 'col_' + (index + 1);
        const columnHtml = createColumnConfigHTML(columnId, col);
        $("#columnConfig").append(columnHtml);
    });
    columnIdCounter = columns.length + 1;
}

function updateColumnConfigUI(config) {
    // Update column configurations based on grid features
    $("#columnConfig .column-item").each(function() {
        const columnItem = $(this);
        
        // Enable/disable editing options based on grid settings
        if (config.inlineEdit || config.cellEdit || config.formEdit) {
            columnItem.find('.column-editable').prop('disabled', false);
        } else {
            columnItem.find('.column-editable').prop('disabled', true);
        }
        
        // Show/hide formatter options based on theme
        if (config.theme === 'custom') {
            columnItem.find('.column-classes').closest('.col-6').show();
        }
    });
}

/**
 * Enhanced Code Generation
 */
function generateCode() {
    const config = collectGridConfig();
    const columns = collectColumnConfig();
    
    // Build complete jqGrid configuration
    const gridConfig = {
        datatype: config.datatype,
        colModel: columns,
        rowNum: config.rowNum,
        rowList: config.rowList,
        sortname: config.sortname,
        sortorder: config.sortorder,
        viewrecords: config.viewrecords,
        height: config.height,
        autowidth: config.autowidth,
        shrinkToFit: config.shrinkToFit,
        caption: config.caption,
        loadtext: config.loadtext,
        emptyrecords: config.emptyrecords
    };
    
    // Add conditional properties
    if (config.pager) {
        gridConfig.pager = '#pager';
    }
    
    if (config.width && config.width !== 'auto') {
        gridConfig.width = config.width;
    }
    
    if (config.multiselect) {
        gridConfig.multiselect = true;
    }
    
    if (config.rownumbers) {
        gridConfig.rownumbers = true;
    }
    
    if (config.datatype !== 'local') {
        gridConfig.url = config.url || '/api/data/';
    }
    
    if (config.grouping && config.groupField) {
        gridConfig.grouping = true;
        gridConfig.groupingView = {
            groupField: [config.groupField],
            groupColumnShow: [true],
            groupText: ['<b>{0} - {1} Item(s)</b>'],
            groupCollapse: false,
            groupOrder: ['asc']
        };
    }
    
    if (config.multiSort) {
        gridConfig.multiSort = true;
    }
    
    if (config.loadonce) {
        gridConfig.loadonce = true;
    }
    
    if (config.hidegrid) {
        gridConfig.hidegrid = true;
    }
    
    if (config.scroll) {
        gridConfig.scroll = 1;
        gridConfig.scrollTimeout = config.scrollTimeout;
    }
    
    // Generate the JavaScript code
    let codeStr = `// jqGrid Configuration
$("#your-grid").jqGrid(${JSON.stringify(gridConfig, null, 2)});`;
    
    // Add post-configuration code
    let postConfig = [];
    
    if (config.filterToolbar) {
        postConfig.push(`
// Add filter toolbar
$("#your-grid").jqGrid('filterToolbar', {
    searchOnEnter: ${config.searchOnEnter}
});`);
    }
    
    if (config.search) {
        postConfig.push(`
// Add search toolbar
$("#your-grid").jqGrid('navGrid', '#pager', {
    search: true,
    add: false,
    edit: false,
    del: false,
    refresh: true
});`);
    }
    
    // Add editing configuration
    if (config.inlineEdit) {
        postConfig.push(`
// Enable inline editing
$("#your-grid").jqGrid('inlineNav', '#pager', {
    edit: true,
    add: true,
    save: true,
    cancel: true
});`);
    }
    
    if (config.cellEdit) {
        postConfig.push(`
// Enable cell editing
$("#your-grid").jqGrid('setGridParam', {
    cellEdit: true,
    cellsubmit: 'remote',
    cellurl: '/api/cell-edit/'
});`);
    }
    
    // Add CSS customizations if custom theme
    if (config.theme === 'custom') {
        postConfig.push(`
// Custom styling
$('<style>')
    .html(\`
        .ui-jqgrid-titlebar { 
            background-color: ${config.headerColor} !important; 
            font-size: ${config.fontSize} !important;
            font-family: ${config.fontFamily} !important;
        }
        .ui-jqgrid-bdiv tr.jqgrow td { 
            background-color: ${config.rowColor} !important;
            font-size: ${config.fontSize} !important;
            font-family: ${config.fontFamily} !important;
        }
        .ui-jqgrid-bdiv tr.jqgrow:nth-child(even) td { 
            background-color: ${config.altRowColor} !important; 
        }
    \`)
    .appendTo('head');`);
    }
    
    // Combine all code
    if (postConfig.length > 0) {
        codeStr += '\n' + postConfig.join('\n');
    }
    
    // Add usage example
    codeStr += `

// Usage Example:
// 1. Include required CSS and JS files
// 2. Create HTML table element: <table id="your-grid"></table>
// 3. Create pager element: <div id="pager"></div>
// 4. Run the above configuration code

// For Django integration, set the URL to your API endpoint:
// url: '{% url "your_api_endpoint" %}'
`;
    
    $("#generatedCode").text(codeStr);
    
    // Update the actual grid with new column model
    updateGridWithColumns(gridConfig.colModel);
}

function collectColumnConfig() {
    const columns = [];
    
    $("#columnConfig .column-item").each(function() {
        const columnItem = $(this);
        
        const column = {
            name: columnItem.find('.column-name').val(),
            index: columnItem.find('.column-name').val(),
            width: parseInt(columnItem.find('.column-width').val()),
            align: columnItem.find('.column-align').val(),
            sortable: columnItem.find('.column-sortable').is(':checked'),
            editable: columnItem.find('.column-editable').is(':checked'),
            hidden: columnItem.find('.column-hidden').is(':checked')
        };
        
        // Add key field
        if (columnItem.find('.column-key').is(':checked')) {
            column.key = true;
        }
        
        // Add formatter
        const formatter = columnItem.find('.column-formatter').val();
        if (formatter) {
            column.formatter = formatter;
            
            // Add formatter options
            if (formatter === 'currency') {
                const prefix = columnItem.find('.formatter-options input').eq(0).val() || '$';
                const suffix = columnItem.find('.formatter-options input').eq(1).val() || '';
                const decimals = parseInt(columnItem.find('.formatter-options input').eq(2).val()) || 2;
                column.formatoptions = {
                    prefix: prefix,
                    suffix: suffix,
                    decimalPlaces: decimals
                };
            } else if (formatter === 'date') {
                const dateFormat = columnItem.find('.formatter-options select').val() || 'Y-m-d';
                column.formatoptions = {
                    newformat: dateFormat
                };
            } else if (formatter === 'select') {
                const selectValues = columnItem.find('.formatter-options input').val();
                if (selectValues) {
                    column.formatoptions = {
                        value: selectValues
                    };
                }
            }
        }
        
        // Add edit options
        if (column.editable) {
            const editType = columnItem.find('.column-edittype').val();
            if (editType && editType !== 'text') {
                column.edittype = editType;
                
                if (editType === 'select') {
                    const selectOptions = columnItem.find('.column-select-options').val();
                    if (selectOptions) {
                        column.editoptions = {
                            value: selectOptions
                        };
                    }
                }
            }
            
            // Add validation rules
            const editRules = {};
            if (columnItem.find('.column-required').is(':checked')) {
                editRules.required = true;
            }
            if (columnItem.find('.column-number').is(':checked')) {
                editRules.number = true;
            }
            if (columnItem.find('.column-integer').is(':checked')) {
                editRules.integer = true;
            }
            if (columnItem.find('.column-email-validation').is(':checked')) {
                editRules.email = true;
            }
            if (columnItem.find('.column-date-validation').is(':checked')) {
                editRules.date = true;
            }
            if (columnItem.find('.column-url-validation').is(':checked')) {
                editRules.url = true;
            }
            
            const minVal = columnItem.find('.column-min').val();
            const maxVal = columnItem.find('.column-max').val();
            if (minVal) editRules.minValue = parseInt(minVal);
            if (maxVal) editRules.maxValue = parseInt(maxVal);
            
            if (Object.keys(editRules).length > 0) {
                column.editrules = editRules;
            }
        }
        
        // Add CSS classes
        const cssClasses = columnItem.find('.column-classes').val();
        if (cssClasses) {
            column.classes = cssClasses;
        }
        
        // Add title/tooltip
        const title = columnItem.find('.column-title').val();
        if (title) {
            column.title = title;
        }
        
        // Add searchoptions if search is enabled
        if (columnItem.find('.enable-search').is(':checked')) {
            const searchOptions = {};
            
            // Collect search operations (sopt)
            const sopt = [];
            if (columnItem.find('.sopt-eq').is(':checked')) sopt.push('eq');
            if (columnItem.find('.sopt-ne').is(':checked')) sopt.push('ne');
            if (columnItem.find('.sopt-cn').is(':checked')) sopt.push('cn');
            if (columnItem.find('.sopt-nc').is(':checked')) sopt.push('nc');
            if (columnItem.find('.sopt-bw').is(':checked')) sopt.push('bw');
            if (columnItem.find('.sopt-ew').is(':checked')) sopt.push('ew');
            if (columnItem.find('.sopt-lt').is(':checked')) sopt.push('lt');
            if (columnItem.find('.sopt-gt').is(':checked')) sopt.push('gt');
            
            if (sopt.length > 0) {
                searchOptions.sopt = sopt;
            }
            
            // Basic search options
            if (columnItem.find('.search-operators-menu').is(':checked')) {
                searchOptions.searchOperMenu = true;
                searchOptions.searchOperators = true;
            }
            
            if (columnItem.find('.search-clear').is(':checked')) {
                searchOptions.clearSearch = true;
            }
            
            if (columnItem.find('.search-hidden').is(':checked')) {
                searchOptions.searchhidden = true;
            }
            
            // Default value and placeholder
            const defaultValue = columnItem.find('.search-default-value').val();
            if (defaultValue) {
                searchOptions.defaultValue = defaultValue;
            }
            
            const placeholder = columnItem.find('.search-placeholder').val();
            if (placeholder) {
                searchOptions.attr = searchOptions.attr || {};
                searchOptions.attr.placeholder = placeholder;
            }
            
            // Type-specific options
            const columnType = columnItem.find('.column-type').val();
            
            if (columnType === 'select') {
                const selectValues = columnItem.find('.search-select-values').val();
                if (selectValues) {
                    searchOptions.value = selectValues;
                }
                
                if (columnItem.find('.search-multiple').is(':checked')) {
                    searchOptions.multiple = true;
                }
                
                const selectSize = columnItem.find('.search-select-size').val();
                if (selectSize && selectSize !== '1') {
                    searchOptions.size = parseInt(selectSize);
                }
            } else if (columnType === 'date') {
                const dateFormat = columnItem.find('.search-date-format').val();
                if (dateFormat) {
                    searchOptions.dateFormat = dateFormat;
                }
                
                if (columnItem.find('.search-date-button').is(':checked')) {
                    searchOptions.dataInit = function(elem) {
                        $(elem).datepicker({
                            dateFormat: 'yy-mm-dd',
                            showOn: 'both',
                            changeYear: true,
                            changeMonth: true
                        });
                    };
                }
                
                searchOptions.attr = searchOptions.attr || {};
                searchOptions.attr.type = 'date';
            } else if (columnType === 'number' || columnType === 'currency') {
                searchOptions.attr = searchOptions.attr || {};
                searchOptions.attr.type = 'number';
                
                const minValue = columnItem.find('.search-min-value').val();
                const maxValue = columnItem.find('.search-max-value').val();
                const step = columnItem.find('.search-step').val();
                
                if (minValue) searchOptions.attr.min = minValue;
                if (maxValue) searchOptions.attr.max = maxValue;
                if (step) searchOptions.attr.step = step;
            }
            
            // Add title to search input
            if (title) {
                searchOptions.attr = searchOptions.attr || {};
                searchOptions.attr.title = `Search ${title}`;
            }
            
            if (Object.keys(searchOptions).length > 0) {
                column.searchoptions = searchOptions;
            }
        }
        
        columns.push(column);
    });
    
    return columns;
}

function updateGridWithColumns(colModel) {
    // Ensure we have valid column model
    if (!colModel || colModel.length === 0) {
        return;
    }
    
    // Store current grid state
    const gridElement = $("#builderGrid");
    const pagerElement = $("#builderPager");
    
    // Destroy existing grid if it exists
    if (gridElement.length > 0 && gridElement[0].grid) {
        try {
            gridElement.jqGrid('destroy');
        } catch(e) {
            console.log("Grid destroy failed, clearing manually");
        }
    }
    
    // Clear grid and pager elements
    gridElement.empty();
    pagerElement.empty();
    
    // Ensure we have the table element
    if (gridElement.length === 0) {
        console.error("Grid element not found");
        return;
    }
    
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
        gridElement.jqGrid({
            datatype: "local",
            data: sampleData,
            colModel: colModel,
            pager: "#builderPager",
            rowNum: parseInt($("#rowNum").val()) || 25,
            sortname: $("#sortname").val() || 'id',
            sortorder: $("#sortorder").val() || "asc",
            viewrecords: $("#viewrecords").is(':checked'),
            height: parseInt($("#gridHeight").val()) || 350,
            autowidth: $("#autowidth").is(':checked'),
            caption: $("#gridTitle").val() || "Sample Grid",
            multiselect: $("#multiselect").is(':checked'),
            rownumbers: $("#rownumbers").is(':checked'),
            gridComplete: function() {
                logEvent("Grid rebuild complete");
            }
        });
    }, 50);
}

/**
 * Configuration Import/Export Functions
 */
function exportConfig() {
    const config = collectGridConfig();
    const columns = collectColumnConfig();
    
    const fullConfig = {
        grid: config,
        columns: columns,
        version: '1.0',
        created: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(fullConfig, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jqgrid-config.json';
    a.click();
    URL.revokeObjectURL(url);
    
    logEvent('Configuration exported successfully');
}

function importConfig() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    loadConfigFromData(data);
                    logEvent('Configuration imported successfully');
                } catch (error) {
                    alert('Error importing configuration: ' + error.message);
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function loadConfigFromData(data) {
    // Load grid configuration
    const config = data.grid || data;
    
    // Set basic settings
    $("#gridTitle").val(config.caption || 'Sample Grid');
    $("#gridWidth").val(config.width || 'auto');
    $("#gridHeight").val(config.height || 350);
    
    // Set pagination
    $("#enablePager").prop('checked', config.pager !== false);
    $("#rowNum").val(config.rowNum || 25);
    if (config.rowList) {
        $("#rowList").val(config.rowList.join(','));
    }
    
    // Set features
    $("#multiselect").prop('checked', config.multiselect || false);
    $("#rownumbers").prop('checked', config.rownumbers || false);
    $("#viewrecords").prop('checked', config.viewrecords !== false);
    $("#autowidth").prop('checked', config.autowidth !== false);
    $("#shrinkToFit").prop('checked', config.shrinkToFit !== false);
    
    // Set data options
    $("#datatype").val(config.datatype || 'local');
    $("#dataUrl").val(config.url || '');
    $("#sortname").val(config.sortname || 'id');
    $("#sortorder").val(config.sortorder || 'asc');
    
    // Load columns if available
    if (data.columns) {
        loadColumnsFromData(data.columns);
    }
    
    updateGridConfig();
}

function resetConfig() {
    if (confirm('Reset all configuration to defaults?')) {
        // Reset all form fields to defaults
        $("#gridTitle").val('Sample Grid');
        $("#gridWidth").val('auto');
        $("#gridHeight").val(350);
        $("#enablePager").prop('checked', true);
        $("#rowNum").val(25);
        $("#rowList").val('10,20,25,50');
        
        // Reset checkboxes
        $("#multiselect, #rownumbers, #viewrecords, #autowidth, #shrinkToFit").prop('checked', true);
        $("#resizable, #sortable").prop('checked', true);
        $("#toolbar, #inlineEdit, #cellEdit, #formEdit, #grouping, #search, #filterToolbar").prop('checked', false);
        $("#searchOnEnter, #loadui, #hidegrid").prop('checked', true);
        $("#loadonce, #multiSort, #remapColumns, #scroll").prop('checked', false);
        
        // Reset appearance
        $("#gridTheme").val('bootstrap');
        $("#captionClass").val('');
        $("#headerColor").val('#f8f9fa');
        $("#rowColor").val('#ffffff');
        $("#altRowColor").val('#f8f9fa');
        $("#borderColor").val('#dee2e6');
        $("#fontSize").val('13px');
        $("#fontFamily").val('inherit');
        $("#hoverRows, #altRows").prop('checked', true);
        
        // Reset data
        $("#datatype").val('local');
        $("#dataUrl").val('');
        $("#sortname").val('id');
        $("#sortorder").val('asc');
        $("#loadtext").val('Loading...');
        $("#emptyrecords").val('No records found');
        $("#scrollTimeout").val(200);
        
        // Reset columns
        initializeDefaultColumns();
        
        updateGridConfig();
        logEvent('Configuration reset to defaults');
    }
}

/**
 * Generate JavaScript code for current configuration
 */
function generateCode() {
    const title = $("#gridTitle").val();
    const rowNum = $("#rowNum").val();
    const height = $("#gridHeight").val();
    const multiselect = $("#multiselect").is(':checked');
    const rownumbers = $("#rownumbers").is(':checked');
    
    // Build column model
    const columns = [];
    $("#columnConfig .column-item").each(function() {
        const name = $(this).find('input').val().toLowerCase().replace(/\s+/g, '_');
        const label = $(this).find('input').val();
        const type = $(this).find('select').val();
        
        const column = {
            name: name,
            index: name,
            width: 120,
            sortable: true
        };
        
        if (type === 'number') {
            column.align = 'right';
            column.formatter = 'number';
        } else if (type === 'date') {
            column.formatter = 'date';
            column.formatoptions = {newformat: 'Y-m-d'};
        } else if (type === 'select') {
            column.edittype = 'select';
            column.editoptions = {value: "option1:Option 1;option2:Option 2"};
        }
        
        columns.push(column);
    });
    
    const codeConfig = {
        url: '/api/your-endpoint/',
        datatype: 'json',
        colModel: columns,
        pager: '#pager',
        rowNum: parseInt(rowNum),
        sortname: columns.length > 0 ? columns[0].name : 'id',
        sortorder: 'asc',
        viewrecords: true,
        height: parseInt(height),
        autowidth: true,
        caption: title
    };
    
    if (multiselect) codeConfig.multiselect = true;
    if (rownumbers) codeConfig.rownumbers = true;
    
    const codeStr = `$("#your-grid").jqGrid(${JSON.stringify(codeConfig, null, 4)});`;
    
    $("#generatedCode").text(codeStr);
}

/**
 * Export grid configuration as JSON
 */
function exportConfig() {
    generateCode();
    const config = $("#generatedCode").text();
    const blob = new Blob([config], {type: 'application/javascript'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jqgrid-config.js';
    a.click();
    URL.revokeObjectURL(url);
}

/**
 * Inline Editing Functions
 */
function enableInlineEdit() {
    const selectedRows = $("#inlineEditGrid").jqGrid('getGridParam', 'selarrrow');
    if (selectedRows.length > 0) {
        selectedRows.forEach(function(id) {
            $("#inlineEditGrid").jqGrid('editRow', id, {keys: true});
        });
        logEvent(`Enabled inline editing for ${selectedRows.length} rows`);
    } else {
        alert('Please select rows to edit');
    }
}

function addNewRow() {
    const newId = new Date().getTime();
    const newRowData = {
        id: newId,
        name: 'New Product',
        price: 0.00,
        stock: 0,
        status: 'pending',
        category: 'New Category'
    };
    
    $("#inlineEditGrid").jqGrid('addRowData', newId, newRowData, 'first');
    $("#inlineEditGrid").jqGrid('editRow', newId, {keys: true});
    logEvent(`Added new row: ID ${newId}`);
}

function saveAllChanges() {
    const grid = $("#inlineEditGrid");
    const ids = grid.jqGrid('getDataIDs');
    
    ids.forEach(function(id) {
        grid.jqGrid('saveRow', id);
    });
    
    logEvent('Saved all changes');
    alert('All changes saved successfully!');
}

function cancelEdit() {
    const grid = $("#inlineEditGrid");
    const ids = grid.jqGrid('getDataIDs');
    
    ids.forEach(function(id) {
        grid.jqGrid('restoreRow', id);
    });
    
    logEvent('Cancelled all edits');
}

/**
 * Custom Formatter Functions
 */
function toggleFormatter(type) {
    const grid = $("#formatterGrid");
    const colModel = grid.jqGrid('getGridParam', 'colModel');
    
    switch(type) {
        case 'currency':
            // Toggle currency formatting on price column
            const priceCol = colModel.find(col => col.name === 'price');
            if (priceCol.formatter === 'currency') {
                priceCol.formatter = undefined;
                priceCol.formatoptions = undefined;
            } else {
                priceCol.formatter = 'currency';
                priceCol.formatoptions = {prefix: '$'};
            }
            break;
            
        case 'progress':
            // Toggle progress bar on progress column
            const progressCol = colModel.find(col => col.name === 'progress');
            if (progressCol.formatter === 'progressBar') {
                progressCol.formatter = undefined;
            } else {
                progressCol.formatter = 'progressBar';
            }
            break;
            
        case 'status':
            // Toggle status indicator on status column
            const statusCol = colModel.find(col => col.name === 'status');
            if (statusCol.formatter === 'statusIndicator') {
                statusCol.formatter = undefined;
            } else {
                statusCol.formatter = 'statusIndicator';
            }
            break;
            
        case 'actions':
            // Toggle action buttons visibility
            const actionsCol = colModel.find(col => col.name === 'actions');
            if (actionsCol.hidden) {
                grid.jqGrid('showCol', 'actions');
                actionsCol.hidden = false;
            } else {
                grid.jqGrid('hideCol', 'actions');
                actionsCol.hidden = true;
            }
            break;
    }
    
    if (grid.length > 0 && grid[0].grid) {
        grid.trigger('reloadGrid');
    }
    logEvent(`Toggled formatter: ${type}`);
}

/**
 * Dynamic Configuration Functions
 */

function toggleGrouping() {
    const grid = $("#dynamicGrid");
    const grouping = grid.jqGrid('getGridParam', 'grouping');
    
    grid.jqGrid('groupingRemove');
    
    if (!grouping) {
        grid.jqGrid('groupingGroupBy', 'category', {
            groupColumnShow: [true],
            groupText: ['<b>{0} - {1} Item(s)</b>'],
            groupCollapse: false,
            groupOrder: ['asc']
        });
        logEvent('Enabled grouping by category');
    } else {
        logEvent('Disabled grouping');
    }
}

function toggleFrozenColumns() {
    logEvent('Frozen columns toggled (feature demonstration)');
    alert('Frozen columns feature would be implemented here');
}

function toggleSubGrid() {
    logEvent('Sub grids toggled (feature demonstration)');
    alert('Sub grids feature would be implemented here');
}

/**
 * Action Button Functions
 */
function editRow(id) {
    logEvent(`Edit action for row ID: ${id}`);
    alert(`Edit row with ID: ${id}`);
}

function deleteRow(id) {
    if (confirm(`Delete row with ID: ${id}?`)) {
        $("#formatterGrid").jqGrid('delRowData', id);
        logEvent(`Deleted row ID: ${id}`);
    }
}

function viewRow(id) {
    const rowData = $("#formatterGrid").jqGrid('getRowData', id);
    logEvent(`View action for row ID: ${id}`);
    alert(`Viewing row: ${JSON.stringify(rowData, null, 2)}`);
}

/**
 * Event Logging Function
 */
function logEvent(message) {
    eventLogCount++;
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `<div class="mb-1">[${timestamp}] ${message}</div>`;
    
    const logContainer = $("#eventLog");
    if (eventLogCount === 1) {
        logContainer.html(logEntry);
    } else {
        logContainer.append(logEntry);
    }
    
    // Scroll to bottom
    logContainer.scrollTop(logContainer[0].scrollHeight);
    
    // Limit log entries
    if (eventLogCount > 50) {
        logContainer.find('div:first').remove();
    }
}

function clearEventLog() {
    $("#eventLog").html('<div class="text-muted">Events will appear here...</div>');
    eventLogCount = 0;
    logEvent('Event log cleared');
}

/**
 * Utility Functions
 */
function refreshAllGrids() {
    const gridIds = ["#builderGrid", "#inlineEditGrid", "#formatterGrid", "#dynamicGrid", "#eventGrid"];
    gridIds.forEach(id => {
        const grid = $(id);
        if (grid.length > 0 && grid[0].grid) {
            grid.trigger('reloadGrid');
        }
    });
    logEvent('All grids refreshed');
}

/**
 * New Feature Functions for Advanced Configuration
 */

// Navigation & Actions Functions
function addCustomAction() {
    const actionHtml = `
        <div class="custom-action-item mb-2 p-2 border rounded">
            <div class="row">
                <div class="col-4">
                    <input type="text" class="form-control form-control-sm" placeholder="Button Text" value="New Action">
                </div>
                <div class="col-4">
                    <input type="text" class="form-control form-control-sm" placeholder="Icon Class" value="fa-star">
                </div>
                <div class="col-3">
                    <select class="form-select form-select-sm">
                        <option value="nav">Navigator</option>
                        <option value="toolbar">Toolbar</option>
                        <option value="column">Column Header</option>
                    </select>
                </div>
                <div class="col-1">
                    <button class="btn btn-outline-danger btn-sm" onclick="removeCustomAction(this)">×</button>
                </div>
            </div>
            <div class="mt-2">
                <input type="text" class="form-control form-control-sm" placeholder="JavaScript Function" value="customAction()">
            </div>
        </div>
    `;
    $("#customActions").append(actionHtml);
    logEvent('Custom action added');
}

function removeCustomAction(button) {
    $(button).closest('.custom-action-item').remove();
    updateGridConfig();
    logEvent('Custom action removed');
}

// SubGrid & TreeGrid Functions
function toggleSubgridOptions() {
    const enabled = $("#enableSubgrid").is(':checked');
    if (enabled) {
        $("#subgridOptions").slideDown();
        logEvent('SubGrid options enabled');
    } else {
        $("#subgridOptions").slideUp();
        logEvent('SubGrid options disabled');
    }
}

function toggleTreegridOptions() {
    const enabled = $("#enableTreegrid").is(':checked');
    if (enabled) {
        $("#treegridOptions").slideDown();
        logEvent('TreeGrid options enabled');
    } else {
        $("#treegridOptions").slideUp();
        logEvent('TreeGrid options disabled');
    }
}

// Events & Callbacks Functions
function addCustomEvent() {
    const eventHtml = `
        <div class="event-item mb-3">
            <div class="row mb-2">
                <div class="col-8">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" onchange="updateGridConfig()">
                        <input type="text" class="form-control form-control-sm d-inline-block" style="width: 80%;" placeholder="Event Name" value="customEvent">
                    </div>
                </div>
                <div class="col-4">
                    <button class="btn btn-outline-danger btn-sm" onclick="removeCustomEvent(this)">Remove</button>
                </div>
            </div>
            <textarea class="form-control form-control-sm" rows="2" placeholder="function() { // Your code here }" onchange="updateGridConfig()"></textarea>
        </div>
    `;
    $("#events-config").append(eventHtml);
    logEvent('Custom event added');
}

function removeCustomEvent(button) {
    $(button).closest('.event-item').remove();
    updateGridConfig();
    logEvent('Custom event removed');
}

// Plugin Functions
function addCustomPlugin() {
    const pluginHtml = `
        <div class="custom-plugin-item mb-2 p-2 border rounded">
            <div class="row">
                <div class="col-6">
                    <input type="text" class="form-control form-control-sm" placeholder="Plugin Name" value="NewPlugin">
                </div>
                <div class="col-5">
                    <input type="text" class="form-control form-control-sm" placeholder="Plugin File" value="jquery.newplugin.js">
                </div>
                <div class="col-1">
                    <button class="btn btn-outline-danger btn-sm" onclick="removeCustomPlugin(this)">×</button>
                </div>
            </div>
        </div>
    `;
    $("#customPlugins").append(pluginHtml);
    logEvent('Custom plugin added');
}

function removeCustomPlugin(button) {
    $(button).closest('.custom-plugin-item').remove();
    updateGridConfig();
    logEvent('Custom plugin removed');
}

/**
 * Enhanced Grid Configuration Collection
 */
function collectAdvancedGridConfig() {
    const basicConfig = collectGridConfig();
    
    return {
        ...basicConfig,
        
        // Navigation & Actions
        navigator: {
            enabled: $("#enableNavigator").is(':checked'),
            add: $("#navAdd").is(':checked'),
            edit: $("#navEdit").is(':checked'),
            del: $("#navDelete").is(':checked'),
            search: $("#navSearch").is(':checked'),
            refresh: $("#navRefresh").is(':checked'),
            view: $("#navView").is(':checked'),
            buttonWidth: parseInt($("#navButtonWidth").val()),
            position: $("#navPosition").val(),
            confirmDelete: $("#confirmDelete").is(':checked'),
            deleteMessage: $("#deleteMessage").val()
        },
        
        // Forms
        forms: {
            width: parseInt($("#formWidth").val()),
            height: parseInt($("#formHeight").val()),
            modal: $("#formModal").is(':checked'),
            resizable: $("#formResize").is(':checked'),
            draggable: $("#formDraggable").is(':checked'),
            addTitle: $("#addFormTitle").val(),
            editTitle: $("#editFormTitle").val(),
            deleteTitle: $("#deleteFormTitle").val(),
            viewTitle: $("#viewFormTitle").val(),
            submitText: $("#submitText").val(),
            cancelText: $("#cancelText").val(),
            closeText: $("#closeText").val(),
            clientValidation: $("#clientSideValidation").is(':checked'),
            serverValidation: $("#serverSideValidation").is(':checked'),
            showErrors: $("#showValidationErrors").is(':checked'),
            addUrl: $("#addUrl").val(),
            editUrl: $("#editUrl").val(),
            deleteUrl: $("#deleteUrl").val(),
            method: $("#formMethod").val()
        },
        
        // SubGrid & TreeGrid
        subgrid: {
            enabled: $("#enableSubgrid").is(':checked'),
            url: $("#subgridUrl").val(),
            width: parseInt($("#subgridWidth").val()),
            expandColumn: $("#expandColumn").val(),
            reloadOnExpand: $("#subgridReload").is(':checked'),
            model: $("#subgridModel").val()
        },
        
        treegrid: {
            enabled: $("#enableTreegrid").is(':checked'),
            column: $("#treeGridColumn").val(),
            model: $("#treeGridModel").val(),
            expandLevel: parseInt($("#expandLevel").val()),
            icons: $("#treeIcons").val(),
            rootLevel: parseInt($("#treeRootLevel").val()),
            asList: $("#treeAsList").is(':checked')
        },
        
        // Events
        events: collectEventConfig(),
        
        // Filters
        filters: collectFilterConfig(),
        
        // Plugins
        plugins: collectPluginConfig(),
        
        // Custom Actions
        customActions: collectCustomActions()
    };
}

function collectEventConfig() {
    const events = {};
    
    // Standard events
    if ($("#enableLoadComplete").is(':checked')) {
        events.loadComplete = $("#enableLoadComplete").closest('.event-item').find('textarea').val();
    }
    if ($("#enableOnSelectRow").is(':checked')) {
        events.onSelectRow = $("#enableOnSelectRow").closest('.event-item').find('textarea').val();
    }
    if ($("#enableOnCellSelect").is(':checked')) {
        events.onCellSelect = $("#enableOnCellSelect").closest('.event-item').find('textarea').val();
    }
    if ($("#enableOnDoubleClick").is(':checked')) {
        events.ondblClickRow = $("#enableOnDoubleClick").closest('.event-item').find('textarea').val();
    }
    if ($("#enableOnRightClick").is(':checked')) {
        events.onRightClickRow = $("#enableOnRightClick").closest('.event-item').find('textarea').val();
    }
    if ($("#enableBeforeEditCell").is(':checked')) {
        events.beforeEditCell = $("#enableBeforeEditCell").closest('.event-item').find('textarea').val();
    }
    if ($("#enableAfterEditCell").is(':checked') ) {
        events.afterEditCell = $("#enableAfterEditCell").closest('.event-item').find('textarea').val();
    }
    if ($("#enableBeforeSubmit").is(':checked')) {
        events.beforeSubmit = $("#enableBeforeSubmit").closest('.event-item').find('textarea').val();
    }
    if ($("#enableAfterSubmit").is(':checked')) {
        events.afterSubmit = $("#enableAfterSubmit").closest('.event-item').find('textarea').val();
    }
    
    return events;
}

function collectPluginConfig() {
    return {
        export: {
            excel: $("#enableExcelExport").is(':checked'),
            csv: $("#enableCsvExport").is(':checked'),
            pdf: $("#enablePdfExport").is(':checked'),
            print: $("#enablePrintView").is(':checked')
        },
        columns: {
            chooser: $("#enableColumnChooser").is(':checked'),
            reordering: $("#enableColumnReordering").is(':checked'),
            resizing: $("#enableColumnResizing").is(':checked'),
            frozen: $("#enableFrozenColumns").is(':checked')
        },
        search: {
            advanced: $("#enableAdvancedSearch").is(':checked'),
            quick: $("#enableQuickSearch").is(':checked'),
            filterPanel: $("#enableFilterPanel").is(':checked')
        },
        ui: {
            rowActions: $("#enableRowActions").is(':checked'),
            contextMenu: $("#enableContextMenu").is(':checked'),
            tooltips: $("#enableTooltips").is(':checked'),
            progressBar: $("#enableProgressBar").is(':checked')
        },
        mobile: {
            optimized: $("#enableMobileView").is(':checked'),
            touch: $("#enableTouchSupport").is(':checked'),
            responsive: $("#enableResponsive").is(':checked')
        },
        custom: collectCustomPlugins()
    };
}

function collectCustomActions() {
    const actions = [];
    $("#customActions .custom-action-item").each(function() {
        const action = {
            text: $(this).find('input').eq(0).val(),
            icon: $(this).find('input').eq(1).val(),
            position: $(this).find('select').val(),
            onclick: $(this).find('input').eq(2).val()
        };
        actions.push(action);
    });
    return actions;
}

function collectCustomPlugins() {
    const plugins = [];
    $("#customPlugins .custom-plugin-item").each(function() {
        const plugin = {
            name: $(this).find('input').eq(0).val(),
            file: $(this).find('input').eq(1).val()
        };
        plugins.push(plugin);
    });
    return plugins;
}

/**
 * Ultra-Enhanced Code Generation
 */
function generateAdvancedCode() {
    const config = collectAdvancedGridConfig();
    const columns = collectColumnConfig();
    
    // Build comprehensive jqGrid configuration
    let gridConfig = {
        datatype: config.datatype,
        colModel: columns,
        rowNum: config.rowNum,
        rowList: config.rowList,
        sortname: config.sortname,
        sortorder: config.sortorder,
        viewrecords: config.viewrecords,
        height: config.height,
        autowidth: config.autowidth,
        shrinkToFit: config.shrinkToFit,
        caption: config.caption,
        loadtext: config.loadtext,
        emptyrecords: config.emptyrecords
    };
    
    // Add all conditional properties
    if (config.pager) gridConfig.pager = '#pager';
    if (config.width && config.width !== 'auto') gridConfig.width = config.width;
    if (config.multiselect) gridConfig.multiselect = true;
    if (config.rownumbers) gridConfig.rownumbers = true;
    if (config.datatype !== 'local') gridConfig.url = config.url || '/api/data/';
    
    // Add SubGrid configuration
    if (config.subgrid.enabled) {
        gridConfig.subGrid = true;
        gridConfig.subGridUrl = config.subgrid.url;
        gridConfig.subGridWidth = config.subgrid.width;
        if (config.subgrid.model) {
            try {
                gridConfig.subGridModel = JSON.parse(config.subgrid.model);
            } catch (e) {
                console.warn('Invalid SubGrid model JSON');
            }
        }
    }
    
    // Add TreeGrid configuration
    if (config.treegrid.enabled) {
        gridConfig.treeGrid = true;
        gridConfig.treeGridModel = config.treegrid.model;
        gridConfig.ExpandColumn = config.treegrid.column;
        gridConfig.tree_root_level = config.treegrid.rootLevel;
        gridConfig.ExpandColClick = true;
    }
    
    // Add events
    Object.keys(config.events).forEach(eventName => {
        if (config.events[eventName]) {
            try {
                gridConfig[eventName] = new Function('return ' + config.events[eventName])();
            } catch (e) {
                console.warn(`Invalid event function for ${eventName}`);
            }
        }
    });
    
    // Generate main grid code
    let codeStr = `// Comprehensive jqGrid Configuration
$("#your-grid").jqGrid(${JSON.stringify(gridConfig, null, 2).replace(/"function[^"]*"/g, function(match) {
    return match.slice(1, -1);
})});`;
    
    // Add navigator configuration
    if (config.navigator.enabled) {
        const navOptions = {
            add: config.navigator.add,
            edit: config.navigator.edit,
            del: config.navigator.del,
            search: config.navigator.search,
            refresh: config.navigator.refresh,
            view: config.navigator.view
        };
        
        const formOptions = {
            width: config.forms.width,
            height: config.forms.height,
            modal: config.forms.modal,
            drag: config.forms.draggable,
            resize: config.forms.resizable
        };
        
        codeStr += `

// Navigator Configuration
$("#your-grid").jqGrid('navGrid', '#pager', ${JSON.stringify(navOptions, null, 2)}, 
    // Edit options
    ${JSON.stringify({...formOptions, caption: config.forms.editTitle}, null, 2)},
    // Add options  
    ${JSON.stringify({...formOptions, caption: config.forms.addTitle}, null, 2)},
    // Delete options
    ${JSON.stringify({msg: config.navigator.deleteMessage}, null, 2)}
);`;
    }
    
    // Add custom actions
    if (config.customActions.length > 0) {
        codeStr += `

// Custom Actions`;
        config.customActions.forEach(action => {
            codeStr += `
$("#your-grid").jqGrid('navButtonAdd', '#pager', {
    caption: "${action.text}",
    buttonicon: "${action.icon}",
    onClickButton: ${action.onclick},
    position: "${action.position}"
});`;
        });
    }
    
    // Add filter toolbar configuration
    if (config.filters.enabled) {
        codeStr += `

// Filter Toolbar Configuration
$("#your-grid").jqGrid('filterToolbar', {
    searchOnEnter: ${config.filters.searchOnEnter},
    searchOperators: ${config.filters.operators},
    defaultSearch: "${config.filters.defaultOp}",
    clearSearch: ${config.filters.clearSearch},
    stringResult: ${config.filters.stringResult}`;
        
        if (config.filters.searchDelay !== 500) {
            codeStr += `,
    searchDelay: ${config.filters.searchDelay}`;
        }
        
        codeStr += `
});`;

        // Add advanced search if enabled
        if (config.filters.advancedSearch) {
            codeStr += `

// Advanced Search Dialog
$("#your-grid").jqGrid('searchGrid', {
    multipleSearch: ${config.filters.multipleSearch},
    multipleGroup: true,
    showQuery: ${config.filters.showQuery},
    sopt: ['eq', 'ne', 'cn', 'nc', 'bw', 'ew', 'lt', 'le', 'gt', 'ge']
});`;
        }
    }
    
    // Add plugin configurations
    if (config.plugins.columns.chooser) {
        codeStr += `

// Column Chooser
$("#your-grid").jqGrid('navButtonAdd', '#pager', {
    caption: "Choose Columns",
    buttonicon: "ui-icon-columns",
    onClickButton: function() {
        $("#your-grid").jqGrid('columnChooser');
    }
});`;
    }
    
    if (config.plugins.export.excel || config.plugins.export.csv) {
        codeStr += `

// Export Functions`;
        if (config.plugins.export.excel) {
            codeStr += `
function exportToExcel() {
    $("#your-grid").jqGrid('excelExport', {
        url: '/api/export/excel/'
    });
}`;
        }
        if (config.plugins.export.csv) {
            codeStr += `
function exportToCsv() {
    $("#your-grid").jqGrid('exportToCsv', {
        url: '/api/export/csv/'
    });
}`;
        }
    }
    
    // Add advanced search
    if (config.plugins.search.advanced) {
        codeStr += `

// Advanced Search
$("#your-grid").jqGrid('searchGrid', {
    multipleSearch: true,
    multipleGroup: true,
    showQuery: true
});`;
    }
    
    // Add mobile/responsive configuration
    if (config.plugins.mobile.responsive) {
        codeStr += `

// Responsive Configuration
$(window).on('resize', function() {
    var gridWidth = $("#your-grid").closest('.ui-jqgrid').parent().width();
    $("#your-grid").jqGrid('setGridWidth', gridWidth);
});`;
    }
    
    // Add custom plugins
    if (config.plugins.custom.length > 0) {
        codeStr += `

// Custom Plugins`;
        config.plugins.custom.forEach(plugin => {
            codeStr += `
// Include: <script src="${plugin.file}"></script>
// Plugin: ${plugin.name}`;
        });
    }
    
    // Add comprehensive usage documentation
    codeStr += `

/*
 * COMPREHENSIVE IMPLEMENTATION GUIDE
 * 
 * 1. Required Files:
 *    - jQuery library
 *    - jQuery UI (theme CSS and JS)
 *    - jqGrid CSS and JS files
 *    
 * 2. HTML Structure:
 *    <table id="your-grid"></table>
 *    <div id="pager"></div>
 *    
 * 3. Django Integration:
 *    - Update URLs to Django endpoints
 *    - Configure CSRF tokens for POST requests
 *    - Set up proper API views with DRF
 *    
 * 4. Additional Features Configured:
 *    ${config.subgrid.enabled ? '- SubGrid functionality' : ''}
 *    ${config.treegrid.enabled ? '- TreeGrid functionality' : ''}
 *    ${config.navigator.enabled ? '- Full navigator with CRUD operations' : ''}
 *    ${config.plugins.export.excel || config.plugins.export.csv ? '- Export functionality' : ''}
 *    ${config.plugins.search.advanced ? '- Advanced search capabilities' : ''}
 *    ${config.plugins.mobile.responsive ? '- Responsive design' : ''}
 *    
 * 5. Events Configured: ${Object.keys(config.events).length} custom events
 * 6. Custom Actions: ${config.customActions.length} action buttons
 * 7. Plugins: ${config.plugins.custom.length} custom plugins
 */`;
    
    $("#generatedCode").text(codeStr);
    
    // Update preview grid
    updateGridWithAdvancedConfig(gridConfig);
    
    logEvent(`Generated comprehensive code with ${Object.keys(config.events).length} events and ${config.customActions.length} actions`);
}

function updateGridWithAdvancedConfig(gridConfig) {
    // Rebuild grid with advanced configuration
    try {
        $("#builderGrid").jqGrid('destroy');
    } catch(e) {
        // If destroy fails, manually clear the grid
        $("#builderGrid").empty();
    }
    
    // Use a simplified version for preview
    const previewConfig = {
        datatype: "local",
        data: sampleData,
        colModel: gridConfig.colModel,
        pager: "#builderPager",
        rowNum: gridConfig.rowNum,
        sortname: gridConfig.sortname,
        sortorder: gridConfig.sortorder,
        viewrecords: gridConfig.viewrecords,
        height: gridConfig.height,
        autowidth: gridConfig.autowidth,
        caption: gridConfig.caption,
        multiselect: gridConfig.multiselect,
        rownumbers: gridConfig.rownumbers
    };
    
    $("#builderGrid").jqGrid(previewConfig);
}

/**
 * Initialize Custom Formatters Grid
 */
function initializeFormatterDemoGrid() {
    $("#formatterGrid").jqGrid({
        datatype: "local",
        data: sampleData,
        colModel: [
            {name: 'id', index: 'id', width: 60, key: true, hidden: true},
            {name: 'name', index: 'name', width: 150},
            {name: 'price', index: 'price', width: 100, align: 'right', 
             formatter: function(cellvalue, options, rowObject) {
                 return '<span class="text-success fw-bold">$' + cellvalue + '</span>';
             }},
            {name: 'progress', index: 'progress', width: 120, align: 'center',
             formatter: function(cellvalue, options, rowObject) {
                 const color = cellvalue >= 80 ? 'success' : cellvalue >= 50 ? 'warning' : 'danger';
                 return `<div class="progress">
                           <div class="progress-bar bg-${color}" style="width: ${cellvalue}%">${cellvalue}%</div>
                         </div>`;
             }},
            {name: 'status', index: 'status', width: 100, align: 'center',
             formatter: function(cellvalue, options, rowObject) {
                 const statusClass = cellvalue === 'active' ? 'success' : cellvalue === 'inactive' ? 'danger' : 'warning';
                 return `<span class="badge bg-${statusClass}">${cellvalue.toUpperCase()}</span>`;
             }},
            {name: 'actions', index: 'actions', width: 120, align: 'center', sortable: false,
             formatter: function(cellvalue, options, rowObject) {
                 return '<div class="btn-group btn-group-sm">' +
                        '<button class="btn btn-outline-primary" onclick="editRecord(' + rowObject.id + ')"><i class="fas fa-edit"></i></button>' +
                        '<button class="btn btn-outline-danger" onclick="deleteRecord(' + rowObject.id + ')"><i class="fas fa-trash"></i></button>' +
                        '</div>';
             }}
        ],
        pager: "#formatterPager",
        rowNum: 10,
        sortname: 'id',
        sortorder: "asc",
        viewrecords: true,
        height: 300,
        autowidth: true,
        caption: "Custom Formatters Demo"
    });
}

// Configuration import/export functions
function exportConfig() {
    const config = collectAdvancedGridConfig();
    const configJson = JSON.stringify(config, null, 2);
    downloadFile(configJson, 'jqgrid-config.json', 'application/json');
    logEvent('Configuration exported');
}

function importConfig() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const config = JSON.parse(e.target.result);
                    applyImportedConfig(config);
                    logEvent('Configuration imported successfully');
                } catch (error) {
                    logEvent('Error importing configuration: ' + error.message);
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function applyImportedConfig(config) {
    $("#gridCaption").val(config.caption || 'Sample Grid');
    $("#gridHeight").val(config.height || 350);
    $("#rowNum").val(config.rowNum || 25);
    updateGridConfig();
}

function resetConfig() {
    $("#configTabs input[type='text']").each(function() {
        $(this).val($(this).attr('placeholder') || '');
    });
    $("#configTabs input[type='number']").each(function() {
        $(this).val($(this).attr('value') || '');
    });
    $("#configTabs input[type='checkbox']").prop('checked', false);
    $("#configTabs select").each(function() {
        $(this).val($(this).find('option[selected]').val() || $(this).find('option:first').val());
    });
    
    $("#gridCaption").val('Sample Grid');
    $("#gridHeight").val('350');
    $("#rowNum").val('25');
    $("#enableNavigator").prop('checked', true);
    $("#navAdd, #navEdit, #navDelete, #navSearch, #navRefresh").prop('checked', true);
    
    updateGridConfig();
    logEvent('Configuration reset to defaults');
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Demo interaction functions
function toggleFormatter(type) {
    logEvent(`Toggled ${type} formatter`);
}

function editRecord(id) {
    logEvent(`Edit record: ID ${id}`);
}

function deleteRecord(id) {
    logEvent(`Delete record: ID ${id}`);
}


function toggleGrouping() {
    const grid = $("#dynamicGrid");
    const currentGrouping = grid.jqGrid('getGridParam', 'grouping');
    grid.jqGrid('groupingGroupBy', currentGrouping ? '' : 'category');
    logEvent(`Grouping ${currentGrouping ? 'disabled' : 'enabled'}`);
}

function toggleFrozenColumns() {
    logEvent('Frozen columns toggled');
}

function toggleSubGrid() {
    logEvent('SubGrid toggled');
}

function enableInlineEdit() {
    const grid = $("#inlineEditGrid");
    if (grid.length > 0 && grid[0].grid) {
        grid.jqGrid('setGridParam', {cellEdit: true}).trigger('reloadGrid');
    }
    logEvent('Inline editing enabled');
}

function addNewRow() {
    const newId = Math.max(...sampleData.map(item => item.id)) + 1;
    $("#inlineEditGrid").jqGrid('addRowData', newId, {
        id: newId,
        name: 'New Product',
        price: 0.00,
        stock: 0,
        status: 'pending',
        category: 'New'
    });
    logEvent(`Added new row: ID ${newId}`);
}

function saveAllChanges() {
    logEvent('All changes saved');
}

function cancelEdit() {
    $("#inlineEditGrid").jqGrid('restoreRow', lastEditedRow);
    logEvent('Edit cancelled');
}

function clearEventLog() {
    eventLogCount = 0;
    $("#eventLog").html('<div class="text-muted">Events will appear here...</div>');
}

// Configuration helper functions
function toggleSubgridOptions() {
    const enabled = $("#enableSubgrid").is(':checked');
    $("#subgridOptions").toggle(enabled);
}

function toggleTreegridOptions() {
    const enabled = $("#enableTreegrid").is(':checked');
    $("#treegridOptions").toggle(enabled);
}

function addCustomAction() {
    const actionHtml = `
        <div class="custom-action-item mb-2 p-2 border rounded">
            <div class="row">
                <div class="col-4">
                    <input type="text" class="form-control form-control-sm" placeholder="Button Text">
                </div>
                <div class="col-4">
                    <input type="text" class="form-control form-control-sm" placeholder="Icon Class">
                </div>
                <div class="col-3">
                    <select class="form-select form-select-sm">
                        <option value="nav">Navigator</option>
                        <option value="toolbar">Toolbar</option>
                        <option value="column">Column Header</option>
                    </select>
                </div>
                <div class="col-1">
                    <button class="btn btn-outline-danger btn-sm" onclick="removeCustomAction(this)">×</button>
                </div>
            </div>
            <div class="mt-2">
                <input type="text" class="form-control form-control-sm" placeholder="JavaScript Function">
            </div>
        </div>
    `;
    $("#customActions").append(actionHtml);
    logEvent('Custom action added');
}

function removeCustomAction(button) {
    $(button).closest('.custom-action-item').remove();
    logEvent('Custom action removed');
}

function addCustomPlugin() {
    const pluginHtml = `
        <div class="custom-plugin-item mb-2 p-2 border rounded">
            <div class="row">
                <div class="col-6">
                    <input type="text" class="form-control form-control-sm" placeholder="Plugin Name">
                </div>
                <div class="col-5">
                    <input type="text" class="form-control form-control-sm" placeholder="Plugin File">
                </div>
                <div class="col-1">
                    <button class="btn btn-outline-danger btn-sm" onclick="removeCustomPlugin(this)">×</button>
                </div>
            </div>
        </div>
    `;
    $("#customPlugins").append(pluginHtml);
    logEvent('Custom plugin added');
}

function removeCustomPlugin(button) {
    $(button).closest('.custom-plugin-item').remove();
    logEvent('Custom plugin removed');
}

function addCustomEvent() {
    logEvent('Custom event configuration added');
}

/**
 * Toggle Search Options Visibility
 */
function toggleSearchOptions(checkbox) {
    const columnItem = $(checkbox).closest('.column-item');
    const searchContainer = columnItem.find('.search-options-container');
    
    if ($(checkbox).is(':checked')) {
        searchContainer.slideDown();
        // Enable search operator menu by default
        columnItem.find('.search-operators-menu').prop('checked', true);
    } else {
        searchContainer.slideUp();
    }
    
    logEvent('Toggled search options for column');
}

/**
 * Update search options based on column type
 */
function updateColumnType(selectElement) {
    const columnItem = $(selectElement).closest('.column-item');
    const columnType = $(selectElement).val();
    
    // Show/hide type-specific search options
    const selectOptions = columnItem.find('.search-select-options');
    const dateOptions = columnItem.find('.search-date-options');
    const numberOptions = columnItem.find('.search-number-options');
    
    // Hide all type-specific options first
    selectOptions.hide();
    dateOptions.hide();
    numberOptions.hide();
    
    // Show relevant options based on column type
    switch(columnType) {
        case 'select':
            selectOptions.show();
            // Update search operations for select
            const columnConfig = columnItem.find('.sopt-cn, .sopt-nc, .sopt-bw, .sopt-ew, .sopt-lt, .sopt-gt');
            columnConfig.prop('checked', false);
            columnItem.find('.sopt-eq, .sopt-ne').prop('checked', true);
            break;
            
        case 'date':
            dateOptions.show();
            // Update search operations for date
            const dateOps = columnItem.find('.sopt-cn, .sopt-nc, .sopt-bw, .sopt-ew');
            dateOps.prop('checked', false);
            columnItem.find('.sopt-eq, .sopt-ne, .sopt-lt, .sopt-gt').prop('checked', true);
            break;
            
        case 'number':
        case 'currency':
            numberOptions.show();
            // Update search operations for numbers
            const textOps = columnItem.find('.sopt-cn, .sopt-nc, .sopt-bw, .sopt-ew');
            textOps.prop('checked', false);
            columnItem.find('.sopt-eq, .sopt-ne, .sopt-lt, .sopt-gt').prop('checked', true);
            break;
            
        case 'text':
        case 'email':
        case 'url':
        default:
            // Text operations are good for text fields
            columnItem.find('.sopt-cn, .sopt-eq').prop('checked', true);
            break;
    }
    
    logEvent(`Updated column type to: ${columnType}`);
}

/**
 * Apply Filter Presets
 */
function applyFilterPreset(preset) {
    const grid = $("#builderGrid");
    
    // Clear existing filters first
    clearAllFilters('builderGrid');
    
    switch(preset) {
        case 'active':
            addCustomSearchOperation('builderGrid', 'status', 'eq', 'active');
            break;
        case 'expensive':
            addCustomSearchOperation('builderGrid', 'price', 'gt', '30');
            break;
        case 'lowstock':
            addCustomSearchOperation('builderGrid', 'stock', 'lt', '50');
            break;
    }
    
    logEvent(`Applied filter preset: ${preset}`);
}

/**
 * Enhanced filter configuration collection
 */
function collectFilterConfig() {
    return {
        enabled: $("#enableFilterToolbar").is(':checked'),
        operators: $("#filterOperators").is(':checked'),
        clearSearch: $("#clearSearch").is(':checked'),
        defaultOp: $("#defaultSearchOp").val(),
        searchDelay: parseInt($("#searchDelay").val()) || 500,
        searchOnEnter: $("#searchOnEnterOnly").is(':checked'),
        stringResult: $("#stringResult").is(':checked'),
        advancedSearch: $("#enableAdvancedSearch").is(':checked'),
        multipleSearch: $("#multipleSearch").is(':checked'),
        showQuery: $("#showQuery").is(':checked'),
        operators: {
            text: {
                equals: $("#opEquals").is(':checked'),
                contains: $("#opContains").is(':checked'),
                beginsWith: $("#opBeginsWith").is(':checked'),
                endsWith: $("#opEndsWith").is(':checked')
            },
            number: {
                lessThan: $("#opLessThan").is(':checked'),
                greaterThan: $("#opGreaterThan").is(':checked'),
                between: $("#opBetween").is(':checked')
            }
        }
    };
}

/**
 * Initialize SearchOptions Demo Grid
 */
function initializeSearchOptionsGrid() {
    $("#searchOptionsGrid").jqGrid({
        datatype: "local",
        data: sampleData,
        colModel: [
            {
                name: 'id', 
                index: 'id', 
                width: 60, 
                key: true, 
                hidden: true
            },
            {
                name: 'name', 
                index: 'name', 
                width: 150,
                searchoptions: {
                    sopt: ['cn', 'eq', 'ne', 'bw', 'ew'],
                    clearSearch: true,
                    searchOperMenu: true,
                    attr: {
                        title: "Search by product name",
                        placeholder: "Enter product name..."
                    },
                    noFilterText: "All Products"
                }
            },
            {
                name: 'price', 
                index: 'price', 
                width: 100, 
                align: 'right', 
                formatter: 'currency',
                formatoptions: {prefix: '$'},
                searchoptions: {
                    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'],
                    clearSearch: true,
                    searchOperMenu: true,
                    attr: {
                        type: "number",
                        min: "0",
                        step: "0.01",
                        title: "Filter by price range"
                    },
                    defaultValue: ""
                }
            },
            {
                name: 'stock', 
                index: 'stock', 
                width: 80, 
                align: 'center',
                searchoptions: {
                    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'],
                    clearSearch: true,
                    searchOperMenu: true,
                    attr: {
                        type: "number",
                        min: "0",
                        title: "Filter by stock quantity"
                    }
                }
            },
            {
                name: 'status', 
                index: 'status', 
                width: 100,
                stype: 'select',
                searchoptions: {
                    sopt: ['eq', 'ne'],
                    value: ":All;active:Active;inactive:Inactive;pending:Pending",
                    clearSearch: true,
                    searchOperMenu: false,
                    attr: {
                        title: "Filter by status"
                    },
                    multiple: false,
                    selectFilled: true
                }
            },
            {
                name: 'category', 
                index: 'category', 
                width: 120,
                stype: 'select',
                searchoptions: {
                    sopt: ['eq', 'ne'],
                    value: buildCategoryOptions(),
                    clearSearch: true,
                    searchOperMenu: false,
                    multiple: true,
                    size: 1,
                    attr: {
                        title: "Filter by category (multiple selection allowed)"
                    }
                }
            },
            {
                name: 'progress', 
                index: 'progress', 
                width: 100, 
                align: 'center',
                formatter: function(cellvalue) {
                    const color = cellvalue >= 80 ? 'success' : cellvalue >= 50 ? 'warning' : 'danger';
                    return `<div class="progress" style="height: 20px;">
                               <div class="progress-bar bg-${color}" style="width: ${cellvalue}%">${cellvalue}%</div>
                             </div>`;
                },
                searchoptions: {
                    sopt: ['eq', 'lt', 'le', 'gt', 'ge'],
                    clearSearch: true,
                    searchOperMenu: true,
                    attr: {
                        type: "range",
                        min: "0",
                        max: "100",
                        title: "Filter by progress percentage"
                    },
                    dataInit: function(elem) {
                        $(elem).after('<span class="range-value">50%</span>');
                        $(elem).on('input', function() {
                            $(this).next('.range-value').text(this.value + '%');
                        });
                    }
                }
            }
        ],
        pager: "#searchOptionsPager",
        rowNum: 10,
        sortname: 'id',
        sortorder: "asc",
        viewrecords: true,
        height: 300,
        autowidth: true,
        caption: "SearchOptions Configuration Examples"
    });

    // Initialize filter toolbar with all the searchoptions
    $("#searchOptionsGrid").jqGrid('filterToolbar', {
        searchOnEnter: false,
        searchOperators: true,
        defaultSearch: "cn"
    });
    
    logEvent("SearchOptions demo grid initialized");
}

/**
 * Show SearchOption Examples
 */
function showSearchOptionExample(type) {
    let code = '';
    
    switch(type) {
        case 'text':
            code = `{
    name: 'name',
    index: 'name',
    width: 150,
    searchoptions: {
        // Available search operations
        sopt: ['cn', 'eq', 'ne', 'bw', 'ew', 'nc'],
        
        // Show clear search button
        clearSearch: true,
        
        // Enable search operator menu
        searchOperMenu: true,
        
        // HTML attributes for input field
        attr: {
            title: "Search by product name",
            placeholder: "Enter product name...",
            maxlength: "50",
            class: "form-control"
        },
        
        // Placeholder text when no filter
        noFilterText: "All Products",
        
        // Default search value
        defaultValue: "",
        
        // Custom width
        width: "100px"
    }
}

// Search Operations (sopt):
// 'cn' = contains
// 'eq' = equals  
// 'ne' = not equal
// 'bw' = begins with
// 'ew' = ends with
// 'nc' = does not contain`;
            break;
            
        case 'select':
            code = `{
    name: 'status',
    index: 'status', 
    width: 100,
    stype: 'select', // Important: set stype to 'select'
    searchoptions: {
        // Available operations for select
        sopt: ['eq', 'ne'],
        
        // Select options: "value:text;value2:text2"
        value: ":All;active:Active;inactive:Inactive;pending:Pending",
        
        // Allow multiple selection
        multiple: false,
        
        // Size of select box
        size: 1,
        
        // Fill select with unique values from data
        selectFilled: false,
        
        // Clear search functionality
        clearSearch: true,
        
        // HTML attributes
        attr: {
            title: "Filter by status",
            class: "form-select"
        },
        
        // Default selected value
        defaultValue: "active"
    }
}

// For multiple selection:
searchoptions: {
    value: ":All;cat1:Category 1;cat2:Category 2",
    multiple: true,
    size: 3
}`;
            break;
            
        case 'date':
            code = `{
    name: 'created_date',
    index: 'created_date',
    width: 120,
    searchoptions: {
        // Date-specific operations
        sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'],
        
        // Initialize date picker
        dataInit: function(elem) {
            $(elem).datepicker({
                dateFormat: 'yy-mm-dd',
                showOn: 'focus',
                changeYear: true,
                changeMonth: true,
                showButtonPanel: true
            });
        },
        
        // HTML attributes for date input
        attr: {
            title: "Filter by date",
            placeholder: "YYYY-MM-DD",
            type: "date"
        },
        
        // Clear search
        clearSearch: true,
        searchOperMenu: true,
        
        // Date format for searching
        dateFormat: 'Y-m-d',
        
        // Minimum and maximum dates
        minDate: '-1y',  // 1 year ago
        maxDate: '+1y'   // 1 year ahead
    }
}

// Alternative date range setup:
searchoptions: {
    dataInit: function(elem) {
        $(elem).daterangepicker({
            format: 'YYYY-MM-DD',
            separator: ' to '
        });
    }
}`;
            break;
            
        case 'number':
            code = `{
    name: 'price',
    index: 'price',
    width: 100,
    searchoptions: {
        // Numeric operations
        sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge', 'bt'], // bt = between
        
        // HTML5 number input attributes
        attr: {
            type: "number",
            min: "0",
            max: "9999.99",
            step: "0.01",
            title: "Filter by price range",
            placeholder: "0.00"
        },
        
        // Initialize range slider (custom)
        dataInit: function(elem) {
            // Create range slider
            $(elem).after('<div class="price-range-slider"></div>');
            $(elem).next('.price-range-slider').slider({
                range: true,
                min: 0,
                max: 1000,
                values: [0, 1000],
                slide: function(event, ui) {
                    $(elem).val(ui.values[0] + '-' + ui.values[1]);
                }
            });
        },
        
        clearSearch: true,
        searchOperMenu: true,
        defaultValue: "",
        
        // Custom validation
        searchrules: {
            number: true,
            minValue: 0
        }
    }
}

// For integer fields:
searchoptions: {
    attr: {
        type: "number",
        step: "1",
        min: "0"
    },
    searchrules: {
        integer: true,
        minValue: 0
    }
}`;
            break;
    }
    
    $("#searchOptionCode").text(code);
    logEvent(`Showed searchoptions example: ${type}`);
}

/**
 * Comprehensive SearchOptions Configuration Examples
 */
const searchOptionsExamples = {
    // Basic text search with all options
    textAdvanced: {
        sopt: ['cn', 'eq', 'ne', 'bw', 'ew', 'nc', 'nu', 'nn'],
        clearSearch: true,
        searchOperMenu: true,
        searchOperators: true,
        attr: {
            title: "Advanced text search",
            placeholder: "Type to search...",
            maxlength: "100",
            autocomplete: "off",
            class: "form-control search-input"
        },
        noFilterText: "No Filter",
        defaultValue: "",
        width: "120px",
        recreateForm: true
    },
    
    // Select with dynamic options
    selectDynamic: {
        sopt: ['eq', 'ne', 'nu', 'nn'],
        value: function() {
            // Dynamically build options from data
            const uniqueValues = [...new Set(sampleData.map(item => item.category))];
            let options = ":All";
            uniqueValues.forEach(val => {
                options += `;${val}:${val}`;
            });
            return options;
        },
        multiple: true,
        size: 4,
        clearSearch: true,
        attr: {
            title: "Select multiple categories",
            class: "form-select"
        }
    },
    
    // Date range picker
    dateRange: {
        sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'],
        dataInit: function(elem) {
            $(elem).datepicker({
                dateFormat: 'yy-mm-dd',
                showOn: 'both',
                buttonImage: '/static/images/calendar.png',
                buttonImageOnly: true,
                changeYear: true,
                changeMonth: true,
                yearRange: '-10:+2',
                showButtonPanel: true,
                closeText: 'Clear',
                onClose: function(dateText, inst) {
                    if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
                        document.getElementById(this.id).value = '';
                    }
                }
            });
        },
        clearSearch: true,
        searchOperMenu: true,
        attr: {
            readonly: "readonly",
            title: "Select date",
            placeholder: "Click to select date"
        }
    },
    
    // Custom search with autocomplete
    autocomplete: {
        sopt: ['cn', 'eq', 'bw'],
        dataInit: function(elem) {
            $(elem).autocomplete({
                source: function(request, response) {
                    const matches = sampleData
                        .map(item => item.name)
                        .filter(name => name.toLowerCase().includes(request.term.toLowerCase()))
                        .slice(0, 10);
                    response(matches);
                },
                minLength: 2,
                delay: 300
            });
        },
        clearSearch: true,
        attr: {
            title: "Type for autocomplete suggestions",
            placeholder: "Start typing..."
        }
    }
};

/**
 * jqGrid Theme System
 * Comprehensive theme configuration with live preview
 */
const jqGridThemes = {
    'bootstrap': {
        name: 'Bootstrap Default',
        description: 'Standard Bootstrap 5 styling',
        colors: {
            primary: '#0d6efd',
            secondary: '#6c757d',
            success: '#198754',
            warning: '#ffc107',
            danger: '#dc3545',
            info: '#0dcaf0',
            background: '#ffffff',
            headerBg: '#f8f9fa',
            headerText: '#495057',
            border: '#dee2e6',
            text: '#212529'
        },
        css: {
            '.ui-jqgrid': {
                'border': '1px solid #dee2e6',
                'border-radius': '0.375rem',
                'font-family': 'system-ui, -apple-system, sans-serif'
            },
            '.ui-jqgrid-titlebar': {
                'background': 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                'color': '#495057',
                'border-bottom': '1px solid #dee2e6',
                'font-weight': '600'
            },
            '.ui-jqgrid-hdiv': {
                'background': '#f8f9fa',
                'border-bottom': '2px solid #dee2e6'
            },
            '.ui-jqgrid-htable th': {
                'background': '#f8f9fa',
                'color': '#495057',
                'border-right': '1px solid #dee2e6'
            },
            '.ui-jqgrid-btable tr.jqgrow:hover': {
                'background': '#f8f9fa'
            }
        }
    },
    'ui-lightness': {
        name: 'UI Lightness',
        description: 'Clean light theme with subtle gradients',
        colors: {
            primary: '#0073ea',
            secondary: '#6c757d',
            success: '#28a745',
            warning: '#ffc107',
            danger: '#dc3545',
            info: '#17a2b8',
            background: '#ffffff',
            headerBg: '#f6f6f6',
            headerText: '#333333',
            border: '#d3d3d3',
            text: '#333333'
        },
        css: {
            '.ui-jqgrid': {
                'border': '1px solid #d3d3d3',
                'border-radius': '6px',
                'box-shadow': '0 2px 4px rgba(0,0,0,0.1)'
            },
            '.ui-jqgrid-titlebar': {
                'background': 'linear-gradient(to bottom, #f6f6f6 0%, #e8e8e8 100%)',
                'color': '#333333',
                'border-bottom': '1px solid #d3d3d3',
                'text-shadow': '0 1px 0 #ffffff'
            },
            '.ui-jqgrid-hdiv': {
                'background': 'linear-gradient(to bottom, #f6f6f6 0%, #e8e8e8 100%)'
            },
            '.ui-jqgrid-htable th': {
                'background': 'transparent',
                'color': '#333333',
                'border-right': '1px solid #d3d3d3',
                'text-shadow': '0 1px 0 #ffffff'
            },
            '.ui-jqgrid-btable tr.jqgrow:hover': {
                'background': '#f0f8ff'
            }
        }
    },
    'ui-darkness': {
        name: 'UI Darkness',
        description: 'Dark theme for low-light environments',
        colors: {
            primary: '#4dabf7',
            secondary: '#868e96',
            success: '#51cf66',
            warning: '#ffd43b',
            danger: '#ff6b6b',
            info: '#74c0fc',
            background: '#2d3748',
            headerBg: '#1a202c',
            headerText: '#e2e8f0',
            border: '#4a5568',
            text: '#e2e8f0'
        },
        css: {
            '.ui-jqgrid': {
                'border': '1px solid #4a5568',
                'border-radius': '6px',
                'background': '#2d3748',
                'color': '#e2e8f0'
            },
            '.ui-jqgrid-titlebar': {
                'background': 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
                'color': '#e2e8f0',
                'border-bottom': '1px solid #4a5568'
            },
            '.ui-jqgrid-hdiv': {
                'background': '#1a202c',
                'border-bottom': '1px solid #4a5568'
            },
            '.ui-jqgrid-htable th': {
                'background': '#1a202c',
                'color': '#e2e8f0',
                'border-right': '1px solid #4a5568'
            },
            '.ui-jqgrid-btable tr.jqgrow': {
                'background': '#2d3748',
                'color': '#e2e8f0',
                'border-bottom': '1px solid #4a5568'
            },
            '.ui-jqgrid-btable tr.jqgrow:hover': {
                'background': '#4a5568'
            }
        }
    },
    'material': {
        name: 'Material Design',
        description: 'Google Material Design inspired theme',
        colors: {
            primary: '#1976d2',
            secondary: '#424242',
            success: '#388e3c',
            warning: '#f57c00',
            danger: '#d32f2f',
            info: '#0288d1',
            background: '#fafafa',
            headerBg: '#1976d2',
            headerText: '#ffffff',
            border: '#e0e0e0',
            text: '#212121'
        },
        css: {
            '.ui-jqgrid': {
                'border': 'none',
                'border-radius': '4px',
                'box-shadow': '0 2px 8px rgba(0,0,0,0.12)',
                'background': '#fafafa'
            },
            '.ui-jqgrid-titlebar': {
                'background': '#1976d2',
                'color': '#ffffff',
                'border': 'none',
                'padding': '16px',
                'font-weight': '500',
                'letter-spacing': '0.5px'
            },
            '.ui-jqgrid-hdiv': {
                'background': '#f5f5f5',
                'border': 'none'
            },
            '.ui-jqgrid-htable th': {
                'background': '#f5f5f5',
                'color': '#424242',
                'border-right': '1px solid #e0e0e0',
                'font-weight': '500',
                'padding': '12px 8px'
            },
            '.ui-jqgrid-btable tr.jqgrow': {
                'border-bottom': '1px solid #e0e0e0'
            },
            '.ui-jqgrid-btable tr.jqgrow:hover': {
                'background': '#f0f0f0',
                'box-shadow': '0 1px 3px rgba(0,0,0,0.12)'
            }
        }
    },
    'dark-mode': {
        name: 'Modern Dark',
        description: 'Modern dark mode with blue accents',
        colors: {
            primary: '#3b82f6',
            secondary: '#64748b',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            info: '#06b6d4',
            background: '#0f172a',
            headerBg: '#1e293b',
            headerText: '#f1f5f9',
            border: '#334155',
            text: '#e2e8f0'
        },
        css: {
            '.ui-jqgrid': {
                'border': '1px solid #334155',
                'border-radius': '8px',
                'background': '#0f172a',
                'color': '#e2e8f0',
                'box-shadow': '0 4px 16px rgba(0,0,0,0.3)'
            },
            '.ui-jqgrid-titlebar': {
                'background': 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                'color': '#f1f5f9',
                'border-bottom': '1px solid #3b82f6',
                'font-weight': '600'
            },
            '.ui-jqgrid-hdiv': {
                'background': '#1e293b',
                'border-bottom': '1px solid #334155'
            },
            '.ui-jqgrid-htable th': {
                'background': '#1e293b',
                'color': '#f1f5f9',
                'border-right': '1px solid #334155'
            },
            '.ui-jqgrid-btable tr.jqgrow': {
                'background': '#0f172a',
                'color': '#e2e8f0',
                'border-bottom': '1px solid #334155'
            },
            '.ui-jqgrid-btable tr.jqgrow:hover': {
                'background': '#1e293b'
            }
        }
    },
    'custom': {
        name: 'Custom Theme',
        description: 'Customizable theme using color picker values',
        colors: {
            primary: '#007bff',
            secondary: '#6c757d',
            success: '#28a745',
            warning: '#ffc107',
            danger: '#dc3545',
            info: '#17a2b8',
            background: '#ffffff',
            headerBg: '#f8f9fa',
            headerText: '#495057',
            border: '#dee2e6',
            text: '#212529'
        },
        css: {} // Will be dynamically generated
    }
};

/**
 * Apply theme to the grid
 */
function applyThemeToGrid(themeName) {
    const theme = jqGridThemes[themeName];
    if (!theme) {
        logEvent(`Error: Theme '${themeName}' not found`);
        return;
    }

    // Skip if theme hasn't changed to improve performance
    if (currentBuilderConfig.theme === themeName) {
        return;
    }

    // Remove existing theme styles
    $('#dynamic-theme-styles').remove();
    
    let css = '';
    
    if (themeName === 'custom') {
        // Generate custom theme CSS based on color picker values
        const colors = getCustomThemeColors();
        css = generateCustomThemeCSS(colors);
    } else {
        // Use predefined theme CSS
        for (const selector in theme.css) {
            css += `${selector} {`;
            for (const property in theme.css[selector]) {
                css += `${property}: ${theme.css[selector][property]} !important;`;
            }
            css += `}\n`;
        }
    }
    
    // Use requestAnimationFrame to prevent forced reflows
    requestAnimationFrame(() => {
        // Inject the CSS
        const styleElement = $(`<style id="dynamic-theme-styles">${css}</style>`);
        $('head').append(styleElement);
        
        // Update grid theme class more efficiently
        const gridElement = $('.ui-jqgrid');
        if (gridElement.length) {
            gridElement[0].className = gridElement[0].className
                .replace(/\b(ui-lightness|ui-darkness|bootstrap|material|dark-mode|custom)\b/g, '')
                .trim() + ' ' + themeName;
        }
        
        // Store current theme
        currentBuilderConfig.theme = themeName;
        
        logEvent(`Applied theme: ${theme.name}`);
    });
}

/**
 * Get custom theme colors from color pickers
 */
function getCustomThemeColors() {
    return {
        primary: $('#customPrimary').val() || '#007bff',
        secondary: $('#customSecondary').val() || '#6c757d',
        success: $('#customSuccess').val() || '#28a745',
        warning: $('#customWarning').val() || '#ffc107',
        danger: $('#customDanger').val() || '#dc3545',
        info: $('#customInfo').val() || '#17a2b8',
        background: $('#customBackground').val() || '#ffffff',
        headerBg: $('#customHeaderBg').val() || '#f8f9fa',
        headerText: $('#customHeaderText').val() || '#495057',
        border: $('#customBorder').val() || '#dee2e6',
        text: $('#customText').val() || '#212529'
    };
}

/**
 * Generate CSS for custom theme
 */
function generateCustomThemeCSS(colors) {
    const isDark = getBrightness(colors.background) < 128;
    const hoverBg = isDark ? lighten(colors.background, 20) : darken(colors.background, 5);
    
    return `
        .ui-jqgrid.custom {
            border: 1px solid ${colors.border} !important;
            border-radius: 6px !important;
            background: ${colors.background} !important;
            color: ${colors.text} !important;
        }
        .ui-jqgrid.custom .ui-jqgrid-titlebar {
            background: linear-gradient(135deg, ${colors.headerBg} 0%, ${darken(colors.headerBg, 10)} 100%) !important;
            color: ${colors.headerText} !important;
            border-bottom: 1px solid ${colors.border} !important;
            font-weight: 600 !important;
        }
        .ui-jqgrid.custom .ui-jqgrid-hdiv {
            background: ${colors.headerBg} !important;
            border-bottom: 2px solid ${colors.primary} !important;
        }
        .ui-jqgrid.custom .ui-jqgrid-htable th {
            background: ${colors.headerBg} !important;
            color: ${colors.headerText} !important;
            border-right: 1px solid ${colors.border} !important;
        }
        .ui-jqgrid.custom .ui-jqgrid-btable tr.jqgrow {
            background: ${colors.background} !important;
            color: ${colors.text} !important;
            border-bottom: 1px solid ${colors.border} !important;
        }
        .ui-jqgrid.custom .ui-jqgrid-btable tr.jqgrow:hover {
            background: ${hoverBg} !important;
        }
        .ui-jqgrid.custom .ui-jqgrid-pager {
            background: ${colors.background} !important;
            border-top: 1px solid ${colors.border} !important;
        }
    `;
}

/**
 * Color utility functions
 */
function getBrightness(color) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return ((r * 299) + (g * 587) + (b * 114)) / 1000;
}

function lighten(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function darken(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return '#' + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
        (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
        (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
}

/**
 * Reset custom theme to defaults
 */
function resetCustomTheme() {
    const defaults = jqGridThemes.custom.colors;
    $('#customPrimary').val(defaults.primary);
    $('#customSecondary').val(defaults.secondary);
    $('#customSuccess').val(defaults.success);
    $('#customWarning').val(defaults.warning);
    $('#customDanger').val(defaults.danger);
    $('#customInfo').val(defaults.info);
    $('#customBackground').val(defaults.background);
    $('#customHeaderBg').val(defaults.headerBg);
    $('#customHeaderText').val(defaults.headerText);
    $('#customBorder').val(defaults.border);
    $('#customText').val(defaults.text);
    
    if ($('#gridTheme').val() === 'custom') {
        applyThemeToGrid('custom');
    }
    
    logEvent('Reset custom theme to defaults');
}

/**
 * Export current theme configuration
 */
function exportTheme() {
    const currentTheme = $('#gridTheme').val();
    let themeConfig;
    
    if (currentTheme === 'custom') {
        themeConfig = {
            name: 'Custom Theme Export',
            type: 'custom',
            colors: getCustomThemeColors(),
            exportDate: new Date().toISOString()
        };
    } else {
        themeConfig = {
            name: jqGridThemes[currentTheme].name,
            type: currentTheme,
            colors: jqGridThemes[currentTheme].colors,
            exportDate: new Date().toISOString()
        };
    }
    
    const blob = new Blob([JSON.stringify(themeConfig, null, 2)], {
        type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jqgrid-theme-${currentTheme}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    logEvent(`Exported theme: ${themeConfig.name}`);
}

/**
 * Import theme configuration
 */
function importTheme() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const themeConfig = JSON.parse(e.target.result);
                    
                    if (themeConfig.type === 'custom' || !jqGridThemes[themeConfig.type]) {
                        // Import as custom theme
                        $('#gridTheme').val('custom');
                        const colors = themeConfig.colors;
                        $('#customPrimary').val(colors.primary || '#007bff');
                        $('#customSecondary').val(colors.secondary || '#6c757d');
                        $('#customSuccess').val(colors.success || '#28a745');
                        $('#customWarning').val(colors.warning || '#ffc107');
                        $('#customDanger').val(colors.danger || '#dc3545');
                        $('#customInfo').val(colors.info || '#17a2b8');
                        $('#customBackground').val(colors.background || '#ffffff');
                        $('#customHeaderBg').val(colors.headerBg || '#f8f9fa');
                        $('#customHeaderText').val(colors.headerText || '#495057');
                        $('#customBorder').val(colors.border || '#dee2e6');
                        $('#customText').val(colors.text || '#212529');
                        
                        applyThemeToGrid('custom');
                        toggleCustomThemeOptions();
                    } else {
                        // Apply predefined theme
                        $('#gridTheme').val(themeConfig.type);
                        applyThemeToGrid(themeConfig.type);
                        toggleCustomThemeOptions();
                    }
                    
                    logEvent(`Imported theme: ${themeConfig.name}`);
                } catch (error) {
                    logEvent(`Error importing theme: ${error.message}`);
                    alert('Error importing theme file. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

/**
 * Toggle custom theme options visibility
 */
function toggleCustomThemeOptions() {
    const isCustom = $('#gridTheme').val() === 'custom';
    $('#customThemeOptions').toggle(isCustom);
    if (isCustom) {
        $('#customThemeOptions').slideDown(200);
    } else {
        $('#customThemeOptions').slideUp(200);
    }
}

// Initialize tooltips and other Bootstrap components
$(document).ready(function() {
    // Initialize default columns first
    initializeDefaultColumns();
    
    // Initialize the builder grid first
    initializeBuilderGrid();
    
    // Initialize all other demo grids
    initializeInlineEditGrid();
    initializeSearchOptionsGrid();
    initializeAdvancedFilterGrid();
    initializeFormatterGrid();
    initializeDynamicGrid();
    initializeEventGrid();
    
    // Enable Bootstrap tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // Update grid configuration after a delay to ensure everything is loaded
    setTimeout(() => {
        // Only update config, don't reinitialize
        const gridElement = $("#builderGrid");
        if (gridElement.length && gridElement[0].grid) {
            updateGridConfig();
        }
    }, 200);
    
    // Override the generateCode function to use the advanced version
    window.generateCode = generateAdvancedCode;
    
    // Initialize theme system
    $('#gridTheme').on('change', function() {
        const selectedTheme = $(this).val();
        applyThemeToGrid(selectedTheme);
        toggleCustomThemeOptions();
        updateGridConfig();
    });
    
    // Custom theme color picker event handlers
    $('#customThemeOptions input[type="color"]').on('change', function() {
        if ($('#gridTheme').val() === 'custom') {
            applyThemeToGrid('custom');
            updateGridConfig();
        }
    });
    
    // Set initial theme
    applyThemeToGrid('bootstrap');
    toggleCustomThemeOptions();
    
    // Add initial log entries without timeout to improve performance
    requestAnimationFrame(() => {
        logEvent('Advanced features page loaded');
        logEvent('All demo grids initialized');
        logEvent('Interactive grid builder ready');
        logEvent('10 configuration tabs available');
        logEvent('200+ configuration options loaded');
        logEvent('Advanced column filters with expression menu enabled');
        logEvent('Comprehensive searchoptions configuration available');
        logEvent('Theme system with 6 predefined themes loaded');
        logEvent('Custom theme builder with color picker ready');
        logEvent('Theme export/import functionality enabled');
        logEvent('Performance optimizations applied');
    });
});