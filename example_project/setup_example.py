#!/usr/bin/env python
"""
Setup script for django-jqgrid example project.
This script automates the initial setup process.
"""
import os
import sys
import subprocess


def run_command(command, description):
    """Run a command and display status."""
    print(f"\n{'=' * 60}")
    print(f"📌 {description}")
    print(f"{'=' * 60}")
    
    try:
        if isinstance(command, str):
            command = command.split()
        
        result = subprocess.run(command, check=True)
        print("✅ Success!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False


def main():
    """Main setup function."""
    print("\n🚀 Django jqGrid Example Project Setup")
    print("=====================================\n")
    
    # Check Python version
    print("Checking Python version...")
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required!")
        sys.exit(1)
    print(f"✅ Python {sys.version.split()[0]} detected")
    
    # Change to project directory
    project_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(project_dir)
    print(f"📁 Working directory: {project_dir}")
    
    # Setup steps
    steps = [
        # Install dependencies
        (
            [sys.executable, "-m", "pip", "install", "-r", "requirements.txt"],
            "Installing project dependencies"
        ),
        
        # Install django-jqgrid from parent directory
        (
            [sys.executable, "-m", "pip", "install", "-e", ".."],
            "Installing django-jqgrid package (development mode)"
        ),
        
        # Run migrations
        (
            [sys.executable, "manage.py", "migrate"],
            "Running database migrations"
        ),
        
        # Load sample data
        (
            [sys.executable, "manage.py", "load_sample_data"],
            "Loading sample data"
        ),
        
        # Collect static files
        (
            [sys.executable, "manage.py", "collectstatic", "--noinput"],
            "Collecting static files"
        ),
    ]
    
    # Execute steps
    for command, description in steps:
        if not run_command(command, description):
            print("\n❌ Setup failed!")
            sys.exit(1)
    
    # Create superuser prompt
    print(f"\n{'=' * 60}")
    print("📌 Create superuser account (optional)")
    print(f"{'=' * 60}")
    
    create_superuser = input("\nWould you like to create a superuser account? (y/N): ")
    if create_superuser.lower() == 'y':
        subprocess.run([sys.executable, "manage.py", "createsuperuser"])
    
    # Success message
    print("\n" + "🎉" * 30)
    print("\n✅ Setup completed successfully!")
    print("\nYou can now run the development server:")
    print("  python manage.py runserver")
    print("\nThen visit:")
    print("  http://localhost:8000/")
    print("\n" + "🎉" * 30 + "\n")


if __name__ == "__main__":
    main()