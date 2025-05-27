"""
Development setup script to install django-jqgrid in development mode
"""
import os
import sys
import subprocess

# Get the path to the parent django-jqgrid directory
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

print(f"Installing django-jqgrid from: {parent_dir}")

# Install in development mode
subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-e', parent_dir])

print("django-jqgrid installed in development mode!")
print("You can now run: python manage.py runserver")