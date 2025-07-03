#!/usr/bin/env python3
"""
Django-jqGrid Package Publishing Tool

A comprehensive tool for publishing the django-jqgrid package to PyPI and TestPyPI.
This script handles version management, building, checking, and uploading packages.
"""
import os
import sys
import subprocess
import argparse
import configparser
import re
from pathlib import Path
from typing import Optional, Dict, Any
import json


class Colors:
    """ANSI color codes for terminal output"""
    RED = '\033[0;31m'
    GREEN = '\033[0;32m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    PURPLE = '\033[0;35m'
    CYAN = '\033[0;36m'
    WHITE = '\033[1;37m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    NC = '\033[0m'  # No Color


class PackagePublisher:
    def __init__(self):
        self.base_dir = Path(__file__).parent
        self.config_file = self.base_dir / ".pypi_tokens.conf"
        self.setup_py = self.base_dir / "setup.py"
        self.pyproject_toml = self.base_dir / "pyproject.toml"
        self.init_file = self.base_dir / "django_jqgrid" / "__init__.py"
        self.tokens = {}
        
    def print_colored(self, message: str, color: str = Colors.WHITE):
        """Print colored message to terminal"""
        print(f"{color}{message}{Colors.NC}")
    
    def print_header(self, title: str):
        """Print formatted header"""
        print("\n" + "=" * 60)
        self.print_colored(f"  {title}", Colors.BOLD + Colors.CYAN)
        print("=" * 60)
    
    def run_command(self, command: str, check: bool = True, capture_output: bool = False) -> subprocess.CompletedProcess:
        """Run shell command with error handling"""
        self.print_colored(f"📋 Running: {command}", Colors.BLUE)
        
        try:
            result = subprocess.run(
                command,
                shell=True,
                check=check,
                capture_output=capture_output,
                text=True,
                cwd=self.base_dir
            )
            return result
        except subprocess.CalledProcessError as e:
            self.print_colored(f"❌ Command failed: {e}", Colors.RED)
            if capture_output and e.stdout:
                print(e.stdout)
            if capture_output and e.stderr:
                print(e.stderr)
            raise
    
    def create_token_config(self):
        """Create token configuration file if it doesn't exist"""
        if self.config_file.exists():
            return
        
        self.print_colored("🔧 Creating token configuration file...", Colors.YELLOW)
        
        config_content = """# PyPI Token Configuration
# Add your actual tokens here:
# You can get tokens from:
# - PyPI: https://pypi.org/manage/account/token/
# - TestPyPI: https://test.pypi.org/manage/account/token/

[tokens]
PYPI_TOKEN = pypi-YOUR_TOKEN_HERE
TESTPYPI_TOKEN = pypi-YOUR_TEST_TOKEN_HERE

# Example format:
# PYPI_TOKEN = pypi-AgENdGVzdC5weXBpLm9yZwIkYjQyN...
# TESTPYPI_TOKEN = pypi-AgENdGVzdC5weXBpLm9yZwIkYjQyN...
"""
        
        with open(self.config_file, 'w') as f:
            f.write(config_content)
        
        self.print_colored(f"✅ Created {self.config_file}", Colors.GREEN)
        self.print_colored(f"⚠️  Please edit {self.config_file} with your actual tokens!", Colors.YELLOW)
        return False
    
    def load_tokens(self) -> bool:
        """Load tokens from configuration file"""
        if not self.config_file.exists():
            return self.create_token_config()
        
        config = configparser.ConfigParser()
        config.read(self.config_file)
        
        if 'tokens' not in config:
            self.print_colored("❌ [tokens] section not found in config file", Colors.RED)
            return False
        
        self.tokens = dict(config['tokens'])
        
        # Check if tokens are still placeholder values
        if (self.tokens.get('pypi_token', '').endswith('YOUR_TOKEN_HERE') or 
            self.tokens.get('testpypi_token', '').endswith('YOUR_TEST_TOKEN_HERE')):
            self.print_colored(f"❌ Please update tokens in {self.config_file}", Colors.RED)
            return False
        
        return True
    
    def get_current_version(self) -> str:
        """Get current version from __init__.py"""
        if not self.init_file.exists():
            self.print_colored("❌ django_jqgrid/__init__.py not found", Colors.RED)
            sys.exit(1)
        
        with open(self.init_file, 'r') as f:
            content = f.read()
        
        version_match = re.search(r"__version__\s*=\s*['\"]([^'\"]+)['\"]", content)
        if not version_match:
            self.print_colored("❌ Version not found in __init__.py", Colors.RED)
            sys.exit(1)
        
        return version_match.group(1)
    
    def set_version(self, new_version: str):
        """Update version in __init__.py"""
        with open(self.init_file, 'r') as f:
            content = f.read()
        
        new_content = re.sub(
            r"__version__\s*=\s*['\"][^'\"]+['\"]",
            f"__version__ = '{new_version}'",
            content
        )
        
        with open(self.init_file, 'w') as f:
            f.write(new_content)
        
        self.print_colored(f"✅ Version updated to {new_version}", Colors.GREEN)
    
    def bump_version(self, bump_type: str, custom_version: Optional[str] = None) -> str:
        """Bump version based on type or set custom version"""
        current = self.get_current_version()
        
        if custom_version:
            new_version = custom_version
        else:
            parts = current.split('.')
            if len(parts) != 3:
                self.print_colored("❌ Version format should be X.Y.Z", Colors.RED)
                sys.exit(1)
            
            major, minor, patch = map(int, parts)
            
            if bump_type == 'major':
                new_version = f"{major + 1}.0.0"
            elif bump_type == 'minor':
                new_version = f"{major}.{minor + 1}.0"
            elif bump_type == 'patch':
                new_version = f"{major}.{minor}.{patch + 1}"
            else:
                self.print_colored(f"❌ Invalid bump type: {bump_type}", Colors.RED)
                sys.exit(1)
        
        self.print_colored(f"📈 Bumping version: {current} → {new_version}", Colors.CYAN)
        self.set_version(new_version)
        return new_version
    
    def clean_build(self):
        """Clean previous build artifacts"""
        self.print_colored("🧹 Cleaning previous builds...", Colors.YELLOW)
        
        # Remove build directories
        for dir_name in ['dist', 'build', '*.egg-info']:
            self.run_command(f"rm -rf {dir_name}", check=False)
        
        # Also remove __pycache__
        self.run_command("find . -type d -name '__pycache__' -exec rm -rf {} + 2>/dev/null || true", check=False)
        self.run_command("find . -name '*.pyc' -delete 2>/dev/null || true", check=False)
        
        self.print_colored("✅ Build artifacts cleaned", Colors.GREEN)
    
    def build_package(self):
        """Build the package"""
        self.print_colored("🏗️  Building package...", Colors.YELLOW)
        
        # Check if we have build tools
        try:
            self.run_command("python -m build --version", capture_output=True)
        except subprocess.CalledProcessError:
            self.print_colored("📦 Installing build tools...", Colors.BLUE)
            self.run_command("pip install build")
        
        # Build the package
        self.run_command("python -m build")
        self.print_colored("✅ Package built successfully", Colors.GREEN)
    
    def check_package(self):
        """Check package with twine"""
        self.print_colored("🔍 Checking package...", Colors.YELLOW)
        
        # Check if we have twine
        try:
            self.run_command("python -m twine --version", capture_output=True)
        except subprocess.CalledProcessError:
            self.print_colored("📦 Installing twine...", Colors.BLUE)
            self.run_command("pip install twine")
        
        # Check the package
        self.run_command("python -m twine check dist/*")
        self.print_colored("✅ Package check passed", Colors.GREEN)
    
    def upload_to_pypi(self):
        """Upload package to PyPI"""
        if 'pypi_token' not in self.tokens:
            self.print_colored("❌ PyPI token not found", Colors.RED)
            return False
        
        self.print_colored("🚀 Uploading to PyPI...", Colors.YELLOW)
        
        try:
            self.run_command(
                f"python -m twine upload dist/* -u __token__ -p {self.tokens['pypi_token']}"
            )
            version = self.get_current_version()
            self.print_colored("🎉 Successfully uploaded to PyPI!", Colors.GREEN)
            self.print_colored(f"📦 Install with: pip install django-jqgrid=={version}", Colors.CYAN)
            return True
        except subprocess.CalledProcessError:
            self.print_colored("❌ Upload to PyPI failed", Colors.RED)
            self.print_colored("💡 Common issues:", Colors.YELLOW)
            self.print_colored("   - Version already exists (bump version first)", Colors.YELLOW)
            self.print_colored("   - Invalid token (check .pypi_tokens.conf)", Colors.YELLOW)
            self.print_colored("   - Network issues", Colors.YELLOW)
            return False
    
    def upload_to_testpypi(self):
        """Upload package to TestPyPI"""
        if 'testpypi_token' not in self.tokens:
            self.print_colored("❌ TestPyPI token not found", Colors.RED)
            return False
        
        self.print_colored("🧪 Uploading to TestPyPI...", Colors.YELLOW)
        
        try:
            self.run_command(
                f"python -m twine upload --repository testpypi dist/* -u __token__ -p {self.tokens['testpypi_token']}"
            )
            version = self.get_current_version()
            self.print_colored("🎉 Successfully uploaded to TestPyPI!", Colors.GREEN)
            self.print_colored(f"📦 Install with: pip install -i https://test.pypi.org/simple/ django-jqgrid=={version}", Colors.CYAN)
            return True
        except subprocess.CalledProcessError:
            self.print_colored("❌ Upload to TestPyPI failed", Colors.RED)
            self.print_colored("💡 Common issues:", Colors.YELLOW)
            self.print_colored("   - Version already exists (bump version first)", Colors.YELLOW)
            self.print_colored("   - Invalid token (check .pypi_tokens.conf)", Colors.YELLOW)
            self.print_colored("   - Network issues", Colors.YELLOW)
            return False
    
    def show_version_history(self):
        """Show version history from PyPI and git tags"""
        self.print_colored("📜 Version History", Colors.CYAN)
        
        # Try to get PyPI versions
        try:
            result = self.run_command("pip index versions django-jqgrid", capture_output=True, check=False)
            if result.returncode == 0:
                print("\n🐍 PyPI Versions:")
                for line in result.stdout.split('\n')[:10]:
                    if line.strip() and 'WARNING' not in line:
                        print(f"  {line}")
        except:
            self.print_colored("⚠️  Could not fetch PyPI versions", Colors.YELLOW)
        
        # Try to get git tags
        try:
            result = self.run_command("git tag -l 'v*' --sort=-version:refname", capture_output=True, check=False)
            if result.returncode == 0 and result.stdout.strip():
                print("\n🏷️  Git Tags:")
                for line in result.stdout.split('\n')[:10]:
                    if line.strip():
                        print(f"  {line}")
        except:
            self.print_colored("⚠️  Could not fetch git tags", Colors.YELLOW)
    
    def interactive_menu(self):
        """Interactive menu for package publishing"""
        if not self.load_tokens():
            return
        
        current_version = self.get_current_version()
        
        while True:
            self.print_header("Django-jqGrid Package Publisher")
            print(f"\n📦 Current version: {Colors.GREEN}{current_version}{Colors.NC}")
            print(f"📁 Package directory: {self.base_dir}")
            
            print(f"\n{Colors.BOLD}What would you like to do?{Colors.NC}")
            print(f"{Colors.CYAN}1.{Colors.NC} Quick publish to PyPI (current version)")
            print(f"{Colors.CYAN}2.{Colors.NC} Quick publish to TestPyPI (current version)")
            print(f"{Colors.CYAN}3.{Colors.NC} Bump version and publish")
            print(f"{Colors.CYAN}4.{Colors.NC} Build only (no upload)")
            print(f"{Colors.CYAN}5.{Colors.NC} Check package")
            print(f"{Colors.CYAN}6.{Colors.NC} Clean build artifacts")
            print(f"{Colors.CYAN}7.{Colors.NC} Show version history")
            print(f"{Colors.CYAN}8.{Colors.NC} Exit")
            
            try:
                choice = input(f"\n{Colors.BOLD}Enter your choice (1-8):{Colors.NC} ").strip()
            except KeyboardInterrupt:
                print(f"\n{Colors.YELLOW}👋 Goodbye!{Colors.NC}")
                break
            except EOFError:
                print(f"\n{Colors.YELLOW}⚠️  Input stream closed. Exiting...{Colors.NC}")
                break
            
            if choice == '1':
                self.quick_publish_pypi()
            elif choice == '2':
                self.quick_publish_testpypi()
            elif choice == '3':
                self.bump_and_publish()
            elif choice == '4':
                self.build_only()
            elif choice == '5':
                self.check_only()
            elif choice == '6':
                self.clean_build()
            elif choice == '7':
                self.show_version_history()
            elif choice == '8':
                self.print_colored("👋 Goodbye!", Colors.GREEN)
                break
            else:
                self.print_colored("❌ Invalid choice! Please enter 1-8.", Colors.RED)
            
            try:
                input(f"\n{Colors.YELLOW}Press Enter to continue...{Colors.NC}")
            except (EOFError, KeyboardInterrupt):
                break
    
    def quick_publish_pypi(self):
        """Quick publish to PyPI"""
        self.print_header(f"Publishing to PyPI - Version {self.get_current_version()}")
        self.clean_build()
        self.build_package()
        self.check_package()
        self.upload_to_pypi()
    
    def quick_publish_testpypi(self):
        """Quick publish to TestPyPI"""
        self.print_header(f"Publishing to TestPyPI - Version {self.get_current_version()}")
        self.clean_build()
        self.build_package()
        self.check_package()
        self.upload_to_testpypi()
    
    def bump_and_publish(self):
        """Bump version and publish"""
        self.print_header("Version Bump and Publish")
        
        print(f"\n{Colors.BOLD}Version bump options:{Colors.NC}")
        print(f"{Colors.CYAN}1.{Colors.NC} Patch (1.0.3 → 1.0.4)")
        print(f"{Colors.CYAN}2.{Colors.NC} Minor (1.0.3 → 1.1.0)")
        print(f"{Colors.CYAN}3.{Colors.NC} Major (1.0.3 → 2.0.0)")
        print(f"{Colors.CYAN}4.{Colors.NC} Custom version")
        print(f"{Colors.CYAN}5.{Colors.NC} Back to main menu")
        
        try:
            bump_choice = input(f"\n{Colors.BOLD}Enter your choice (1-5):{Colors.NC} ").strip()
        except (EOFError, KeyboardInterrupt):
            self.print_colored("\n⚠️  Input interrupted.", Colors.YELLOW)
            return
        
        if bump_choice == '5':
            return
        
        new_version = None
        if bump_choice == '1':
            new_version = self.bump_version('patch')
        elif bump_choice == '2':
            new_version = self.bump_version('minor')
        elif bump_choice == '3':
            new_version = self.bump_version('major')
        elif bump_choice == '4':
            try:
                custom = input(f"{Colors.BOLD}Enter new version:{Colors.NC} ").strip()
                if custom:
                    new_version = self.bump_version('custom', custom)
            except (EOFError, KeyboardInterrupt):
                self.print_colored("\n⚠️  Input interrupted.", Colors.YELLOW)
                return
        else:
            self.print_colored("❌ Invalid choice!", Colors.RED)
            return
        
        if not new_version:
            return
        
        print(f"\n{Colors.BOLD}Where to publish?{Colors.NC}")
        print(f"{Colors.CYAN}1.{Colors.NC} PyPI")
        print(f"{Colors.CYAN}2.{Colors.NC} TestPyPI")
        print(f"{Colors.CYAN}3.{Colors.NC} Both (TestPyPI first)")
        print(f"{Colors.CYAN}4.{Colors.NC} Cancel")
        
        try:
            pub_choice = input(f"\n{Colors.BOLD}Enter your choice (1-4):{Colors.NC} ").strip()
        except (EOFError, KeyboardInterrupt):
            self.print_colored("\n⚠️  Input interrupted.", Colors.YELLOW)
            return
        
        if pub_choice == '4':
            return
        
        self.clean_build()
        self.build_package()
        self.check_package()
        
        if pub_choice == '1':
            self.upload_to_pypi()
        elif pub_choice == '2':
            self.upload_to_testpypi()
        elif pub_choice == '3':
            if self.upload_to_testpypi():
                try:
                    continue_to_pypi = input(f"\n{Colors.BOLD}Continue to PyPI? (y/n):{Colors.NC} ").strip().lower()
                    if continue_to_pypi == 'y':
                        self.upload_to_pypi()
                except (EOFError, KeyboardInterrupt):
                    self.print_colored("\n⚠️  Input interrupted. Skipping PyPI upload.", Colors.YELLOW)
                    self.print_colored("💡 To upload to PyPI later, run the script again and choose option 1", Colors.CYAN)
    
    def build_only(self):
        """Build package without uploading"""
        self.print_header("Build Package")
        self.clean_build()
        self.build_package()
        self.check_package()
        
        # Show built files
        dist_dir = self.base_dir / "dist"
        if dist_dir.exists():
            self.print_colored("📦 Built files:", Colors.CYAN)
            for file in dist_dir.iterdir():
                print(f"  {file.name}")
    
    def check_only(self):
        """Check existing package"""
        self.print_header("Check Package")
        dist_dir = self.base_dir / "dist"
        if not dist_dir.exists() or not list(dist_dir.iterdir()):
            self.print_colored("❌ No dist directory found. Build first!", Colors.RED)
            return
        
        self.check_package()


def main():
    parser = argparse.ArgumentParser(description='Django-jqGrid Package Publisher')
    parser.add_argument('--version', action='version', version='1.0.0')
    parser.add_argument('--non-interactive', action='store_true', 
                       help='Run in non-interactive mode')
    parser.add_argument('--target', choices=['pypi', 'testpypi', 'both'], 
                       help='Publishing target')
    parser.add_argument('--bump', choices=['patch', 'minor', 'major'], 
                       help='Version bump type')
    parser.add_argument('--build-only', action='store_true', 
                       help='Build package without uploading')
    parser.add_argument('--check-only', action='store_true', 
                       help='Check existing package without building')
    parser.add_argument('--clean', action='store_true', 
                       help='Clean build artifacts')
    
    args = parser.parse_args()
    
    publisher = PackagePublisher()
    
    if args.clean:
        publisher.clean_build()
        return
    
    if args.check_only:
        if not publisher.load_tokens():
            return
        publisher.check_only()
        return
    
    if args.build_only:
        if not publisher.load_tokens():
            return
        publisher.build_only()
        return
    
    if args.non_interactive:
        if not publisher.load_tokens():
            return
        
        if args.bump:
            publisher.bump_version(args.bump)
        
        publisher.clean_build()
        publisher.build_package()
        publisher.check_package()
        
        if args.target == 'pypi':
            publisher.upload_to_pypi()
        elif args.target == 'testpypi':
            publisher.upload_to_testpypi()
        elif args.target == 'both':
            if publisher.upload_to_testpypi():
                publisher.upload_to_pypi()
    else:
        # Interactive mode
        publisher.interactive_menu()


if __name__ == "__main__":
    main()