# Three-Column Import Feature Documentation

## Overview

The Django jqGrid project now includes a comprehensive **three-column import interface** that allows users to import data from CSV and Excel files with advanced mapping capabilities. This feature provides a professional, user-friendly way to import data with flexible column mapping and default value support.

## Features

### 🔧 **Three-Column Mapping Interface**
- **Column 1: System Fields** - Shows your database field names (e.g., "name", "description", "price")
- **Column 2: File Headers** - Dropdown to select which column from the uploaded file maps to each system field
- **Column 3: Default Value** - Input field to provide default values when no file column is mapped

### 📁 **File Format Support**
- **CSV files** (.csv) - Automatic header detection
- **Excel files** (.xlsx, .xls) - Full Excel support with XLSX.js library
- **Automatic encoding detection** - Handles various character encodings

### 🎯 **Smart Mapping Features**
- **Auto-mapping** - Automatically matches file headers with system fields when names are similar
- **Mutual exclusion** - When a column is mapped, default value is disabled (and vice versa)
- **Data type conversion** - Handles boolean, decimal, integer, date, and foreign key fields
- **Select2 dropdowns** - Enhanced user experience with searchable dropdowns

## Implementation Details

### Backend Architecture

#### ViewSet Endpoints
Each model ViewSet includes two new endpoints:

```python
@action(detail=False, methods=['get'])
def export_data(self, request):
    """Export data endpoint compatible with jqgrid-import-export.js"""
    
@action(detail=False, methods=['post'])
def import_data(self, request):
    """Import data endpoint compatible with jqgrid-import-export.js"""
```

#### Grid Configuration
Import/export configurations are defined in `grid_config.py`:

```python
.set_import_config([
    "name", "description", "status", "category", "price"
])
.set_export_config([
    "id", "name", "description", "status", "created_at"
])
```

### Frontend Architecture

#### JavaScript Integration
The feature uses `jqgrid-import-export.js` which provides:
- Dynamic modal creation
- File processing and header extraction
- Three-column mapping table generation
- AJAX submission with FormData
- Progress tracking and error handling

#### CSS Styling
Enhanced styling for:
- Import modal layouts
- Select2 dropdown integration
- Button spacing and alignment
- Responsive design support

## Usage Guide

### 1. Accessing Import Feature

Navigate to any grid page:
- Products: `http://localhost:8000/examples/products/`
- Categories: `http://localhost:8000/examples/categories/`
- Customers: `http://localhost:8000/examples/customers/`
- Orders: `http://localhost:8000/examples/orders/`

Click the **Import** button in the toolbar.

### 2. File Upload Process

1. **Select File**: Choose your CSV or Excel file
2. **File Processing**: Headers are automatically extracted
3. **Column Mapping**: The three-column interface appears

### 3. Column Mapping Interface

```
System Fields     | File Headers        | Default Value
------------------|--------------------|-----------------
Name              | Product Name ▼     | [disabled]
SKU               | SKU Code ▼         | [disabled]  
Price             | Price ▼            | [disabled]
Stock Quantity    | -- Select -- ▼     | [100]
Status            | -- Select -- ▼     | [active]
Description       | Product Desc ▼     | [disabled]
```

#### Mapping Rules:
- **Map columns** when your file has the data
- **Set default values** for fields not in your file
- **Cannot do both** for the same field (mutual exclusion)

### 4. Data Type Handling

The system automatically handles various data types:

#### Boolean Fields (e.g., `active`, `is_featured`)
- Accepts: `true`, `false`, `1`, `0`, `yes`, `no`, `on`, `off`
- Case insensitive

#### Decimal Fields (e.g., `price`, `credit_limit`)
- Automatically converts to Django Decimal type
- Handles currency symbols and formatting

#### Integer Fields (e.g., `stock_quantity`, `order_count`)
- Converts string numbers to integers
- Validates numeric input

#### Foreign Key Fields (e.g., `category`, `customer`)
- **Categories**: Matches by name (e.g., "Electronics" → Electronics category)
- **Customers**: Matches by email or name
- Falls back to default if no match found

#### Date Fields (e.g., `order_date`, `registration_date`)
- Supports multiple formats: `YYYY-MM-DD`, `MM/DD/YYYY`
- Falls back to current date if parsing fails

## Sample Data Files

### Categories CSV Example
```csv
Name,Description,Active
"Electronics","Electronic devices and gadgets","true"
"Books","Books and educational materials","true"
"Clothing","Apparel and fashion items","false"
```

### Products CSV Example
```csv
Product Name,SKU,Price,Stock,Status,Category,Description
"Laptop Pro","LPT-001","999.99","10","active","Electronics","High-performance laptop"
"Python Guide","PYG-002","29.99","50","active","Books","Programming guide"
```

### Customers CSV Example
```csv
First Name,Last Name,Email,Phone,Type,Active,City,State
"John","Doe","john@example.com","555-1234","individual","true","New York","NY"
"Jane","Smith","jane@example.com","555-5678","business","true","Los Angeles","CA"
```

## Error Handling

### File Processing Errors
- **Invalid file format**: Clear error message with supported formats
- **No headers found**: Prompts user to check file structure
- **Encoding issues**: Automatic fallback to different encodings

### Data Validation Errors
- **Missing required fields**: Skips row with warning
- **Invalid data types**: Converts where possible, logs errors
- **Foreign key mismatches**: Uses defaults, continues processing

### Network Errors
- **Upload failures**: Retry mechanism with user feedback
- **Server errors**: Detailed error messages for debugging

## Advanced Features

### 1. Bulk Operations
Import supports bulk creation with optimized database queries.

### 2. Progress Tracking
Real-time feedback during import process:
- File upload progress
- Processing status
- Success/error counts

### 3. Rollback Support
Failed imports don't leave partial data (transaction support).

### 4. Export Integration
Seamless export functionality with the same column configurations.

## Configuration Options

### Grid Configuration Builder
```python
def get_products_grid_config():
    builder = GridConfigBuilder("Product", "/examples/api/products/")
    
    return (builder
        .add_column("name", "Product Name", required=True)
        .add_column("sku", "SKU", required=True)
        .add_column("price", "Price", formatter="currency")
        .set_import_config([
            "name", "sku", "price", "stock_quantity", 
            "status", "category", "description"
        ])
        .set_export_config([
            "id", "name", "sku", "price", "stock_quantity", 
            "status", "category", "created_at"
        ])
        .build()
    )
```

### Import Configuration Options
```python
{
    "headers": ["name", "description", "status"],  # Importable fields
    "allowed_formats": ["csv", "xlsx", "xls"],     # Supported formats
    "header_titles": {                             # Field display names
        "name": "Category Name",
        "description": "Category Description"
    }
}
```

## Testing

### Automated Tests
Run the comprehensive test suite:
```bash
python3 final_test.py
```

### Manual Testing
1. **CSV Import**: Test with sample_categories.csv
2. **Excel Import**: Test with test_categories.xlsx
3. **Default Values**: Map only some columns, set defaults for others
4. **Error Handling**: Try invalid files, missing data

## Troubleshooting

### Common Issues

#### "XLSX library not loaded" Error
**Solution**: XLSX.js is now included in base.html automatically.

#### Duplicate Import/Export Buttons
**Solution**: Removed static buttons, only dynamic buttons are created.

#### Import Shows 0 Records
**Solution**: Check column mapping - ensure required fields are mapped or have defaults.

#### File Upload Fails
**Solution**: Check file permissions, file size limits, and Django settings.

### Debug Mode
Enable debug output by adding to import endpoints:
```python
print(f"Processing row: {row}")
print(f"Mapped data: {mapped_data}")
```

## Performance Considerations

### Large File Handling
- **Streaming processing** for large CSV files
- **Batch creation** for database efficiency
- **Memory management** during file processing

### Database Optimization
- **Bulk operations** instead of individual creates
- **Foreign key caching** to avoid repeated queries
- **Transaction management** for data integrity

## Security Features

### File Validation
- **Extension checking** - only allows specified formats
- **Content-type validation** - verifies actual file content
- **File size limits** - prevents large file uploads

### Data Sanitization
- **Input cleaning** - strips whitespace, handles encoding
- **SQL injection prevention** - uses Django ORM safely
- **XSS protection** - sanitizes user input

## Future Enhancements

### Planned Features
1. **Background processing** for very large files
2. **Import preview** with data validation
3. **Field validation rules** in grid configuration
4. **Import history** and audit trail
5. **Custom data transformers** for complex mappings

### API Extensions
1. **RESTful import endpoints** for programmatic access
2. **Webhook notifications** for import completion
3. **Import templates** for recurring imports

---

## Quick Start Example

1. **Navigate** to http://localhost:8000/examples/products/
2. **Click** the Import button
3. **Upload** test_products.csv
4. **Map columns**:
   - Name → "Product Name"
   - SKU → "SKU" 
   - Price → "Price"
   - Stock Quantity → "Stock"
   - Status → (leave unmapped)
   - Status default → "active"
5. **Click** Import Data
6. **Success!** Products are imported with mapped data and default status

This comprehensive import system provides a professional, user-friendly interface for data import operations with advanced mapping capabilities and robust error handling.