from graph.utils import get_leaderboard
from graph.types import BugReportField, LeaderboardField, UpdateBugReportInput
from user.models import BugReport
import graphene

from graphql_auth import mutations
from graphql_auth.schema import UserQuery, MeQuery


class AuthMutation(graphene.ObjectType):
   token_auth = mutations.ObtainJSONWebToken.Field(description="login page")
   verify_token = mutations.VerifyToken.Field()
   refresh_token = mutations.RefreshToken.Field()
   revoke_token = mutations.RevokeToken.Field()
   register = mutations.Register.Field()

class AdminQuery(graphene.ObjectType):
    
    bug_report = graphene.List(BugReportField)
    
    leaderboard = graphene.Field(LeaderboardField)

    def resolve_bug_report(self, info):
        return BugReport.objects.all()


    def resolve_leaderboard(self, info):
        
        return get_leaderboard()


class UpdateBugReport(graphene.Mutation):
    class Arguments:
        input = UpdateBugReportInput(required=True)

    update_bug_report = graphene.Field(BugReportField)

    @staticmethod
    def mutate(cls, info, input):

        bug_report = BugReport.objects.filter(id=input.id).first()
        
        bug_report.status = input.status
        
        bug_report.save()

        return UpdateBugReport(update_bug_report=bug_report)



class Query(AdminQuery,UserQuery,MeQuery,graphene.ObjectType):
	pass

class Mutation(AuthMutation,UpdateBugReport, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)