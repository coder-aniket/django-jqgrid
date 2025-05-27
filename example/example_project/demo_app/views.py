from django.shortcuts import render
from django.views.generic import TemplateView
from .models import Employee, Department, Project, Task


class HomeView(TemplateView):
    """Home page with links to all demo grids"""
    template_name = 'demo_app/home.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['stats'] = {
            'employees': Employee.objects.count(),
            'departments': Department.objects.count(),
            'projects': Project.objects.count(),
            'tasks': Task.objects.count(),
        }
        return context


class EmployeeGridView(TemplateView):
    """Employee grid demonstration"""
    template_name = 'demo_app/employee_grid.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Employee Management'
        context['grid_id'] = 'employee_grid'
        return context


class DepartmentGridView(TemplateView):
    """Department grid demonstration"""
    template_name = 'demo_app/department_grid.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Department Management'
        context['grid_id'] = 'department_grid'
        return context


class ProjectGridView(TemplateView):
    """Project grid demonstration"""
    template_name = 'demo_app/project_grid.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Project Management'
        context['grid_id'] = 'project_grid'
        return context


class TaskGridView(TemplateView):
    """Task grid demonstration"""
    template_name = 'demo_app/task_grid.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Task Management'
        context['grid_id'] = 'task_grid'
        return context


class AdvancedDemoView(TemplateView):
    """Advanced features demonstration"""
    template_name = 'demo_app/advanced_demo.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Advanced jqGrid Features'
        return context