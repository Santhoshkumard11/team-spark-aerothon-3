from django.contrib.auth.decorators import login_required
from django.urls import path
from django.views.decorators.csrf import csrf_exempt


from .views import bug_classifier, dialogflow_webhook, leaderboard, sending_email, update_bug_report, user_details


urlpatterns = [
    path("demo",user_details, name="user_details"),
    path("send_email", csrf_exempt(sending_email), name="send_email"),
    path("dialogflow_webhook", csrf_exempt(dialogflow_webhook), name="dialogflow_webhook"),
    path("bug_classifier", bug_classifier, name="bug_classifier"),
    path("leaderboard", leaderboard, name="leaderboard"),
    path("update_bug_report", update_bug_report, name="update_bug_report"),
]