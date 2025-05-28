# How to Host Documentation on Read the Docs

This guide explains how to host the django-jqgrid documentation on Read the Docs.

## Prerequisites

1. A GitHub/GitLab/Bitbucket account with your project repository
2. A Read the Docs account (free at readthedocs.org)
3. Documentation source files (already created in the `docs/` directory)

## Step-by-Step Instructions

### 1. Sign up for Read the Docs

1. Go to https://readthedocs.org
2. Click "Sign Up" and create an account
3. You can sign up using your GitHub/GitLab/Bitbucket account for easier integration

### 2. Import Your Project

1. Log in to Read the Docs
2. Click on "Import a Project" or go to https://readthedocs.org/dashboard/import/
3. If you connected your GitHub account, you'll see your repositories listed
4. Click "Import" next to your `django-jqgrid` repository
5. Fill in the project details:
   - **Name**: django-jqgrid
   - **Repository URL**: Your Git repository URL
   - **Repository type**: Git
   - **Default branch**: master (or main)
   - **Documentation type**: Sphinx Html

### 3. Configure Project Settings

After importing, configure your project:

1. Go to your project dashboard
2. Click "Admin" → "Settings"
3. Configure these settings:
   - **Description**: Add a brief description of django-jqgrid
   - **Homepage**: Your project's homepage or GitHub URL
   - **Documentation type**: Sphinx Html
   - **Language**: English
   - **Programming Language**: Python
   - **Tags**: Add relevant tags like "django", "jqgrid", "datagrid"

### 4. Advanced Settings

1. Go to "Admin" → "Advanced Settings"
2. Configure:
   - **Install Project**: Check this box
   - **Use system packages**: Check if you need system dependencies
   - **Requirements file**: `docs/requirements.txt`
   - **Python configuration file**: `docs/conf.py`
   - **Python interpreter**: CPython 3.x

### 5. Environment Variables (if needed)

If your documentation build requires environment variables:

1. Go to "Admin" → "Environment Variables"
2. Add any required variables (e.g., `DJANGO_SETTINGS_MODULE`)

### 6. Build Your Documentation

1. Go to "Builds" in your project dashboard
2. Click "Build Version" to trigger a manual build
3. Select the version/branch to build
4. Monitor the build progress

### 7. View Your Documentation

Once the build succeeds:
- Your documentation will be available at: `https://django-jqgrid.readthedocs.io`
- You can view different versions at: `https://django-jqgrid.readthedocs.io/en/latest/`

### 8. Set Up Webhooks (Automatic Builds)

To automatically build documentation when you push changes:

1. In Read the Docs, go to "Admin" → "Integrations"
2. Click "Add integration" → "GitHub incoming webhook" (or your platform)
3. Copy the webhook URL

For GitHub:
1. Go to your repository settings on GitHub
2. Click "Webhooks" → "Add webhook"
3. Paste the webhook URL from Read the Docs
4. Set content type to `application/json`
5. Select "Just the push event"
6. Save the webhook

### 9. Custom Domain (Optional)

To use a custom domain like `docs.yourproject.com`:

1. Go to "Admin" → "Domains"
2. Click "Add Domain"
3. Enter your custom domain
4. Add the provided CNAME record to your DNS settings

### 10. Build Badges

Add a documentation badge to your README:

```markdown
[![Documentation Status](https://readthedocs.org/projects/django-jqgrid/badge/?version=latest)](https://django-jqgrid.readthedocs.io/en/latest/?badge=latest)
```

## Troubleshooting

### Build Failures

If your build fails:

1. Check the build logs in the "Builds" section
2. Common issues:
   - Missing dependencies in `docs/requirements.txt`
   - Import errors in `conf.py`
   - Syntax errors in documentation files

### Local Testing

Test your documentation locally before pushing:

```bash
cd docs
pip install -r requirements.txt
make html
# Open _build/html/index.html in your browser
```

### Version Management

Read the Docs can build multiple versions:

1. Go to "Versions" in your project
2. Activate versions you want to build
3. Set the default version
4. Configure version privacy settings

## Configuration Files Summary

The following files are used by Read the Docs:

1. **`.readthedocs.yaml`** - Main configuration file
2. **`docs/conf.py`** - Sphinx configuration
3. **`docs/requirements.txt`** - Python dependencies for building docs
4. **`docs/index.rst`** - Documentation entry point
5. **`docs/Makefile`** - Local build configuration

## Best Practices

1. **Keep docs updated**: Update documentation with code changes
2. **Use semantic versioning**: Tag releases for version-specific docs
3. **Test locally**: Always test documentation builds locally first
4. **Monitor builds**: Check build status after pushing changes
5. **Use .readthedocs.yaml**: Version control your Read the Docs configuration

## Additional Resources

- [Read the Docs Documentation](https://docs.readthedocs.io/)
- [Sphinx Documentation](https://www.sphinx-doc.org/)
- [reStructuredText Primer](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html)
- [MyST Parser Guide](https://myst-parser.readthedocs.io/) (for Markdown support)