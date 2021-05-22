from user.models import BugClassification, BugReport
from django.contrib import admin

# Register your models here.
@admin.register(BugReport)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ("reporter_name","reporter_email","bug_description","created_at","updated_at","status")
    
    
@admin.register(BugClassification)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ("bug_report_id","created_at","tags")