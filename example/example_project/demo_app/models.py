from django.db import models
from django.contrib.auth.models import User


class Department(models.Model):
    """Department model for demonstrating foreign key relationships"""
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Employee(models.Model):
    """Employee model demonstrating various field types"""
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('on_leave', 'On Leave'),
    ]
    
    # Basic fields
    employee_id = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    
    # Choice fields
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    
    # Relationship fields
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='employees')
    manager = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subordinates')
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Date fields
    date_of_birth = models.DateField()
    hire_date = models.DateField()
    
    # Numeric fields
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    bonus_percentage = models.FloatField(default=0.0)
    
    # Boolean field
    is_remote = models.BooleanField(default=False)
    
    # Text fields
    address = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    
    # Auto fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['employee_id']
        indexes = [
            models.Index(fields=['department', 'status']),
            models.Index(fields=['hire_date']),
        ]
    
    def __str__(self):
        return f"{self.employee_id} - {self.first_name} {self.last_name}"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    @property
    def annual_salary(self):
        return float(self.salary) * 12


class Project(models.Model):
    """Project model for many-to-many relationships"""
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    budget = models.DecimalField(max_digits=12, decimal_places=2)
    is_active = models.BooleanField(default=True)
    
    # Many-to-many relationship
    team_members = models.ManyToManyField(Employee, through='ProjectAssignment', related_name='projects')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-start_date', 'name']
    
    def __str__(self):
        return f"{self.code} - {self.name}"


class ProjectAssignment(models.Model):
    """Through model for project-employee relationship"""
    ROLE_CHOICES = [
        ('lead', 'Project Lead'),
        ('developer', 'Developer'),
        ('tester', 'Tester'),
        ('analyst', 'Business Analyst'),
        ('designer', 'Designer'),
    ]
    
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    hours_allocated = models.IntegerField(default=0)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    
    class Meta:
        unique_together = ['project', 'employee']
        ordering = ['project', 'employee']
    
    def __str__(self):
        return f"{self.employee.full_name} - {self.project.name} ({self.role})"


class Task(models.Model):
    """Task model for demonstrating hierarchical data"""
    PRIORITY_CHOICES = [
        (1, 'Low'),
        (2, 'Medium'),
        (3, 'High'),
        (4, 'Critical'),
    ]
    
    STATUS_CHOICES = [
        ('todo', 'To Do'),
        ('in_progress', 'In Progress'),
        ('review', 'Review'),
        ('done', 'Done'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    assigned_to = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, related_name='tasks')
    
    priority = models.IntegerField(choices=PRIORITY_CHOICES, default=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='todo')
    
    estimated_hours = models.FloatField(default=0)
    actual_hours = models.FloatField(default=0)
    
    due_date = models.DateTimeField()
    completed_at = models.DateTimeField(null=True, blank=True)
    
    created_by = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, related_name='created_tasks')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-priority', 'due_date']
    
    def __str__(self):
        return self.title