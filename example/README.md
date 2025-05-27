# Django jqGrid Example Project

This is a complete Django project demonstrating the features and capabilities of the `django-jqgrid` package.

**Note:** This example uses the local development version of django-jqgrid from the parent directory. The settings.py file automatically adds the parent directory to the Python path.

## Features Demonstrated

- **Basic CRUD Operations**: Create, Read, Update, Delete records
- **Field Types**: Text, Email, Numbers, Dates, Booleans, Choices
- **Relationships**: ForeignKey, OneToOne, ManyToMany
- **Advanced Features**: Import/Export, Filtering, Sorting, Pagination
- **Custom Formatting**: Currency, dates, custom cell rendering
- **Multiple Grids**: Multiple grids on same page
- **Responsive Design**: Bootstrap 4 integration

## Project Structure

```
example_project/
├── demo_app/           # Demo application with models and views
│   ├── models.py      # Employee, Department, Project, Task models
│   ├── views.py       # Grid demonstration views
│   └── templates/     # Grid templates
├── example_project/    # Django project settings
├── templates/          # Base templates
├── manage.py          # Django management script
└── requirements.txt   # Project dependencies
```

## Models Overview

1. **Department**: Simple model with basic fields
2. **Employee**: Complex model with various field types and relationships
3. **Project**: Demonstrates ManyToMany relationships and date handling
4. **Task**: Shows choice fields, priorities, and status tracking

## Quick Start

### 1. Install Dependencies

```bash
cd example/example_project
pip install -r requirements.txt
```

### 2. Setup Database

```bash
python manage.py migrate
python manage.py migrate django_jqgrid
```

### 3. Create Superuser

```bash
python manage.py createsuperuser
```

### 4. Load Sample Data (Optional)

```bash
python manage.py shell
```

```python
from demo_app.models import Department, Employee, Project, Task
from datetime import date, datetime, timedelta
import random

# Create Departments
hr = Department.objects.create(name="Human Resources", code="HR", description="HR Department")
it = Department.objects.create(name="Information Technology", code="IT", description="IT Department")
sales = Department.objects.create(name="Sales", code="SALES", description="Sales Department")

# Create Employees
employees = []
for i in range(1, 21):
    emp = Employee.objects.create(
        employee_id=f"EMP{i:03d}",
        first_name=f"First{i}",
        last_name=f"Last{i}",
        email=f"employee{i}@example.com",
        phone=f"555-{i:04d}",
        gender=random.choice(['M', 'F']),
        department=random.choice([hr, it, sales]),
        date_of_birth=date(1980 + i % 20, 1, 1),
        hire_date=date(2020, 1, 1) + timedelta(days=i*30),
        salary=50000 + (i * 5000),
        is_remote=bool(i % 3),
        status='active' if i % 5 else 'inactive'
    )
    employees.append(emp)

# Create Projects
for i in range(1, 6):
    project = Project.objects.create(
        name=f"Project {i}",
        code=f"PRJ{i:03d}",
        description=f"Description for project {i}",
        start_date=date.today() - timedelta(days=i*30),
        budget=100000 * i,
        is_active=bool(i % 2)
    )
    # Add team members
    project.team_members.add(*random.sample(employees, 5))

print("Sample data created successfully!")
```

### 5. Run the Development Server

```bash
python manage.py runserver
```

### 6. Access the Application

- **Main Application**: http://localhost:8000/
- **Django Admin**: http://localhost:8000/admin/

## Usage Examples

### Basic Grid

```django
{% load jqgrid_tags %}

<!-- Include CSS -->
{% jqgrid_css %}

<!-- Create a simple grid -->
{% jqgrid "my_grid" "demo_app" "employee" "Employee List" %}

<!-- Include JavaScript -->
{% jqgrid_js %}
```

### Grid with Custom Options

```django
{% jqgrid "project_grid" "demo_app" "project" "Active Projects" 
    include_import_export=True %}
```

### Multiple Grids on Same Page

```django
<!-- First Grid -->
{% jqgrid "grid1" "demo_app" "department" "Departments" %}

<!-- Second Grid -->
{% jqgrid "grid2" "demo_app" "employee" "Employees" %}
```

## Available URLs

- `/` - Home page with statistics and overview
- `/employees/` - Employee management grid
- `/departments/` - Department management grid
- `/projects/` - Project management grid
- `/tasks/` - Task management grid
- `/advanced/` - Advanced features demonstration

## Tips for Testing

1. **CRUD Operations**: Try adding, editing, and deleting records
2. **Search**: Use the search toolbar (toggle with search button)
3. **Filtering**: Click on column search inputs to filter data
4. **Sorting**: Click column headers to sort
5. **Multi-select**: Select multiple rows for bulk operations
6. **Import/Export**: Use the import/export buttons in the toolbar
7. **Pagination**: Navigate through pages using the pager

## Customization

The example shows basic usage. You can customize:

- Column definitions
- Formatters for specific fields
- Custom buttons and actions
- Event handlers
- Validation rules
- Search operators

Check the `advanced_demo.html` template for customization examples.

## Troubleshooting

1. **Static files not loading**: Run `python manage.py collectstatic`
2. **jqGrid not found**: Ensure `django_jqgrid` is in INSTALLED_APPS
3. **API errors**: Check browser console for detailed error messages
4. **Database errors**: Ensure migrations are run: `python manage.py migrate`

## License

This example project is provided as-is for demonstration purposes.