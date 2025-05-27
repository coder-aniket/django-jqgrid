# Publishing django-jqgrid

## Publishing to TestPyPI (for testing)

### 1. Get TestPyPI Account
- Create account at https://test.pypi.org/
- Generate API token at https://test.pypi.org/manage/account/token/
- Save token starting with `pypi-...`

### 2. Publish to TestPyPI
```cmd
publish_to_testpypi.bat
```

### 3. Install from TestPyPI
```bash
# Install with dependencies from regular PyPI
pip install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/ django-jqgrid

# Or specify version
pip install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/ django-jqgrid==1.0.01
```

## Publishing to PyPI (production)

### 1. Get PyPI Account
- Create account at https://pypi.org/
- Generate API token at https://pypi.org/manage/account/token/
- Save token starting with `pypi-...`

### 2. Publish to PyPI
```cmd
publish_to_pypi.bat
```

### 3. Install from PyPI
```bash
# Install latest version
pip install django-jqgrid

# Install specific version
pip install django-jqgrid==1.0.01

# Upgrade existing installation
pip install --upgrade django-jqgrid
```

## Installing in Different Ways

### From PyPI (after publishing)
```bash
# Basic install
pip install django-jqgrid

# Install with specific version
pip install django-jqgrid==1.0.01

# Install in editable mode (for development)
pip install -e django-jqgrid
```

### From Git Repository
```bash
# Install directly from GitHub
pip install git+https://github.com/coder-aniket/django-jqgrid.git

# Install specific branch
pip install git+https://github.com/coder-aniket/django-jqgrid.git@main

# Install specific tag/release
pip install git+https://github.com/coder-aniket/django-jqgrid.git@v1.0.01
```

### From Local Directory
```bash
# Install from current directory
pip install .

# Install in editable/development mode
pip install -e .

# Install with extras (if defined)
pip install -e ".[dev]"
```

### From Downloaded Package
```bash
# Install from wheel file
pip install django_jqgrid-1.0.01-py3-none-any.whl

# Install from tar.gz file
pip install django-jqgrid-1.0.01.tar.gz
```

## Verifying Installation

After installation, verify it works:

```python
# In Python shell
import django_jqgrid
print(django_jqgrid.__version__)

# In Django project
# Add to INSTALLED_APPS in settings.py
INSTALLED_APPS = [
    # ...
    'django_jqgrid',
]

# Run Django commands
python manage.py collectstatic
python manage.py migrate django_jqgrid
```

## Troubleshooting

### If package not found on TestPyPI:
- Wait a few minutes for indexing
- Check the exact package name
- Ensure you're using `--index-url` flag

### If dependencies fail from TestPyPI:
- Use `--extra-index-url https://pypi.org/simple/` to get dependencies from regular PyPI

### If installation fails:
- Clear pip cache: `pip cache purge`
- Try with `--no-cache-dir` flag
- Check Python version compatibility