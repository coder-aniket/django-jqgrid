from django.contrib import admin
from .models import Department, Employee, Project, ProjectAssignment, Task


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'created_at']
    search_fields = ['name', 'code']


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['employee_id', 'first_name', 'last_name', 'email', 'department', 'status']
    list_filter = ['status', 'department', 'is_remote', 'gender']
    search_fields = ['employee_id', 'first_name', 'last_name', 'email']
    date_hierarchy = 'hire_date'


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'start_date', 'budget', 'is_active']
    list_filter = ['is_active', 'start_date']
    search_fields = ['code', 'name']


@admin.register(ProjectAssignment)
class ProjectAssignmentAdmin(admin.ModelAdmin):
    list_display = ['project', 'employee', 'role', 'hours_allocated']
    list_filter = ['role', 'project']
    autocomplete_fields = ['project', 'employee']


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'project', 'assigned_to', 'priority', 'status', 'due_date']
    list_filter = ['status', 'priority', 'project']
    search_fields = ['title', 'description']
    date_hierarchy = 'due_date'