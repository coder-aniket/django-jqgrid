from django.urls import path
from . import views

app_name = 'demo_app'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('employees/', views.EmployeeGridView.as_view(), name='employee_grid'),
    path('departments/', views.DepartmentGridView.as_view(), name='department_grid'),
    path('projects/', views.ProjectGridView.as_view(), name='project_grid'),
    path('tasks/', views.TaskGridView.as_view(), name='task_grid'),
    path('advanced/', views.AdvancedDemoView.as_view(), name='advanced_demo'),
]