#!/usr/bin/env python3
"""
Create test CSV and Excel files for import testing
"""

import csv
import pandas as pd

def create_test_files():
    # Sample categories data
    categories_data = [
        {"Name": "Test Electronics", "Description": "Electronic devices and gadgets", "Active": "true"},
        {"Name": "Test Books", "Description": "Books and educational materials", "Active": "true"},
        {"Name": "Test Clothing", "Description": "Apparel and fashion items", "Active": "false"},
        {"Name": "Test Home & Garden", "Description": "Home improvement supplies", "Active": "true"},
    ]
    
    # Sample products data
    products_data = [
        {"Product Name": "Test Laptop", "SKU": "TEST-001", "Price": "999.99", "Stock": "10", "Status": "active", "Category": "Electronics", "Description": "High-performance laptop"},
        {"Product Name": "Test Book", "SKU": "TEST-002", "Price": "29.99", "Stock": "50", "Status": "active", "Category": "Books", "Description": "Programming guide"},
        {"Product Name": "Test Shirt", "SKU": "TEST-003", "Price": "19.99", "Stock": "25", "Status": "active", "Category": "Clothing", "Description": "Cotton t-shirt"},
        {"Product Name": "Test Mouse", "SKU": "TEST-004", "Price": "15.99", "Stock": "100", "Status": "active", "Category": "Electronics", "Description": "Wireless mouse"},
    ]
    
    # Create CSV files
    with open('test_categories.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=categories_data[0].keys())
        writer.writeheader()
        writer.writerows(categories_data)
    
    with open('test_products.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=products_data[0].keys())
        writer.writeheader()
        writer.writerows(products_data)
    
    # Create Excel files
    try:
        categories_df = pd.DataFrame(categories_data)
        categories_df.to_excel('test_categories.xlsx', index=False, engine='openpyxl')
        
        products_df = pd.DataFrame(products_data)
        products_df.to_excel('test_products.xlsx', index=False, engine='openpyxl')
        
        print("✅ Created Excel files: test_categories.xlsx, test_products.xlsx")
    except ImportError:
        print("⚠️  pandas/openpyxl not available, skipping Excel file creation")
    
    print("✅ Created CSV files: test_categories.csv, test_products.csv")

if __name__ == "__main__":
    create_test_files()