#!/usr/bin/env python
"""
Setup script for django-jqgrid demo project.
This script sets up the database and creates sample data for demonstration.
"""

import os
import sys
import django
from django.core.management import execute_from_command_line

def setup_django():
    """Setup Django environment"""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'example_project.settings')
    django.setup()

def run_migrations():
    """Run database migrations"""
    print("Running database migrations...")
    execute_from_command_line(['manage.py', 'migrate'])

def create_superuser():
    """Create a superuser if one doesn't exist"""
    from django.contrib.auth.models import User
    
    if not User.objects.filter(username='admin').exists():
        print("Creating superuser 'admin' with password 'admin123'...")
        User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='admin123'
        )
        print("Superuser created successfully!")
    else:
        print("Superuser 'admin' already exists.")

def create_sample_data():
    """Create sample data for demonstration"""
    from demo_app.models import Department, Employee, Project, Task
    from django.utils import timezone
    from datetime import datetime, timedelta
    import random
    
    print("Creating sample data...")
    
    # Create departments
    departments_data = [
        {'name': 'Engineering', 'description': 'Software development and technical operations'},
        {'name': 'Marketing', 'description': 'Product marketing and customer acquisition'},
        {'name': 'Sales', 'description': 'Revenue generation and client relationships'},
        {'name': 'HR', 'description': 'Human resources and talent management'},
        {'name': 'Finance', 'description': 'Financial planning and accounting'},
    ]
    
    departments = []
    for dept_data in departments_data:
        dept, created = Department.objects.get_or_create(
            name=dept_data['name'],
            defaults={'description': dept_data['description']}
        )
        departments.append(dept)
        if created:
            print(f"Created department: {dept.name}")
    
    # Create employees
    employees_data = [
        {'name': 'John Smith', 'email': 'john.smith@company.com', 'phone': '+1-555-0101', 'department': 'Engineering'},
        {'name': 'Jane Doe', 'email': 'jane.doe@company.com', 'phone': '+1-555-0102', 'department': 'Marketing'},
        {'name': 'Bob Johnson', 'email': 'bob.johnson@company.com', 'phone': '+1-555-0103', 'department': 'Sales'},
        {'name': 'Alice Brown', 'email': 'alice.brown@company.com', 'phone': '+1-555-0104', 'department': 'Engineering'},
        {'name': 'Charlie Wilson', 'email': 'charlie.wilson@company.com', 'phone': '+1-555-0105', 'department': 'HR'},
        {'name': 'Diana Miller', 'email': 'diana.miller@company.com', 'phone': '+1-555-0106', 'department': 'Finance'},
        {'name': 'Eva Garcia', 'email': 'eva.garcia@company.com', 'phone': '+1-555-0107', 'department': 'Marketing'},
        {'name': 'Frank Davis', 'email': 'frank.davis@company.com', 'phone': '+1-555-0108', 'department': 'Engineering'},
        {'name': 'Grace Lee', 'email': 'grace.lee@company.com', 'phone': '+1-555-0109', 'department': 'Sales'},
        {'name': 'Henry Taylor', 'email': 'henry.taylor@company.com', 'phone': '+1-555-0110', 'department': 'HR'},
    ]
    
    employees = []
    for emp_data in employees_data:
        dept = Department.objects.get(name=emp_data['department'])
        emp, created = Employee.objects.get_or_create(
            email=emp_data['email'],
            defaults={
                'name': emp_data['name'],
                'phone': emp_data['phone'],
                'department': dept,
                'hire_date': timezone.now().date() - timedelta(days=random.randint(30, 1000)),
                'is_active': True
            }
        )
        employees.append(emp)
        if created:
            print(f"Created employee: {emp.name}")
    
    # Create projects
    projects_data = [
        {'name': 'Website Redesign', 'description': 'Complete redesign of company website', 'status': 'active'},
        {'name': 'Mobile App Development', 'description': 'New mobile application for customers', 'status': 'active'},
        {'name': 'Database Migration', 'description': 'Migrate to new database system', 'status': 'planning'},
        {'name': 'Marketing Campaign Q4', 'description': 'Fourth quarter marketing initiative', 'status': 'active'},
        {'name': 'Employee Training Program', 'description': 'New employee onboarding system', 'status': 'completed'},
        {'name': 'Sales Process Automation', 'description': 'Automate sales workflow', 'status': 'planning'},
    ]
    
    projects = []
    for proj_data in projects_data:
        proj, created = Project.objects.get_or_create(
            name=proj_data['name'],
            defaults={
                'description': proj_data['description'],
                'status': proj_data['status'],
                'start_date': timezone.now().date() - timedelta(days=random.randint(10, 100)),
                'end_date': timezone.now().date() + timedelta(days=random.randint(30, 200)),
                'manager': random.choice(employees)
            }
        )
        projects.append(proj)
        if created:
            print(f"Created project: {proj.name}")
    
    # Create tasks
    task_names = [
        'Research and Analysis', 'Design Mockups', 'Database Setup', 'Frontend Development',
        'Backend Development', 'Testing', 'Documentation', 'Code Review',
        'Deployment', 'Bug Fixes', 'Performance Optimization', 'User Training',
        'Quality Assurance', 'Integration Testing', 'Security Audit', 'Data Migration'
    ]
    
    priorities = ['low', 'medium', 'high', 'urgent']
    statuses = ['pending', 'in_progress', 'completed', 'cancelled']
    
    for i in range(25):
        task_name = f"{random.choice(task_names)} #{i+1}"
        task, created = Task.objects.get_or_create(
            title=task_name,
            defaults={
                'description': f"Detailed description for {task_name}",
                'project': random.choice(projects),
                'assignee': random.choice(employees),
                'priority': random.choice(priorities),
                'status': random.choice(statuses),
                'estimated_hours': random.randint(2, 40),
                'actual_hours': random.randint(1, 35) if random.choice([True, False]) else None,
                'due_date': timezone.now().date() + timedelta(days=random.randint(1, 60)),
                'created_at': timezone.now() - timedelta(days=random.randint(1, 30))
            }
        )
        if created:
            print(f"Created task: {task.title}")
    
    print("Sample data creation completed!")

def main():
    """Main setup function"""
    print("Setting up django-jqgrid demo project...")
    print("=" * 50)
    
    # Setup Django
    setup_django()
    
    # Run migrations
    run_migrations()
    
    # Create superuser
    create_superuser()
    
    # Create sample data
    create_sample_data()
    
    print("=" * 50)
    print("Setup completed successfully!")
    print()
    print("You can now run the development server:")
    print("  python manage.py runserver")
    print()
    print("Login credentials:")
    print("  Username: admin")
    print("  Password: admin123")
    print()
    print("Demo URLs:")
    print("  http://127.0.0.1:8000/ - Home page with grid examples")
    print("  http://127.0.0.1:8000/admin/ - Django admin interface")
    print("  http://127.0.0.1:8000/api/ - API endpoints")

if __name__ == '__main__':
    main()