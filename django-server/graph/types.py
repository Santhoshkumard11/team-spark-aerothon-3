import graphene
from graphene_django.types import DjangoObjectType

from user.models import BugReport


class BugReportField(DjangoObjectType):
    class Meta:
        model = BugReport
        fields = ("id",'reporter_name', 'reporter_email',"reporter_phone_number","bug_description","created_at","updated_at","status")
        

class LeaderboardField(DjangoObjectType):
    
    class Meta:
        model = BugReport
        fields = ("id", 'reporter_name','reporter_email',"bug_description")

class UpdateBugReportInput(graphene.InputObjectType):
    
    id = graphene.ID()
    status = graphene.String()