from setuptools import setup, find_packages

setup(
    name="django-jqgrid",
    version="0.1.0",
    packages=find_packages(),
    include_package_data=True,
    description="A Django app providing enhanced jqGrid integration",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    author="Coder-Aniket",
    author_email="coder.aniketp@gmail.com",
    url="https://github.com/coder-aniket/django-jqgrid",
    classifiers=[
        "Development Status :: 4 - Beta",
        "Environment :: Web Environment",
        "Framework :: Django",
        "Framework :: Django :: 3.2",
        "Framework :: Django :: 4.0",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
    ],
    install_requires=[
        "Django>=3.2",
        "djangorestframework>=3.12.0",
    ],
    python_requires=">=3.8",
)