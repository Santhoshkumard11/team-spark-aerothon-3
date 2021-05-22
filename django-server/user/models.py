from django.db import models
from datetime import datetime

class BugReport(models.Model):
    
    status_choices = (("TODO","TODO"),
                      ("In Fix","In Fix"),
                      ("Resolved","Resolved"))
    
    reporter_name = models.CharField(max_length=50,help_text="reporter_name")
    reporter_email = models.CharField(max_length=50,help_text="reporter_name")
    reporter_phone_number = models.CharField(max_length=50, help_text="reporter_phone_number")
    bug_description = models.TextField(max_length=250,help_text='a short description', blank=True, null=True)
    created_at = models.DateTimeField(default=datetime.now())
    updated_at = models.DateTimeField(default=datetime.now())
    status = models.CharField(max_length=20, choices = status_choices, default = "TODO")
    
    
    def __str__(self):
        return self.reporter_name


class BugClassification(models.Model):
    
    bug_report_id = models.ForeignKey(BugReport,to_field="id",on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=datetime.now())
    tags = models.CharField(max_length=100)
    
    def __str__(self):
        return self.bug_report_id